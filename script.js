
// Get webcam video
const constraints = {
    'video': true,
    'audio': true
}

navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        console.log(constraints);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': false};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#webcam');
        
        videoElement.srcObject = stream;
        
        let body = document.querySelector('body');
        scriptTiming();
        
        body.setAttribute('welcome', '1');
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}
playVideoFromCamera();



// Respond to keys
function spaceBar() {
    let body = document.querySelector('body');
    
    document.addEventListener('keydown', event => {
        let chatActive = body.getAttribute('chat-overlay') === "active" ? true : false;
        
        if (event.code === 'Space' && !chatActive) {
            body.setAttribute('user-mic', 'burst');
        }
    });
    
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            body.setAttribute('user-mic', 'off');
        }
    });
}
spaceBar();

function activateChat() {
    let body = document.querySelector('body'),
        chatInput = document.querySelector('input');
    
    setInterval(function() {
        chatInput.focus()
    }, 100);
    
    document.addEventListener('keyup', event => {
        //if (event.code != 'Space' && event.keyCode != 13 && event.keyCode != 27) {
        if (event.keyCode > 48 && event.keyCode < 91 ) {
            body.setAttribute('chat-overlay', 'active');
            chatInput.focus();
        } else if (event.keyCode === 27) {
            body.setAttribute('chat-overlay', 'disabled');
            chatInput.value = '';
        } else if (event.keyCode === 13) {
            let chatMessage = chatInput.value;
            body.setAttribute('chat-overlay', 'disabled');
            chatInput.value = '';
            
            addChatBubble(chatMessage, 'you');
        }
    });
}
setTimeout(function() {
    activateChat();
}, 500);

function addChatBubble(message, user) {
    console.log(message);
    let chatMessageContainer = document.querySelector('section.chat-messages'),
        newMessage = document.createElement('div');
    
    newMessage.className = 'message';
    newMessage.textContent = message;
    newMessage.setAttribute('user', user);
    
    chatMessageContainer.append(newMessage);
    
    setTimeout(function() {
        newMessage.remove();
    }, 10000);
}



// Scripting

// Load jQuery
function loadJquery() {
    let body = document.querySelector('body'),
        scriptJquery = document.createElement('script'),
        hostedJquery = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    
    scriptJquery.setAttribute('type', 'text/javascript');
    scriptJquery.setAttribute('src', hostedJquery);
    scriptJquery.addEventListener('load', function() {
        scripting();
    });
    
    body.append(scriptJquery);
}
loadJquery();

// Behaviors for scripting
function scripting() {
    let body = document.querySelector('body'),
        logo = document.querySelector('div.logo'),
        huddleButton = document.querySelector('button.join-huddle'),
        user4Video = document.querySelector('article.user[user-id="4"] video'),
        user5Video = document.querySelector('article.user[user-id="5"] video');
    
    logo.addEventListener('click', function() {
        let burstCount = body.getAttribute('burst-count'),
            huddleCount = body.getAttribute('huddle-count'),
            chatCount = body.getAttribute('chat-count'),
            screenshare = body.getAttribute('screenshare'),
            audioOne = document.querySelector('audio#audio-one'),
            audioTwo = document.querySelector('audio#audio-two'),
            audioThree = document.querySelector('audio#audio-three');
        
        // Initial greeting
        if ( burstCount === "0" ) {
            body.setAttribute('burst-count', '1');
            audioOne.play();
            setTimeout(function() {
                body.setAttribute('burst-count', '2');
            }, 2000);
            
            setTimeout(function() {
                let message = 'Eyyyy you made it!',
                    user = 'Blimple';

                addChatBubble(message, user);
                body.setAttribute('chat-count', '1');
            }, 2000);
        }
        // Peace out to meeting
        else if ( burstCount === "2" ) {
            let firstUser = document.querySelector('div.user-row article.user:nth-child(1)');
            
            body.setAttribute('burst-count', '3');
            audioTwo.play();
            
            setTimeout(function() {
                body.setAttribute('burst-count', '4');
            }, 2000);
            
            setTimeout(function() {
                firstUser.setAttribute('status', 'Meeting');
                firstUser.querySelector('div.activity-status').textContent = 'Meeting';
            }, 3000);
        }
        // Add first user to huddle
        else if ( huddleCount === "0" ) {
            body.setAttribute('huddle-count', '1');
            user4Video.volume = 1.0;
            user4Video.play();
            
            let videoA = $('article.user[user-id="4"] video');
            
            setTimeout(function() {
                videoA.animate({
                    volume: 0.0
                }, 2000);
            }, 8000);
        }
        // Enable screen share
        else if ( screenshare === "0") {
            body.setAttribute('screenshare', '1');
        }
        // Chat response
        else if ( chatCount === "1" ) {
            let message = 'Sorry, I probably won\'t be much help',
                user = 'Boffsnof';
            
            addChatBubble(message, user);
            body.setAttribute('chat-count', '2');
        }
        // Add second user to huddle
        else if ( huddleCount === "1") {
            body.setAttribute('huddle-count', '2');
            user4Video.volume = 1.0;
            user5Video.volume = 1.0;
            user5Video.play();
            
            let videoA = $('article.user[user-id="4"] video'),
                videoB = $('article.user[user-id="5"] video');
            
            setTimeout(function() {
                videoA.animate({
                    volume: 0.0
                }, 2000);
                
                videoB.animate({
                    volume: 0.0
                }, 2000);
            }, 8000);
            
            huddleButton.addEventListener('click', function() {
                body.setAttribute('outro', '1');
                audioThree.play();
            });
        }
        // Reset
        else {
            body.setAttribute('screenshare', '0');
            body.setAttribute('huddle-count', '0');
            body.setAttribute('chat-count', '0');
            body.setAttribute('burst-count', '0');
            user4Video.pause();
            user5Video.pause();
        }
    });
}

// Timing for scripting
function scriptTiming() {
    let advanceButton = document.querySelector('div.logo'),
        sparkle = document.querySelector('div.formation.unread'),
        scriptsRun = 0;
    
    setTimeout(function() {
        advanceButton.click();
    }, 5000);
    
    setTimeout(function() {
        advanceButton.click();
    }, 25000);

    sparkle.addEventListener('click', function() {
        scriptsRun++;
        
        if (scriptsRun === 1) {
            setTimeout(function() {
                advanceButton.click();
            }, 500);

            setTimeout(function() {
                advanceButton.click();
            }, 5000);

            setTimeout(function() {
                advanceButton.click();
            }, 10000);

            setTimeout(function() {
                advanceButton.click();
            }, 15000);
        }
    });
    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 1000);
//    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 10000);
//    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 20000);
//    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 25000);
//    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 30000);
//    
//    setTimeout(function() {
//        advanceButton.click();
//    }, 35000);
}