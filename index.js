import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://hall-of-champions-78f1d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const championsInDB = ref(database, "champions");

let test = "test input";
function pushtest() {
    push(championsInDB, test)

}
pushtest()


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


//buttons
const iconBtn = document.querySelector("#icon-btn");
const SubmitBtn = document.querySelector("#Submit-btn");



