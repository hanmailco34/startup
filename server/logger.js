const winston = require('winston');
const winstonDily = require('winston-daily-rotate-file');
const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({ 
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat    
    ),
    transports: [
        new winstonDily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true
        }),
        new winstonDily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true
        })
    ]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }))
}

const stream = {
    write: msg => {
        logger.info(msg);
    }
}

module.exports = { logger,stream }