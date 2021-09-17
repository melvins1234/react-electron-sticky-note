import { combineReducers } from "redux";

import note from "./reducers/note";

const allReducers = combineReducers({
    notes: note
});

export default allReducers;