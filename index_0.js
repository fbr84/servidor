const http = require("http")
const path = require("path")
const fs = require("fs")

//Crear servidor

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/"){
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end("<h1>Home sweet home</h1>")
    }


})

const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}`))
