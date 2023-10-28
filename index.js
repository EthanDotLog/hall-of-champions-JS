//import files to work with database - listing off the functions of each i will need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//setting database location
const appSettings = {
    databaseURL: "https://hall-of-champions-78f1d-default-rtdb.firebaseio.com/"
}

//setting up database
const app = initializeApp(appSettings);
const database = getDatabase(app);
const championsInDB = ref(database, "champions");

//user inputs
const userCommentEl = document.querySelector("#user-comment-el");
const userFromEl = document.querySelector("#user-from-el");
const userToEl = document.querySelector("#user-to-el");

//code return locations
const returnsSectionEl = document.querySelector("#returns-section-el")
const pulledToEl= document.querySelector("#pulled-to-el");
const pulledCommentEl = document.querySelector("#pulled-comment-el");
const pulledFromEl = document.querySelector("#pulled-from-el");
const userLikesEl = document.querySelector("#pulled-likes-el");
const consoleContainerEl = document.querySelector("#console-container-el")


//buttons
const iconBtn = document.querySelector("#icon-btn");
const SubmitBtn = document.querySelector("#Submit-btn");


SubmitBtn.addEventListener("click", function() {
    const userInputsArray = {}
    userInputsArray["userTo"] = userToEl.value;
    userInputsArray["userFrom"] = userFromEl.value;
    userInputsArray["userComment"] = userCommentEl.value;
    push(championsInDB, userInputsArray)
})

onValue(championsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let storedUserData = Object.entries(snapshot.val())
        console.log("snapshot value " + snapshot.val()) 
        clearUserPosts()
        for (let i = 0; i < storedUserData.length; i++) {
            let currentItem = storedUserData[i];
            let currentItemValue = currentItem[1]
            let currentItemId = currentItem[0]
            makeElement(currentItem)
        }
    } else {
        consoleContainerEl.innerHTML = "no posts yet"
    }
}) 

function makeElement(id) {
    let userObject = id[1]
    let makeTo = userObject["userTo"]
    let makeFrom = userObject["userFrom"]
    let makeComment = userObject["userComment"]

    let newToEl = document.createElement("h3")
    newToEl.textContent = makeTo;
    let newFromEl = document.createElement("h3")
    newFromEl.textContent = makeFrom;
    let newCommentEl = document.createElement("p")
    newCommentEl.textContent = makeComment;

    const newElement = window.document.createElement('div');
    newElement.classList.add('userPosts');
    newElement.append(newToEl, newFromEl, newCommentEl)
    window.document.querySelector("#console-container-el").appendChild(newElement)
}


/*function updateHTML(input) {
    let itemId= input[0]
    let itemValue= input[1]
    let newToEl = document.createElement('li');
    newToEl.textContent = itemValue
} */

function clearUserPosts() {
    consoleContainerEl.innerHTML = "";
}

