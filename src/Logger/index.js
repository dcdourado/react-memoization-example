const Logger = {
  info: (message) => {
    console.info(`[${time}] ${message}`);
  },

  debug: (message) => {
    console.debug(`[${time}] ${message}`);
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
