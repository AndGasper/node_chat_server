const ws = require("nodejs-websocket");
const server = ws.createServer(function (conn) {
    conn.on("text", function(str) {
        console.log("Received:" + str);
        conn.sendText(str);
    });
    conn.on("close",function(code,reason) {
        console.log("Connection close:", reason);
    });
}).listen();




