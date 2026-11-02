const express=require('express'),http=require('http'),path=require('path');
const {Server}=require('socket.io');
const app=express(),server=http.createServer(app),io=new Server(server);
app.use(express.static(path.join(__dirname,'public')));
io.on('connection',s=>{
 s.on('join-room',d=>{const room=String(d.room||'geral').slice(0,40),name=String(d.name||'Amigo').slice(0,25);s.join(room);s.data.room=room;s.data.name=name;s.to(room).emit('system',name+' entrou.');s.emit('system','Conectado em '+room);});
 s.on('chat-message',m=>{if(!s.data.room)return;const msg=String(m||'').trim().slice(0,1500);if(msg)io.to(s.data.room).emit('chat-message',{name:s.data.name,message:msg,time:new Date().toLocaleTimeString()});});
 s.on('request-peers',()=>{const room=s.data.room;if(room)s.emit('peers',[...(io.sockets.adapter.rooms.get(room)||[])].filter(id=>id!==s.id));});
 s.on('rtc-offer',d=>s.to(d.to).emit('rtc-offer',{from:s.id,offer:d.offer}));
 s.on('rtc-answer',d=>s.to(d.to).emit('rtc-answer',{from:s.id,answer:d.answer}));
 s.on('rtc-ice',d=>s.to(d.to).emit('rtc-ice',{from:s.id,candidate:d.candidate}));
 s.on('disconnect',()=>{if(s.data.room)s.to(s.data.room).emit('system',(s.data.name||'Alguém')+' saiu.');});
});
server.listen(process.env.PORT||3000,()=>console.log('AmigosChat online'));
