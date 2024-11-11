
// moduleをrequire
var express = require("express");
var app = express();
var mysql = require("mysql");
var newrelic = require("newrelic");

// Loggerライブラリをrequire
// bunyan
var bunyan = require("bunyan");
const logger = bunyan.createLogger({ name: 'bunyan logger' });
// pion
var plogger = require("pino")({ name: 'pino logger'});
// winston
var winston = require("winston");
const wlogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
});

// ejsを利用するようにview engineにセットする
app.set("view engine","ejs");

// newrelic.addCustomAttribute()で全体に波及させる
newrelic.addCustomAttribute("GlobalSpace","true"); // ここの記載は、有効ではない。各ルーティングの関数内で記載してあげる必要あり。
newrelic.setUserID("CustomerXYZ");

// getパラメータに対する処理を記述
app.get("/", (request, response) => {
    // response.writeHead(200);
    // response.write('hello world');
    // res.end();
    // -> expressでの場合、こう書くこともできる
    newrelic.recordLogEvent({
        message: "とりあえず、日本語でログを送ってみるという暴挙にでてみました。ルートにアクセスしました!!",
        level: 'info',
        error: new Error('experiment')
    });
    response.status(200).send("Hello World");
});

app.get("/hello", (request, response) => {
    newrelic.addCustomAttribute("Space","hello");
    var data = {
        items: [
            {name: "<h1>リンゴ</h1>"},
            {name: "<h2>バナナ</h2>"},
            {name: "<h3>スイカ</h3>"}
        ]
    };
    // レンダリングを行う
    response.render("./hello.ejs", data);
});

app.get("/db", (request, response) => {
    newrelic.addCustomAttribute("Space","db");
    newrelic.setUserID("CustomerABC");
    const connection = mysql.createConnection({
        host: 'host.docker.internal',
        user: 'nodeadmin',
        //user: 'root',
        password: 'nodeadmin_password',
        //password: 'root_password',
        database: 'mynodeapi_database'
    });

    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('success');
    });

    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            if(error){
                response.send(error);
            }else {
                console.log(results);
                response.send(results);
            }
        }
    );
});

app.get("/bunyan", (request,response) => {

    logger.fatal('fatalのメッセージ with bunyan logger.');
    logger.error('errorのメッセージ with bunyan logger.');
    logger.warn('warnのメッセージ with bunyan logger.');
    logger.info('infoのメッセージ with bunyan logger.');
    logger.debug('debugのメッセージ with bunyan logger.');
    logger.trace('traceのメッセージ with bunyan logger.');
    response.send('OK with bunyan logger.');

    response.send("Logging with Bunyan");
});

app.get("/pino", (request,response) => {
    plogger.fatal('fatalのメッセージ with Pion logger.');
    plogger.error('errorのメッセージ with Pion logger.');
    plogger.warn('warnのメッセージ with Pion logger.');
    plogger.info('infoのメッセージ with Pion logger.');
    plogger.debug('debugのメッセージ with Pion logger.');
    plogger.trace('traceのメッセージ with Pion logger.');
    response.send("Logging with Pino");
});

app.get("/winston", (request,response) => {
    wlogger.log('fatal', "fatalのメッセージ with Winston logger");
    wlogger.log('error', "errorのメッセージ with Winston logger");
    wlogger.log('warn', "warnのメッセージ with Winston logger");
    wlogger.log('info', "infoのメッセージ with Winston logger");
    wlogger.log('debug', "debugのメッセージ with Winston logger");
    wlogger.log('trace', "traceのメッセージ with Winston logger");
    response.send("Logging with Winston");
});

app.get("/error", (request,response) => {
    newrelic.noticeError(
        "test...",
        {extraInformation: "error already handled in the application"},
        false
    );
    newrelic.noticeError(
        new Error("hogehoge"),
        {extraInformation: "2nd error..."},
        false
    );
    newrelic.noticeError(
        new Error("gonyogonyo..."),
        {extraInformation: "3rd error..."},
        true
    );
    response.send("Error generated...");
});
// ポート指定で接続
app.listen(8080);

