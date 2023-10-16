class Component {
  constructor(store, element, lang) {
    const self = this;
    self.inter = lang;
    self.element = element;
    self.store = store;
    store.pubSub.subscribe('stateUpdate', () => self.render());
  }
}

export default Component;
