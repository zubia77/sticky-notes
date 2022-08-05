import "./Popup.scss";
import { useState } from "react";
import { stickyNotesBcc } from "../App";

// diese Funktion ist für das Popup-Fenster, wenn man den Text eingeben möchte, dem werde die states aus der App.jsx als props zugeteilt.
const Popup = ({ popupIsOpen, setPopupIsOpen, getNotes }) => {
  const [text, setText] = useState("");

  // das ist der EventHandler um den Text, der in dem Formular eingegeben wird an die Json zu senden
  const saveToJsonHandler = (event) => {
    event.preventDefault();
    // ausser dem Text werden auch die random vergebene Farbe des sticky Notes an die Json übergeben
    const note = { text, bgColor: stickyNotesBcc() };
    
    // mit dieser Funktion werden die Daten an die json vergeben
    fetch("http://localhost:5000/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-type": "application/json" },
    });
    
    setPopupIsOpen(false);
    getNotes();
  };

  return (
    popupIsOpen && (
      <div className="popup">
        <form
          className="popup-inner"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h1>Neue Notiz</h1>
          <button className="close-btn" onClick={() => setPopupIsOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
          </button>
          <button className="add-btn" onClick={saveToJsonHandler}>
          <i className="fa-solid fa-check"></i>
          </button>

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            cols="30"
            rows="10"
            placeholder="Schreibe hier deine neue Notiz..."
          ></textarea>
        </form>
      </div>
    )
  );
};

export default Popup;
