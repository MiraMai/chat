window.addEventListener('load', function() { // Windows load
          
// hämtar alla element                   
    var usernameInput = document.getElementById('username');              
    let message = document.getElementById('message');
    let chat = document.getElementById('chat');
    let sendbtn = document.getElementById('send');         
          
                
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
     sendbtn.addEventListener('click', function(meddelande){
                        
                  chat.innerHTML = "";
                  let ref = firebase.database().ref('inputMessage/' /*+ usernameInput.value*/).push({
					    name: usernameInput.value,
                        message: message.value,
                        time: hours + ":" + minutes + ",   " + day + "/" + month + "/" + year
            
                })
                    message.value = "";
                    
                });
    

 // show firebase content in table element

        loginbtn.addEventListener('click', function(){          
            

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
              });
                });// windows load