let input = document.getElementById("chatMessage");
let conversationContainer = document.getElementById("chatMessages");
let conversationBox = document.getElementById("chatMessagesBox");

let chatboxTotalHeight = 0;
let chatboxCurrentHeight = 0;

let firstMessage = true;

let nameError = false;
let phoneError = false;
let emailError = false;

let mainMenuId = -1;

const chatAPiurl = "https://chat.mindler.com/chatbot/v1/test/";
let timeOut;

const urlForOptions = chatAPiurl + "send-input-response";
const urlForLogin = chatAPiurl + "enter-details";
const urlForText = chatAPiurl + "send-message-input";

let buttonsToRemove = [];

if (localStorage.getItem("chat_token") == null) {
    document.getElementById("chatboxFooter").style.display = "none";
    document.getElementById("chatboxBefore").style.display = "none";
} else {
    document.getElementById("loginForm").style.display = "none";
    makeFirstRequest();
}

calculateChatbotHeight();


// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        addUserMessage(input.value, 'fromInput');
    }
});


function messageEntered() {
    clearTimeout(timeOut);
}


async function updateVisibility() {
    document.getElementById("chatBox").classList.toggle('display');
    document.getElementById("chatIcon").classList.toggle('display');
}


//Function contains two parameters 1- message , 2-FromTextField
async function addUserMessage(message, type) {
    if (message.trim().length == 0) {
        return;
    }
    conversationBox.appendChild(document.createElement("br"));
    let container = document.createElement("div");
    container.classList.add("chatbox__container--client");

    let nameContainer = document.createElement("div");
    nameContainer.classList.add("mb-2");
    nameContainer.innerHTML = '<p class="chatuser__text">You</p>'

    container.appendChild(nameContainer);

    let tag = document.createElement("p");
    tag.classList.add("chatbox__message");
    tag.classList.add("chatbox__message--client");
    tag.innerHTML = textToHTML(message);
    container.appendChild(tag);
    conversationBox.appendChild(container);
    scrollChatToBottom();
    addTypingMessage();


    //If Message is from input field then call text API
    if (type == "fromInput") {
        //Clearing input field
        input.value = "";
        let data = {
            "message": message
        }
        let response = await post(urlForText, data);
        let format = {
            "annotations": []
        };
        format.annotations.push({
            "annotation": response.annotation_blogs || []
        });
        for (let link of response.links_blogs || []) {
            format.annotations.push({
                "annotation": link
            });
        }
        addAdminMessage(format);

        data = {
            "annotations": [{
                "annotation": "For more details contact us at <a href='mailto: hello@mindler.com'>hello@mindler.com</a>"
            }]
        }
        timeOut = setTimeout(function() {
            addAdminMessage(data)
        }, 30000);
    }
}


//Admin Message takes in parameter of JSON object which consits of text
//Buttons to be to added to admin side from the response
function addAdminMessage(data) {

    disablePreviousButtons();

    let container = document.createElement("div");
    container.classList.add("chatbox__container");
    container.appendChild(document.createElement("br"));

    //Setting ID for few containers which we might change accordingly
    if (data.id) {
        container.setAttribute("id", data.id);
    }

    let nameContainer = document.createElement("div");
    nameContainer.classList.add("d-flex");
    nameContainer.classList.add("mb-2");
    nameContainer.innerHTML = '<img src="https://mindlerimages.imgix.net/chatbot/bot-icon.png" class="chat__user__icon mr-2"> <p class="chatuser__text">Mindler Bot</p>';

    container.appendChild(nameContainer);

    if (data.annotations == undefined || data.annotations.length == 0) {
        data.annotations = [{
            annotation: "Please select an option from below"
        }];
    }

    for (let i = 0; i < data.annotations.length; i++) {
        let message = data.annotations[i].annotation;
        if (message.trim().length > 0) {
            let tag = document.createElement("p");
            tag.classList.add("chatbox__message");
            tag.classList.add("chatbox__message--admin");
            tag.innerHTML = textToHTML(message);
            container.appendChild(tag);
        }
    }
    container.appendChild(document.createElement("br"));
    //If there are no buttons adding options to goBack or Restart
    if (!data.buttons || data.buttons.length === 0) {
        data.buttons = [{
            id: mainMenuId,
            button: 'Return to Main Menu'
        }, {
            id: 1,
            button: 'Restart Chat'
        }];
    }

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("options__container");

    for (let button of data.buttons) {
        let buttonElement = document.createElement("button");
        text = document.createTextNode(button.button);
        buttonElement.appendChild(text);
        buttonElement.classList.add("btn");
        buttonsContainer.appendChild(buttonElement);
        buttonsToRemove.push(button.id);
        buttonElement.setAttribute('id', "buttonId" + button.id);
        buttonElement.setAttribute("onclick", "optionSelected(" + button.id + ");addUserMessage('" + button.button + "','fromButton');");
    }
    removeTypingMessage();
    container.appendChild(buttonsContainer);
    conversationBox.appendChild(container);
    updateChatbotContainerHeights();
    scrollChatToBottom();
}

