window.addEventListener('load', function() { // Windows load
          
// hämtar alla element                   
    var usernameInput = document.getElementById('username');     
    
    
    let loginbtn = document.getElementById('loginbtn');
    let logoutbtn = document.getElementById('logoutbtn');
    let send = document.getElementById('send');
    let sortNameSendbtn = document.getElementById('sortNameSendbtn');
    let or = document.getElementById('or');
    let loggedinName = document.getElementById('loggedinName');
    let logoutGithub = document.getElementById('logoutGithub');
    let admin = document.getElementById('admin');
    let message = document.getElementById('message');
    let chat = document.getElementById('chat');
    let pic = document.getElementById('pic');
    let sort = document.getElementById('sort');
    let sortByNameChat = document.getElementById('sortByNameChat');
    logoutGithub.style.display = "none";
    logoutbtn.style.display = "none";
    message.style.display = "none";
    send.style.display = "none";
    sort.style.display = "none";
    sortByNameChat.style.display = "none";
    sortNameSendbtn.style.display = "none";
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
                sort.style.display = "inline";
            
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
    
                
   // när man klickar på send button skapar man ett object med egenskaperna nedan och skickar det till firebase         
     
    let sendBtnFunc = function(meddelande){
                        
                  chat.innerHTML = "";
                  let ref = firebase.database().ref('inputMessage/' /*+ usernameInput.value*/).push({
					    name: localStorage.getItem('username'),
                        message: message.value,
                        time: hours + ":" + minutes + ",   " + day + "/" + month + "/" + year
            
                })
                    message.value = "";
                    
                }
    send.addEventListener('click', sendBtnFunc);

    
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
                  localStorage.setItem('username',user.providerData[0].displayName);              
                         console.log(user);
                         console.log(user.providerData[0].email);
                         console.log(user.providerData[0].displayName);
                         console.log(user.providerData[0].photoURL);
                 
// skapar ett img element som använder bild från github
                         let img = document.createElement('img');
                         img.style.width = '75px';
                         img.style.height = '75px';
                         img.setAttribute('src', user.providerData[0].photoURL);
                         pic.appendChild(img);
                
                 
 
                        loggedinName.innerHTML = "Logged in as " + user.providerData[0].displayName;
                        usernameInput.style.display = "none";
                        githbLogin.style.display = "none";
                        loginbtn.style.display = "none";
                        or.style.display = "none";
                        logoutbtn.style.display = "none";
                        message.style.display = "inline";
                        send.style.display = "inline";
                        logoutGithub.style.display = "inline";
                        sort.style.display = "inline";
                 
                if(user.email === 'mira.aeridou@gmail.com') {
                     admin.disabled = false;

                }                 
                     loginFunction();
               });  
            
});
    
//***************** log out with github*****************
     let logoutFunct = function() {
        // Logga ut den autentiserade användaren
                firebase.auth().signOut()
                .then(function(result) {
	            console.log('Utloggning lyckades');
                localStorage.clear();
//              localStorage.removeItem('username',user.providerData[0].email);   
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

        };
    logoutGithub.addEventListener('click', logoutFunct);
//************************************************
//************ sort btn ***************************
    sort.addEventListener('click', function () {
        
        let sortbtn = firebase.database();
            sortbtn.ref('inputMessage/').orderByChild('name')
            .on('value', function(snapshot) {
                snapshot.forEach( child => {
                    let objekt = child.val();  // objekten kommer i ordning
                    
                    console.log(child.val());
                    chat.style.display = "none";
                    sortByNameChat.style.display = "inline";
//                    send.style.display = "none";
                    sortNameSendbtn.style.display = "inline";
                    
                    
                    // skapar en table   
                    let tr = document.createElement('tr');
                    let tdName = document.createElement('td');
                    let tdMessage = document.createElement('td');
                    let tdTime = document.createElement('td');  
                     
                     // set the content of the table 
                 
                      tdName.innerHTML = objekt.name+ ":";
                      tdMessage.innerHTML = objekt.message;
                      tdTime.innerHTML = objekt.time;
                        
                     // push the content to the table   
                      sortByNameChat.appendChild(tr);
                      tr.appendChild(tdName);
                      tr.appendChild(tdMessage);
                      tr.appendChild(tdTime);   
                    
                    
                    if(send.addEventListener('click', sendBtnFunc);) {
                        loginFunction();
                    }
                
	})
});

    });    

                });// windows load
    
    