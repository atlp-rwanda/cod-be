const loginForm=document.querySelector('#login');
loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const loginEmail=document.getElementById('email').value;
    const loginPassword=document.getElementById('password').value;
    if (loginEmail.length==0) {
        let element=document.querySelector('#error-email');
        return setError(element,"Enter your email");
    }else if(loginPassword.length==0){
        let element=document.querySelector('#error-password');
        return setError(element,"Enter password");
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
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                let loginDetails={
                    token:result.accessToken,
                    date:dateTime,
                    isLoggedIn:true
                }
                localStorage.setItem('isLogged', JSON.stringify(loginDetails));   
                window.location.href='index.html';
            }else{
                alert('An error has occured, try again!');
            }
        } else {
            if(response.status===500){
                alert("An error has occured, try again!");
                return false;
            }else if(response.status===404){
                alert("Not Found")
                return false;
            }
            else {
                alert('Invalid email or password');
                return false;
            }
        }
    }
});