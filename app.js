var ws = require("nodejs-websocket")
var port = 3344;

var server = ws.createServer(function (conn) {
    console.log("用户加入");
    conn.on("text", function (str) {
        try {
            str = JSON.parse(str);
            server.connections.forEach(e =>{
                e.send(str.name + "：" + str.value + "*" + server.connections.length);
            })
        } catch (error) {
            server.connections.forEach(e =>{
                e.send(str + "*" + server.connections.length);
            })
        }
    })
    conn.on("close",()=>{
        console.log("退出");
        conn.send("user out");
    })
    conn.on("error",()=>{
        console.log("客户退出了");
    });
});

server.listen(port,()=>{
    console.log("服务启动成功，端口：" + port);
});