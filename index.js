const http = require("http")
const path = require('path')
const fs = require("fs")
const { ESRCH } = require("constants")
const server = http.createServer((req, res) => {
//Hacer el path dinámico
let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
)
    console.log(filepath)
    //Sacar la estensión del filepath
    let extName = path.extname(filepath)
    console.log(extName);
    //tipo de continido inicial
    let contentType = "text/html"
    //Establecer el contentType según la extensión del recurso
    switch (extName){
        case ".js":
        contentType = "text/javascript"
        break;
        case ".css":
        contentType = "text/css"
        break;
        case ".json":
        contentType = "application/json"
        break;
        case ".jpeg":
        case ".jpg":
        contentType = "image/jpeg"
        break;
        case ".pdf":
        contentType = "application/pdf"
        break;
    }
    //Leer el archivo que corresponda
    fs.readFile(filepath, (err,data)=>{
        if(err){
            if (err.code == "ENOENT"){
                //Mostrar la pagina 404.html
                fs.readFile(path.join(__dirname,"public", "404.html"),
                (err, data) => {
                    if(err) throw err
                    res.writeHead(404,{"Content-Type":"text/html"})
                    res.end(data, "utf-8")
                })

            } else {
                //Error en el Server
                res.writeHead(500);
                res.end(`Error en el servidor: ${error.code}`)
            }
            console.log(err);
        } else {
            //Servir el archivo
            res.writeHead(200,{"Content-Type": contentType})
            res.end(data,"utf-8")
        }
    })
});

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}`))
