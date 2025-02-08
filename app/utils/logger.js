import logger from 'pino';
const log = logger({
  base: { pid: false },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      colorizeObjects: true,
    },
  },
  timestamp: () => `,"time": "${new Date().toLocaleString()}`,
});

export default log;
