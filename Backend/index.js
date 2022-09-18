const  express=require ('express')
const {Server} =require('socket.io')
const http=require('http')
const cors=require('cors')

const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3002',
        methods:["GET","POST"]
    }
})
  
io.on('connection',(socket)=>{
 console.log(socket.id);
 socket.on("joinRoom",room=>socket.join(room))
 socket.on('newMessage',({newMessage,room})=>{
     console.log(room,newMessage)
     io.in(room).emit('getLatestMessage',newMessage)
 })
})

app.get('/',(req,res)=>{
    res.send('socket chart started')
})

server.listen(8000,()=>console.log('app started at port  8000'))