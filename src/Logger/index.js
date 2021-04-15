const Logger = {
  log: (message) => {
    console.log(`[${time()}] `, message);
  },

  info: (message) => {
    console.info(`[${time()}] ${message}`);
  },

  warn: (message) => {
    console.warn(`[${time()}] ${message}`);
  },

  error: (message) => {
    console.error(`[${time()}] ${message}`);
  },

  clear: () => console.clear(),
};

const time = () => new Date().toLocaleTimeString();

export default Logger;
