export default {
  set(key, value) {
    localStorage.setItem(key, value);
  },
  get(key) {
    const value = localStorage.getItem(key);
    return value;
  },
  clear() {
    localStorage.clear();
  },
};
