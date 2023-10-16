class PublishSubscribe {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, fn) {
    this.subscribers[event] = Array.isArray(this.subscribers[event]) ? [...this.subscribers[event], fn] : [fn];
  }

  publish(event, data) {
    if (Array.isArray(this.subscribers[event])) {
      this.subscribers[event].forEach((s) => {
        s(data);
      });
    }
  }
}

export default PublishSubscribe;

