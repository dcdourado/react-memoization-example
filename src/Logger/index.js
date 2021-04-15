const Logger = {
  log: (message) => {
    console.log(`[${time}] ${message}`);
  },

  warn: (message) => {
    console.warn(`[${time}] ${message}`);
  },

  error: (message) => {
    console.error(`[${time}] ${message}`);
  },
};

const time = () => new Date().toISOString();

export default Logger;