function updateChatbotContainerHeights() {
    let chatboxContentHeight = document.getElementById("chatMessagesBox").clientHeight;
    chatboxCurrentHeight = Math.max(0, chatboxCurrentHeight - chatboxContentHeight);
    document.getElementById("chatboxBefore").style.height = chatboxCurrentHeight + "px";
}

async function loginUser() {
    let name = document.getElementById("userName").value.trim();
    let email = document.getElementById("userEmail").value.trim();
    let phone = document.getElementById("userPhone").value.trim();
    if (name.length == 0 || name == null || !isValidName(name)) {
        addError("userName", "Please Enter a Valid Name to Continue");
        return;
    }
    if (!isValidPhone(phone)) {
        addError("userPhone", "Please Enter a Valid Mobile Number");
        return;
    }
    if (!isValidEmail(email)) {
        addError("userEmail", "Please Enter a Valid Email");
        return;
    }
    let loginReponse = await post(urlForLogin, {
        "name": name,
        "email": email,
        "phone": phone
    });

    localStorage.setItem("chat_token", loginReponse.token);
    makeFirstRequest();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatboxFooter").style.display = "block";
    document.getElementById("chatboxBefore").style.display = "block";
}

function calculateChatbotHeight() {
    chatboxTotalHeight = document.getElementById("chatMessages").clientHeight;
    chatboxCurrentHeight = chatboxTotalHeight;
}

async function makeFirstRequest() {
    addTypingMessage();
    let data = {
        "option_id": 1
    }
    let response = await post(urlForOptions, data);
    addAdminMessage(response);
}

function isValidPhone(phone) {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phone);
}

function isValidName(name) {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name);
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function addError(elementId, message) {
    if (elementId === "userName") {
        nameError = true;
    } else if (elementId === "userPhone") {
        phoneError = true;
    } else {
        emailError = true;
    }
    document.getElementById(elementId).classList.add("invalid");
    document.getElementById(elementId + "Error").textContent = message;
}

//Removes Error Messages for given form input element (if there were any)
function removeErrors(elementId) {
    document.getElementById(elementId + "Error").textContent = "";
    document.getElementById(elementId).classList.remove("invalid");
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}



function addTypingMessage() {
    //Making Other buttons not clickable until user gets response
    // conversationBox.style.pointerEvents = "none";

    removeTypingMessage();
    let container = document.createElement("div");
    container.setAttribute("id", "typingMessage");
    container.classList.add("typing-indicator");
    container.innerHTML = "<span></span><span></span><span></span>"
    conversationBox.appendChild(container);
}

function removeTypingMessage() {
    conversationBox.style.pointerEvents = "auto";
    if (document.getElementById("typingMessage") != null)
        document.getElementById("typingMessage").remove();
}

async function optionSelected(num) {
    if (num == 2 || num == 3 || num == 4) {
        mainMenuId = num;
    }
    addAdminMessage(await post(urlForOptions, {
        option_id: num
    }));
}

function disablePreviousButtons() {
    while (buttonsToRemove.length != 0) {
        document.getElementById("buttonId" + buttonsToRemove.pop()).remove();
    }
}

function showChatMenu() {
    document.getElementById("chatboxBodyInner").classList.add("scrn-disabled");
    document.getElementById("chatboxMenu").classList.add("display");
}

function hideChatMenu() {
    document.getElementById("chatboxBodyInner").classList.remove("scrn-disabled");
    document.getElementById("chatboxMenu").classList.remove("display");
}

function returnToMainMenu() {
    if (mainMenuId === -1) {
        restartChat();
        return;
    }
    hideChatMenu();
    optionSelected(mainMenuId);
}

function restartChat() {
    hideChatMenu();
    makeFirstRequest();
}

//Funtion to Scroll Chat towards Bottom
function scrollChatToBottom() {
    conversationContainer.scrollTop = conversationContainer.scrollHeight + '100';
}


//Function to parse String to HTML
function textToHTML(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body.innerHTML;

};

//Function to make POST Request and return response
async function post(url, data) {
    try {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'session': localStorage.getItem('chat_token')
            },
            body: JSON.stringify(data)
        })
        const content = await rawResponse.json();
        console.log(content);
        return content;
    } catch (error) {
        return {
            "annotations": [{
                annotation: "Some Error Occurred ! Please Try Again"
            }]
        }
    }
}