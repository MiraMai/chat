window.addEventListener('load', function() { // Windows load
          
// hämtar alla element                   
    var usernameInput = document.getElementById('username');     
    
    
    let loginbtn = document.getElementById('loginbtn');
    let logoutbtn = document.getElementById('logoutbtn');
    let send = document.getElementById('send');
    let or = document.getElementById('or');
    let loggedinName = document.getElementById('loggedinName');
    let logoutGithub = document.getElementById('logoutGithub');
    let admin = document.getElementById('admin');
    let message = document.getElementById('message');
    let chat = document.getElementById('chat');
    let pic = document.getElementById('pic');
    logoutGithub.style.display = "none";
    logoutbtn.style.display = "none";
    message.style.display = "none";
    send.style.display = "none";
    admin.disabled = true;
    
    
//**************** local storage ***********************
    
    loginbtn.addEventListener('click', function(){            
        
                localStorage.setItem('username', usernameInput.value);
                console.log(localStorage.getItem('username'));
                loggedinName.innerHTML = "Logged in as " + usernameInput.value;
                usernameInput.style.display = "none";
                loginbtn.style.display = "none";
                or.style.display = "none";
                githbLogin.style.display = "none";
                logoutGithub.style.display = "none";
                logoutbtn.style.display = "inline";
                message.style.display = "inline";
                send.style.display = "inline";
            
            if(usernameInput.value === 'Mira') {
                admin.disabled = false;

            };
            
        
             
            
        });
        
        logoutbtn.addEventListener('click', function() {
            
                localStorage.removeItem("username");
                console.log(localStorage.getItem('username'));
                usernameInput.style.display = "inline";
                loginbtn.style.display = "inline";
                logoutbtn.style.display = "none";
                chat.style.display = "none";
                message.style.display = "none";
                send.style.display = "none";
        
                window.location.reload();             
            
        });
        
        

//*************** local storage end ***********************
     
                
     // date function                
          var currentDate = new Date(),
          day = currentDate.getDate(),
          month = currentDate.getMonth() + 1,
          year = currentDate.getFullYear();

     // time function                
          var currentTime = new Date(),
          hours = currentTime.getHours(),
          minutes = currentTime.getMinutes();
            if (minutes < 10) {
	             minutes = "0" + minutes;
             }              
    
                
   // när man klickar på send button skapar man ett object med egenskaperna nedan         
     send.addEventListener('click', function(meddelande){
                        
                  chat.innerHTML = "";
                  let ref = firebase.database().ref('inputMessage/' /*+ usernameInput.value*/).push({
					    name: localStorage.getItem('username'),
                        message: message.value,
                        time: hours + ":" + minutes + ",   " + day + "/" + month + "/" + year
            
                })
                    message.value = "";
                    
                });

 // show firebase content in table element

        let loginFunction = function () {                   

             firebase.database().ref('inputMessage/').on('value', function(snapshot) {
// använder den här funktionen istället för forloopen nedanför för att kunna komma åt child.key
                 snapshot.forEach(child => {
                     let key = child.key;
                     let o = child.val();
               
/*                    let dataObject = snapshot.val();
                    for (let i in dataObject) {
                        let o = dataObject[i];*/
//                        console.log(dataObject);
//                        console.log(dataObject[i].message);
                     
                     
                   // skapar en table   
                    let tr = document.createElement('tr');
                    let tdName = document.createElement('td');
                    let tdMessage = document.createElement('td');
                    let tdTime = document.createElement('td');  
                     
                     // set the content of the table 
                      tr.id = key;
                      tdName.innerHTML = o.name+ ":";
                      tdMessage.innerHTML = o.message;
                      tdTime.innerHTML = o.time;
                        
                     // push the content to the table   
                      chat.insertBefore(tr, chat.firstChild);
                      tr.appendChild(tdName);
                      tr.appendChild(tdMessage);
                      tr.appendChild(tdTime);                       
                
        
                     });
                  })
              };
            loginbtn.addEventListener('click', loginFunction);
    
    
//******************* authentication ********************   
    //**************** login with github *******************
   let provider = new firebase.auth.GithubAuthProvider();  
    
        githbLogin.addEventListener('click', function (){                       

             firebase.auth().signInWithPopup(provider)
                 .then(function(result) {
	             // Om autentisering lyckas, så finns användarinfo i user
	              let user = result.user;
                  localStorage.setItem('username',user.providerData[0].email);                 // ändra så att send message hämtar från localstorage i stället för inputName
                 console.log(user);
                 console.log(user.providerData[0].email);
                 console.log(user.providerData[0].displayName);
                 console.log(user.providerData[0].photoURL);
                 
               let img = document.createElement('img');
                img.setAttribute('src', user.providerData[0].photoURL);
                pic.appendChild(img);
                
                 
//                tdName.innerHTML = user.providerData[0].email+ ":";
 
                loggedinName.innerHTML = "Logged in as " + user.providerData[0].email + user.providerData[0].displayName;
                usernameInput.style.display = "none";
                githbLogin.style.display = "none";
                loginbtn.style.display = "none";
                or.style.display = "none";
                logoutbtn.style.display = "none";
                message.style.display = "inline";
                send.style.display = "inline";
                logoutGithub.style.display = "inline";
                 
                if(user.email === 'mira.aeridou@gmail.com') {
                     admin.disabled = false;

                }                 
                 loginFunction();
               });  
    
});
    
//***************** log out with github*****************
    logoutGithub.addEventListener('click', function() {
        // Logga ut den autentiserade användaren
                firebase.auth().signOut()
                .then(function(result) {
	         console.log('Utloggning lyckades');
                localStorage.clear();
//                localStorage.removeItem('username',user.providerData[0].email);   
                usernameInput.style.display = "inline";
                loginbtn.style.display = "inline";
                logoutbtn.style.display = "none";
                chat.style.display = "none";
                message.style.display = "none";
                send.style.display = "none";
        
                window.location.reload();             
                    })
                .catch(function(error) {
	         console.log('Utloggning misslyckades');
                });

        });
//************************************************

                });// windows load