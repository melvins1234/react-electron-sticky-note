const initState = JSON.parse(localStorage.getItem("notes"))
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

const note = (state = initState, action) => {
  switch (action.type) {
    case "load-notes":
      return state;
    case "add-note":
      return (state = [...state, action.payload]);
    case "update-new-note":
      // state[state.length - 1] = action.payload;
      // console.log(action.payload)
      state = state.map((item, index) => {
        if (item.index !== action.payload.index) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return { ...item, ...action.payload };
      });

      return state;
    case "remove-note":
      state = state.filter((item, index) => index !== action.payload);
      console.log(state);
      return state;
    default:
      return state;
  }
};

export default note;
