const socket = io();
setTimeout(() => {
  const isLoggedIn=JSON.parse(localStorage.getItem('isLogged'));
  const authToken = isLoggedIn.token;
  console.log(authToken);
  authConnect(authToken);
}, 3000);
const authConnect=(authToken)=>{
  const socket = io({
    auth: {
      token: authToken
    }
  });
  socket.on("connect_error", (err) => {
    console.log('Connection error');
    return window.location.href='login.html';
  });

  socket.on("notifications", (notifications) => {
    if (notifications.length > 0) {
      const parentElement=document.querySelector('#notifications-list');
      notifications.forEach(element => {
        const list=document.createElement('li');
        list.innerHTML = element.title;
        list.setAttribute('class','list-group-item list-group-item-info');
        parentElement.appendChild(list);  
      });
    } else {
      const parentElement=document.querySelector('#notifications-list');
      const list=document.createElement('li');
      list.innerHTML = "No available notifications to show";
      list.setAttribute('class','list-group-item list-group-item-warning');
      parentElement.appendChild(list);
    }
  });
};
