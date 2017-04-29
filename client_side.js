function webSocketInit() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:8001");
    }
    ws.onopen = function () {
        console.log("Connected. client_side.js file");

    };
    ws.onclose = function () {
        connectionClosedNotification();
        console.log("Connection closed. client_side.js")
    };
    ws.onmessage = function (event) {
        let response = JSON.parse(event.data); // convert the response back to an object
        console.log(response.text);
        console.log("Message received", event);
        receiveMessage(response);

    };
    return ws;
}
function sendMessage(senderID, receiverID, ws) {
    // Grab the message text from the input field
    let messageText = document.getElementById("message").value;
    // Package message text in an object
    let messageObject = {
        type: "message",
        sender: senderID,
        receiver: receiverID,
        text: messageText,
        date: new Date()
    };
    // Stringify messageText
    ws.send(JSON.stringify(messageObject));
    document.getElementById("message").value = ''; // clear the input field
};

function receiveMessage(messageObject) {
    console.log("receiveMessage", messageObject);
    let messageDiv = document.createElement('li');
    messageDiv.className = "mdl-list__item mdl-list__item--three-line";
    let messageContent = document.createElement('span');
    messageContent.className = "mdl-list__item-primary-content";

    let avatar = document.createElement('i');
    avatar.className = 'material-icons mdl-list__item-avatar';
    let personIcon = document.createTextNode('person');
    avatar.appendChild(personIcon);
    messageContent.appendChild(avatar); // Add the avatar to the item

    let usernameSpan = document.createElement('span');
    let username = document.createTextNode('Username');
    usernameSpan.appendChild(username); // Append username text to username span
    messageContent.appendChild(usernameSpan);

    let messageTextArea = document.createElement('span');
    messageTextArea.className = "mdl-list__item-text-body";
    let messageText = document.createTextNode(messageObject.text); // Pull off the text of the message
    messageTextArea.appendChild(messageText); // Append message text to message text area
    messageContent.appendChild(messageTextArea); // Append the message text + message text span to the list item

    messageDiv.appendChild(messageContent); // Add the message content to the list item messageDiv
    document.getElementById('content').appendChild(messageDiv);

}

function displayMessage(messageObject) {}

function User(username) {
    this.name = username;
    this.id = Math.floor(Math.random()*1000 + 1); // +1 *just in case* math.random actually returns something that would get floored to 0
}



function connectionClosedNotification() {
    let modalContainer = document.createElement("dialog");
    modalContainer.className = "mdl-dialog"; // Add the mdl class

    let modalTitleElement = document.createElement("h3");
    modalTitleElement.className = "mdl-dialog__title";
    let modalTitleText = document.createTextNode("Connection closed");
    modalTitleElement.appendChild(modalTitleText); // Add title text to title


    let modalContent = document.createElement("div");
    modalContent.className = "mdl-dialog__content";


    let modalActions = document.createElement("div");
    modalActions.className = "mdl-dialog__actions";

    let confirmationButton = document.createElement("button");
    confirmationButton.className = "mdl-button";
    let confirmationButtonText = document.createTextNode("Okay");
    confirmationButton.appendChild(confirmationButtonText);


    modalContainer.appendChild(modalTitleElement); // Add title to container
    modalContainer.appendChild(modalContent); // Add body content of modal element to the modal
    modalActions.appendChild(confirmationButton); // Add buttons to action section
    modalContainer.appendChild(modalActions);  // Add actions element to modal

    componentHandler.upgradeElement(modalContainer);
    document.getElementById('content').appendChild(modalContainer);
};

const socket = webSocketInit();