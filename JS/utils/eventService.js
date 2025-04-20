export const EventEmitter = {
  events: {},

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);

    return () => this.unsubscribe(event, callback);
  },

  emit(event, data) {
    const eventCallbacks = this.events[event];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => callback(data));
    }
  },

  unsubscribe(event, callback) {
    const eventCallbacks = this.events[event];
    if (eventCallbacks) {
      this.events[event] = eventCallbacks.filter((cb) => cb !== callback);
    }
  },
};
