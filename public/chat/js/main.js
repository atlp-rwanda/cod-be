const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const msgInput = document.getElementById('msg');
const typing = document.getElementById('typing');

// Get email, password and room from URL
const { email, room, password } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

let token = '',
  timeout;

const signIn = async () => {
  localStorage.removeItem('accessToken');
  const data = {
    email,
    password
  };
  const response = await fetch('http://localhost:7200/api/user/login', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 200) {
    const result = await response.json();
    token = result.accessToken;
    localStorage.setItem('accessToken', token);
    // window.location.replace('./chat.html');
  } else {
    alert('invalid credential,Try again');
    console.log('error,');
    // user.value = '';
    // password.value = '';
    return false;
  }
};

signIn();

setTimeout(() => {
  token = localStorage.getItem('accessToken');
  loadMessages();
}, 3000);

const loadMessages = () => {
  const socket = io({
    auth: {
      token
    }
  });

  // Join chatroom
  socket.emit('joinRoom', { email, room });

  // Get room and users
  socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });

  // Message from server
  socket.on('message', ({ room, message, firstname, createdAt }) => {
    console.log(message);
    outputMessage({ room, message, firstname, createdAt });
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // All Messages from server
  socket.on('messages', (messages) => {
    console.log(messages);
    outputMessages(messages);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  function timeoutFunction() {
    socket.emit('typing', false);
  }
  msgInput.addEventListener('keyup', () => {
    socket.emit('typing', email);
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 2000);
  });
  socket.on('typing', (user) => {
    if (user) {
      typing.innerHTML = `${user} is typing...`;
    } else {
      typing.innerHTML = '';
    }
  });

  // Message submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if (!msg) {
      return false;
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });

  // Output message to DOM
  function outputMessage({ room, message, createdAt }) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = room;
    p.innerHTML += `<span>${createdAt}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

  function outputMessages(messages) {
    if (Array.isArray(messages)) {
      messages.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('message');
        const p = document.createElement('p');
        p.classList.add('meta');
        p.innerText = el.User.firstname;
        p.innerHTML += `<span> sent ${new Date(
          el.createdAt
        ).toLocaleString()} </span>`;
        div.appendChild(p);
        const para = document.createElement('p');
        para.classList.add('text');
        para.innerText = el.message;
        div.appendChild(para);
        document.querySelector('.chat-messages').appendChild(div);
      });
    }
  }
};

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.firstname;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../chat//index.html';
  } else {
  }
});
