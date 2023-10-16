const selectActions = {
  'search': (state, payload) => {
    state.search = payload;
    state.lastSelection = null;
    return state;
  },
  'select': (state, payload) => {
    const index = state.options.findIndex((opt, i) => opt.value === payload);
    state.options[index].checked = state.options[index].checked !== null ? !state.options[index].checked : true;
    state.lastSelection = payload;
    return state;
  },
  'selectInteraction': (state) => {
    state.show = !state.show;
    state.search = "";
    return state;
  },
  'selectAll': (state) => {
    if (Object.entries(state.options).length) {
      state.options.forEach(option => option.checked = true);
      state.lastSelection = null;
      return state;
    }
  },
  'selectNone': (state) => {
    if (Object.entries(state.options).length) {
      state.options.forEach(option => option.checked = false);
      state.lastSelection = null;
      return state;
    }
  },
};

export default selectActions;
