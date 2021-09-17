import "./style.scss";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const Note = () => {
  return (
    <div className="note">
      <textarea
        className="note__textarea"
        onInput={(event) => {
          localStorage.clear();
          ipcRenderer.send("update-note-value", {
            value: event.target.value,
          });
        }}
        className="note__textarea"
        placeholder="Take a note..."
        // value={}
      >
        {localStorage.getItem("value")}
      </textarea>
    </div>
  );
};

export default Note;
