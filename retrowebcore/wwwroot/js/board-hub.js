﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/boardhub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    $('#sendButtonSpinner').addClass("hidden");
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    $('#sendButtonSpinner').removeClass("hidden");
    var user = document.getElementById("userInput").value;
    connection.invoke("SendMessage", user, user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
