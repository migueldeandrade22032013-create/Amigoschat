const socket=io();let username='Amigo',room='geral',stream=null,pcs={};const $=id=>document.getElementById(id);
$('entryForm').onsubmit=e=>{e.preventDefault();username=$('name').value.trim()||'Amigo';room=$('room').value.trim()||'geral';$('profileName').textContent=username;$('member').textContent=username;socket.emit('join-room',{name:username,room});$('entry').classList.add('hidden');};
function system(t){let d=document.createElement('div');d.className='system';d.textContent=t;$('messages').append(d);}
socket.on('system',system);socket.on('chat-message',m=>{let d=document.createElement('div');d.className='msg';let b=document.createElement('b');b.textContent=m.name+': ';d.append(b,document.createTextNode(m.message));$('messages').append(d);$('messages').scrollTop=$('messages').scrollHeight;});
$('chatForm').onsubmit=e=>{e.preventDefault();let v=$('message').value.trim();if(v){socket.emit('chat-message',v);$('message').value='';}};
const config={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
$('screenBtn').onclick=async()=>{try{stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});$('screen').srcObject=stream;$('screenBtn').disabled=true;$('stopBtn').disabled=false;stream.getVideoTracks()[0].onended=stopShare;socket.emit('request-peers');}catch(e){system('Captura cancelada ou não suportada: '+e.message)}};
function stopShare(){if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;$('screen').srcObject=null;$('screenBtn').disabled=false;$('stopBtn').disabled=true;Object.values(pcs).forEach(p=>p.close());pcs={};}
$('stopBtn').onclick=stopShare;
async function makeOffer(id){let pc=new RTCPeerConnection(config);pcs[id]=pc;if(stream)stream.getTracks().forEach(t=>pc.addTrack(t,stream));pc.onicecandidate=e=>e.candidate&&socket.emit('rtc-ice',{to:id,candidate:e.candidate});pc.ontrack=e=>$('screen').srcObject=e.streams[0];let offer=await pc.createOffer();await pc.setLocalDescription(offer);socket.emit('rtc-offer',{to:id,offer});}
socket.on('peers',ids=>ids.forEach(makeOffer));
socket.on('rtc-offer',async({from,offer})=>{let pc=new RTCPeerConnection(config);pcs[from]=pc;pc.onicecandidate=e=>e.candidate&&socket.emit('rtc-ice',{to:from,candidate:e.candidate});pc.ontrack=e=>$('screen').srcObject=e.streams[0];if(stream)stream.getTracks().forEach(t=>pc.addTrack(t,stream));await pc.setRemoteDescription(offer);let answer=await pc.createAnswer();await pc.setLocalDescription(answer);socket.emit('rtc-answer',{to:from,answer});});
socket.on('rtc-answer',async({from,answer})=>pcs[from]&&pcs[from].setRemoteDescription(answer));socket.on('rtc-ice',async({from,candidate})=>{try{pcs[from]&&candidate&&await pcs[from].addIceCandidate(candidate)}catch{}});
function panel(title,body){$('infoTitle').textContent=title;$('infoBody').innerHTML=body;$('infoOverlay').classList.remove('hidden');}
$('closeInfo').onclick=()=>$('infoOverlay').classList.add('hidden');
$('serverMenu').onclick=()=>panel('Servidor','<p>Configurações, convite e criação de canais serão implementados nesta etapa.</p>');
$('friends').onclick=()=>panel('Amigos','<p>Lista de amigos, pedidos e mensagens diretas: planejados.</p>');
$('roles').onclick=()=>panel('Cargos e permissões','<p>Cargos: Admin, Moderador, Membro e visitante. Permissões reais ainda não implementadas.</p>');
$('settings').onclick=$('profileSettings').onclick=()=>panel('Configurações','<p>Perfil, aparência, áudio, notificações e privacidade: planejados.</p>');
$('joinVoice').onclick=$('callBtn').onclick=()=>panel('Chamada de voz','<p>A chamada de voz ainda não está funcional neste protótipo. O compartilhamento de tela está em fase experimental.</p>');
