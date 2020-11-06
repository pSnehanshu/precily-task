import { Store } from "pullstate";

const store = new Store({
  contents: [],
  contentLoading: false,
  counter: {
    add: 0,
    update: 0,
  }
});

export default store;
