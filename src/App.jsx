import { useEffect, useState } from "react";
import "./App.scss";
import background from "../public/pinwand.png";
import Popup from "./components/Popup";
import axios from "axios";

// das ist die url des json-servers
const notesUrl = "http://localhost:5000/notes";

// das sind die Werte der Farben, Abstände und Rotationen der jeweiligen sticky Notes.
const randomMargin = ["9px", "11px", "5px", "10px", "7px"];
const randomColors = [
  "#c2ff3d",
  "#ff3de8",
  "#04e022",
  "#bc83e6",
  "#3dc2ff",
  "#fca205",
];
const randomDegree = [
  "rotate(3deg)",
  "rotate(1deg)",
  "rotate(-1deg)",
  "rotate(-3deg)",
  "rotate(-5deg)",
  "rotate(-8deg)",
];
const imgPinsArray = ['pin1.png', 'pin2.png', 'pin3.png', 'pin4.png', 'pin5.png', 'pin6.png', 'pin7.png'];





// diese Funktion gilt den Farben, damit diese auch in der Json gespeichert werden und im nächsten Reload oder Aufruf der Funktion die Farbe der jeweiligen Notiz aufgerufen wird. Ausserdem wird die Funktion in Popup.jsx verschickt, damit dort die Werte beim versenden an die Json mit verschickt werden können.

export const stickyNotesBcc = () => {
  const stickyNotesBg = `${
    randomColors[Math.floor(Math.random() * randomColors.length)]
  }`;
  return stickyNotesBg; 
};

function App() {
  // hier werden die useStates deklariert
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [deleteNote, setDeleteNote] = useState({});


  // diese Funktion ist um aus der json die Notizen zu holen
  const getNotes = async () => {
    const _notes = (await axios.get(notesUrl)).data;
    console.log(_notes);
    setNotes(_notes);
  };
  useEffect(() => {
    getNotes();

  }, []);
  

  const notesDeleteHandler = async(id) => {
   const deletedItem = notes.find(note => {
      return (note.id === id)
    })

    setDeleteNote(deletedItem);
    
     await fetch(`http://localhost:5000/notes/${deletedItem.id}`, {
      method: "DELETE",
    
    });
   console.log(notes);
  }
  useEffect(() => {
    getNotes();

  }, [deleteNote]);

  return (
    // in dieser div wird nur die Pinwand als Backgroundimage festgelegt
    <div className="App" style={{ backgroundImage: `url(${background})` }}>

      <div>
        {/* dieser Button ist dafür da, um eine neue Notiz zu schreiben. beim Klicken dieses Buttons erscheint ein Formular */}
        <button className="btnCreateNote" onClick={() => setPopupIsOpen(true)}>
          Notiz hinzufügen
        </button>
      </div>

        {/* das ist das Popup-Formular, das erscheint. Hier werden die states (Popup.jsx Zeile 5) den Variablen zugewiesen*/}
      <Popup
        popupIsOpen={popupIsOpen}
        setPopupIsOpen={setPopupIsOpen}
        getNotes={getNotes}
      ></Popup>

      {/* das ist der Bereich der sticky Notes die dann erscheinen, wenn aus dem Formular der Text hinzugefügt wird */}
      <div className="stickyNotes">
        {/* hier wird durch die Objekte aus der json gemappt */}
        {notes.map((note) => {
          return (
            <div
              className="eachStickyNotes"
              key={note.id}
              // hier wird dann gesagt, dass jedes sticky notes einen beliebigen margin, color und rotation erhalten soll
              style={{
                margin: `${
                  randomMargin[Math.floor(Math.random() * randomMargin.length)]
                }`,
                backgroundColor: `${note.bgColor}`,

                transform: `${
                  randomDegree[Math.floor(Math.random() * randomDegree.length)]
                }`,
              }}
            >
              {/* hier wird, der im Formular geschriebene Text aus der json gerufen und angezeigt */}
               <div className="pin">
                <img className="imgPin" style={{}} src={`../../public/${imgPinsArray[Math.floor(Math.random() * imgPinsArray.length)]}`} width="40px" onDoubleClick={() => {notesDeleteHandler(note.id)}} />
              </div>
              {note.text}
             
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
