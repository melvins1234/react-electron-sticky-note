import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addNote } from "../../store/actions/notes";

import "../../preset.scss";
import "./style.scss";

const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
const ipcRenderer = electron.ipcRenderer;

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notes);

  console.log();

  return (
    <header className="header">
      <h2 className="header__title">Sticky Notes</h2>
      <i
        onClick={() => {
          dispatch(addNote({index: state.length, date: new Date().toLocaleString(), value: 'Take a note...'}));
          ipcRenderer.send("id-value", {id: state.length});

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
        className="fas fa-plus header__icon"
      ></i>
    </header>
  );
};

export default Header;
