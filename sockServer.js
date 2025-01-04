
var express=require('express')
var app= express()
var cors = require('cors')
var http = require('http')
var server = http.createServer(app)
var {Server} = require('socket.io')
var io= new Server(server)
app.use(express.static(__dirname+'/public'))
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())

io.on('connection',(socket)=>{
  
    console.log("new connection connected")

    socket.on("message",(msg)=>{
    //   var x=  socket.handshake.headers.cookie
    //   console.log(x.split(' ').values(1))
        socket.broadcast.emit("msgtoall",msg)
         
    })

})


app.get('/chatboard',(req,res)=>{


    res.cookie('username',req.query.username)
    
    
res.sendFile(__dirname+'/chatboard.html')
})

server.listen(4500,()=>{console.log("sockserver connected running on 4000")})




