const loginForm=document.querySelector('#login');
loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const loginEmail=document.getElementById('email').value;
    const loginPassword=document.getElementById('password').value;
    if (loginEmail.length==0) {
        alert("Enter Email")
    }else if(loginPassword.length==0){
        alert("Enter Password");
    }else{
        const loginData={
            'email':loginEmail,
            'password':loginPassword,
        }
        let response=await fetch('http://localhost:7000/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(loginData)
        })
        console.log(response)
        if (response.ok) {
            let result=await response.json();
            if (response.status===200) {
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date+' '+time;
                let loginDetails={
                    token:result.accessToken,
                    date:dateTime,
                    isLoggedIn:true
                }
                localStorage.setItem('isLogged', JSON.stringify(loginDetails));   
                window.location.href='index.html';
            }else{
                console.log('An error has occured, try again!');
            }
        } else {
            if(response.status===500 && typeof window !== 'undefined'){
                alert("An error has occured, try again!");
                return false;
            }else if(response.status===404 && typeof window !== 'undefined'){
                alert("Not Found")
            }
            else if(response.status===400 && typeof window !== 'undefined'){
                alert('Invalid email or password');
            }else{
                alert('Internal server error!');
            }
        }
    }
});