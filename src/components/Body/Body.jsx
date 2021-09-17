import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { removeNote, updateNote } from "../../store/actions/notes";

import noteSVG from "../../images/note.svg";
import "./style.scss";

const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
const ipcRenderer = electron.ipcRenderer;

const Body = () => {
  const state = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  state.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let idSelected;
  useEffect(() => {
    ipcRenderer.on("idVal", (event, arg) => {
      idSelected = arg.id;
    });

    return ipcRenderer.on("noteVal", (event, arg) => {
      dispatch(
        updateNote({
          index: idSelected,
          date: new Date().toLocaleString(),
          value: arg.value,
        })
      );
    });
  }, []);
  return (
    <main className={`body ${state.length !== 0 ? "body__reverse" : ""}`}>
      {state.length === 0 ? (
        <>
          <img className="body__image" src={noteSVG} alt=""></img>
          <p>Tap the new note button above to create a note.</p>
        </>
      ) : (
        state.map((data, index) => {
          return (
            <div
              className={`body__sticky-note body__sticky-note${index}`}
              key={index}
              onDoubleClick={(event) => {
                localStorage.setItem(
                  "value",
                  event.target.querySelector("p").textContent
                );
                ipcRenderer.send("id-value", {
                  id: data.index,
                  value: event.target.innerHTML,
                });

                let win = new BrowserWindow({
                  width: 305,
                  height: 315,
                  webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                  },
                });
                  win.removeMenu()
                win.loadURL("http://localhost:3000/add-note");
              }}
            >
              <p>{data.value}</p>
              <span className="body__timeStamp">
                {new Date(data.date).setHours(0, 0, 0, 0) <=
                new Date().setHours(0, 0, 0, 0)
                  ? moment(data.date).format("h:mm A")
                  : moment(data.date).format("MMM D, YYYY")}
              </span>
              <i
                onClick={() => {
                  dispatch(removeNote(index));
                }}
                className="body__delete fas fa-trash-alt"
              ></i>
            </div>
          );
        })
      )}
    </main>
  );
};

export default Body;
