var socket;

function connectToServer(url){
  socket = new WebSocket(url);

  socket.onopen = () => {

  }

  socket.onmessage = function (event) {
    const json = JSON.parse(event.data)
    const message = json.data.message

    let list = document.getElementsByClassName("message-list")[0]

    if(json.isSender){
      list.insertAdjacentHTML("beforeend", "<p class=\"message-item-self\">" + message + "</p>")
    }else{
      list.insertAdjacentHTML("beforeend", "<p class=\"message-item\">" + message + "</p>")
    }
    list.scrollTop = list.scrollHeight
  }
}

function sendMessage(){
  const content = document.getElementById("input-text").value
  document.getElementById("input-text").value = ''
  const data = {
    message: content
  }

  socket.send(JSON.stringify(data))
}

document.addEventListener("DOMContentLoaded", function(event) {

  connectToServer('ws://localhost:8080');

  document.getElementById('input-text').addEventListener('keyup',(event) => {
    if (event.keyCode == 13) { 
     sendMessage()
    }
  });

});