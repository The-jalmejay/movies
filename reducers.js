const initialState = {
  location: "NCR",
  options: {},
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOC") {
    return { ...state, location: action.payload.location };
  } else if (action.type === "Q") {
    let { options } = state;
    let options1 = { ...options };
    if (action.payload.options.q) {
      options1 = { ...options, q: action.payload.options.q };
    }
    else if (action.payload.options.lang) {
      options1 = { ...options, lang: action.payload.options.lang };
    }

    return { ...state, options: options1 };
  }
  return state;
};
export default reducer;
