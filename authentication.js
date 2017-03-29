window.addEventListener('load', function() { // Windows load
          

              
             let githbLogin = document.getElementById('githbLogin');
    
    githbLogin.addEventListener('click', function (){
        
             let provider = new firebase.auth.GithubAuthProvider();  
    
             firebase.auth().signInWithPopup(provider)
                 .then(function(result) {
	             // Om autentisering lyckas, så finns användarinfo i user
	              let user = result.user;
                 console.log(user);
                 console.log(user.email);
                 
        
                
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
        