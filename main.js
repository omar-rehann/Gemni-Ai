     let input_value = document.querySelector(".text");
     let icon_send = document.querySelector(".send");
     let parent = document.querySelector(".text");
     let header = document.querySelector('.header');
     let progress = document.querySelector(".progress");

     // keyup this value
     input_value.addEventListener("keyup", function() {
         if (input_value.value) {
             icon_send.style.opacity = 1;
         } else {
             icon_send.style.opacity = 0;
         }
     });
     // if onclick show in content place
     icon_send.addEventListener("click", function() {
             let content = document.querySelector(".content");
             let resullt = `
     <div class="box">
                    <div class="image">
                        <img src="ODF.svg" alt="">
                    </div>
                    <div class="text">
                        <p class="header">${input_value.value}</p>
                           <p class="info" style="display: none;">
                </p>
                        <div class="progress">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                </div>
    
    `
                 // settime out in more thing 

             setTimeout(() => {
                 let allBoxes = document.querySelectorAll(".box");
                 let lastBox = allBoxes[allBoxes.length - 1];

                 if (lastBox) {
                     let progress = lastBox.querySelector(".progress");
                     let image = lastBox.querySelector(".image img");
                     let pragraph = lastBox.querySelector(".info");

                     if (progress) progress.style.display = "none";
                     if (image) image.style.animation = "none";
                     if (pragraph) {
                         pragraph.style.display = "block";
                         pragraph.style.transition = "opacity 2s ease";
                     }
                 }
             }, 5000);


             // start Api
             let api_key = "AIzaSyCQ8sHcZQ0sefmaqTfPd89qhTzapzGZWXE";
             let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

             let myrequest = new XMLHttpRequest();
             myrequest.open("POST", url, true);
             myrequest.setRequestHeader("Content-Type", "application/json");
             myrequest.setRequestHeader("X-goog-api-key", `${api_key}`);


             let requestBody = JSON.stringify({
                 contents: [{
                     parts: [{
                         text: input_value.value //
                     }]
                 }]
             });

             myrequest.send(requestBody);

             myrequest.onreadystatechange = function() {
                 if (this.readyState === 4 && this.status === 200) {
                     let response = JSON.parse(this.responseText);
                     let reply = response["candidates"][0]["content"]["parts"][0]["text"].slice(0, 500);

                     // استهدف آخر box فقط
                     let allBoxes = document.querySelectorAll(".box");
                     let lastBox = allBoxes[allBoxes.length - 1];

                     if (lastBox) {
                         let pragraph = lastBox.querySelector(".info");
                         if (pragraph) {
                             pragraph.textContent = reply;
                         }
                     }
                 }
             };

             content.innerHTML = resullt;
             input_value.value = "";

         })
         // end project