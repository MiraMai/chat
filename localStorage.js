 window.addEventListener('load', function() { // Windows load
        
        var usernameInput = document.getElementById('username');
        let loginbtn = document.getElementById('loginbtn');
        let logoutbtn = document.getElementById('logoutbtn');
        let welcome = document.getElementById('welcome');
        let message = document.getElementById('message');
        let send = document.getElementById('send');
        let or = document.getElementById('or');
        logoutbtn.style.display = "none";
        message.style.display = "none";
        send.style.display = "none";
        

        loginbtn.addEventListener('click', function(){            
        
                localStorage.setItem('username', usernameInput.value);
                console.log(localStorage.getItem('username'));
                welcome.innerHTML = "Welcome " + usernameInput.value + " :)";
                usernameInput.style.display = "none";
                loginbtn.style.display = "none";
                or.style.display = "none";
                githbLogin.style.display = "none";
                logoutbtn.style.display = "inline";
                message.style.display = "inline";
                send.style.display = "inline";
            
        });
        
        logoutbtn.addEventListener('click', function() {
            
                localStorage.removeItem("username");
                console.log(localStorage.getItem('username'));
                welcome.innerHTML = "";
                usernameInput.style.display = "inline";
                loginbtn.style.display = "inline";
                logoutbtn.style.display = "none";
                chat.style.display = "none";
                message.style.display = "none";
                send.style.display = "none";
        
                window.location.reload();             
            
        });
        
        


  
 //   }
        
    }); // Window load    
        