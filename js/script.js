let questionBox = document.querySelector(".ask");
let send = document.querySelector(".send");
let massegeBox = document.querySelector(".queans");
let mic = document.querySelector(".mic");


//speech part
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let micon = false;
if (!SpeechRecognition) {
    alert('Sorry, your browser does not support Speech Recognition.');
}
else{
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Language
    recognition.interimResults = true; // Show results while speaking
    recognition.continuous = true; // Keep listening until stopped

    mic.addEventListener('click' , ()=>{
        if(micon==false){
            micon = true;
            recognition.start();
            console.log("on");
            mic.style.backgroundImage =  "url(./image/micon.png)"
        }
        else{
            micon = false;
            recognition.stop();
            console.log("off");
            mic.style.backgroundImage =  "url(./image/micoff.webp)"
        }
    })
    recognition.onresult = (event) =>{
        let text = '';
        for(let i= event.resultIndex;i<event.results.length;i++){
            text += event.results[i][0].transcript;
        }
        questionBox.value += text;
    }
}



send.addEventListener('click', ()=>{
    let x = questionBox.value;
    if(x != ''){
        massegeBox.insertAdjacentHTML('beforeend',`
             <div style="width: 95%;background-color: antiquewhite;border-radius: 7px;position: sticky;left: 50%; display: flex;justify-content: center;align-items: center;margin-top: 5px;">
                    <div style="width: 95%;">
                        <p>${x}</p>
                    </div>
                </div>
        `)
        questionBox.value = '';
        chatAnswer(x);
    }
})
document.addEventListener('keydown', function(event) { //when press enter this activate the send.addeventlistner without click
    if (event.key === 'Enter') {
        send.click(); 
    }
});

async function chatAnswer(que){
    send.className = "nosend"; //change send button
   //add loading text
    massegeBox.insertAdjacentHTML('beforeend',`
        <div class="loading" style="width: 95%;background-color: antiquewhite;border-radius: 7px;position: sticky;right: 50%;display: flex;justify-content: center;align-items: center;margin-top: 5px;">
            <div style="width: 95%;">
                <p>loading 
                    <a class="first">.</a>
                    <a class="second">.</a>
                    <a class="third">.</a>
                </p>
            </div>
        </div>
    `)
                        let first = document.querySelector(".first");  //function blink on loading massage
                        let second = document.querySelector(".second");
                        let third = document.querySelector(".third");
                        function start() {
                        let firstblink =()=>{
                            setTimeout(()=>{
                                first.innerText = '.';
                                second.innerText = ' ';
                                third.innerText = ' ';
                            },1000)
                        }
                        let secondblink =()=>{
                            setTimeout(()=>{
                                first.innerText = '.';
                                second.innerText = '.';
                                third.innerText = ' ';
                            },2000)
                        }
                        let thirdblink =()=>{
                            setTimeout(()=>{
                                first.innerText = '.';
                                second.innerText = '.';
                                third.innerText = '.';
                            },3000)
                        }
                        let normal=()=>{
                            setTimeout(()=>{
                                first.innerText = '';
                                second.innerText = '';
                                third.innerText = '';
                            },4000)
                        }

                            firstblink();
                            secondblink();
                            thirdblink();
                            normal();
                        }
                        let stop =setInterval(start, 5000); 
                        start();//----------------------------------//finish blink
    //fetch answer
    try{
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer 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",
              "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
              "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "microsoft/mai-ds-r1:free",
              "messages": [
                {
                  "role": "user",
                  "content": que
                }
              ]
            })
        }); //finishing fetch answer

        if (!response.ok) {   //if response not ok
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //if all ok start to print
        const data = await response.json();
        let nosend = document.querySelector(".nosend");//change send button
        nosend.className = "send"; 
        document.querySelector(".loading").remove();//change loading text
        clearInterval(stop); //stop loading blink

        let gotMessage = data.choices[0].message.content;
        gotMessage = gotMessage.replace(/\\boxed\{([\s\S]*?)\}/g, '$1');
        const htmlContent = marked.parse(gotMessage); //use marked.js to convert the into html code 

        massegeBox.insertAdjacentHTML('beforeend',`
                <div style="width: 95%;background-color: antiquewhite;border-radius: 7px;position: sticky;right: 50%;display: flex;justify-content: center;align-items: center;margin-top: 5px;">
                    <div style="width: 95%;">
                        <p>${htmlContent}</p>
                    </div>
                </div>
        `)

    }
    catch (error) {
        console.error('Error fetching chat completion:', error);
        let nosend = document.querySelector(".nosend");//change send button
        nosend.className = "send"; 
        let loading = document.querySelector(".loading");//change loading text
        loading.remove();
        massegeBox.insertAdjacentHTML('beforeend',`
            <div style="width: 95%;background-color: antiquewhite;border-radius: 7px;position: sticky;right: 50%;display: flex;justify-content: center;align-items: center;margin-top: 5px;">
                <div style="width: 95%;">
                    <p>something is wrong its might be your internet connection |*-*|</p>
                </div>
            </div>
        `)
    }
}


//time function

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();


    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = hours+':'+minutes+':'+seconds;

    document.querySelector(".time").innerText = timeString;
}

setInterval(updateClock, 1000); //call rapidly with 1 sec  delay
updateClock();