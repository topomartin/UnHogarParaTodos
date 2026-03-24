module.exports = {
    logger: {
        logDir:'C:/preubaLogs/logs',
        level: 'info', //[error: 0,  warn: 1,  info: 2,  http: 3,  verbose: 4,  debug: 5,silly: 6]
        logs:{
            maxSize: '20m',
            maxFiles: '10d',
        },
        error:{
            maxSize: '20m',
            maxFiles: '15d',
        }
    }
};