import PublishSubscribe from '@/publishSubscribe';
import actions from '@/actions'

class State {
  constructor({ initialState, stateCallback } = {}) {
    const self = this;
    this.pubSub = new PublishSubscribe();
    this.state = new Proxy(
      { value: initialState },
      {
        set(obj, prop, value) {
          obj[prop] = value;
          if (stateCallback) {
            stateCallback(value);
          }
          self.pubSub.publish('stateUpdate', obj);
          return true;
        },
      }
    );
    this.actions = actions;
  }

  getState() {
    return { ...this.state.value };
  }

  dispatch(action) {
    const prevState = this.getState();

    // Update state with previousState and action updates
    this.state.value = this.actions[action.type](prevState, action.payload);
  }
}

export default State;
