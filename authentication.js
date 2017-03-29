window.addEventListener('load', function() { // Windows load
          
        let usernameInput = document.getElementById('username');
        let loginbtn = document.getElementById('loginbtn');
        let logoutbtn = document.getElementById('logoutbtn');
        let welcome = document.getElementById('welcome');
        let message = document.getElementById('message');
        let send = document.getElementById('send');
        let or = document.getElementById('or');
        let loggedinName = document.getElementById('loggedinName');
        logoutbtn.style.display = "none";
        message.style.display = "none";
        send.style.display = "none";
    
    
              
             let githbLogin = document.getElementById('githbLogin');
    
    githbLogin.addEventListener('click', function (){
        
             let provider = new firebase.auth.GithubAuthProvider();  
    
             firebase.auth().signInWithPopup(provider)
                 .then(function(result) {
	             // Om autentisering lyckas, så finns användarinfo i user
	              let user = result.user;
                 console.log(user);
                 console.log(user.email);
                 console.log(user.displayName);
                 console.log(user.photoURL);
                 
                let img = document.createElement('img');
                img.setAttribute('src', user.photoURL);
                loggedinName.appendChild(img);
                 
                
                loggedinName.innerHTML = "Logged in as " + user.email;
                usernameInput.style.display = "none";
                githbLogin.style.display = "none";
                loginbtn.style.display = "none";
                or.style.display = "none";
                logoutbtn.style.display = "inline";
                message.style.display = "inline";
                send.style.display = "inline";
                 
                 });
    
});
    
    
    }); // Windows load
        