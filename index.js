//import files to work with database - listing off the functions of each i will need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
const pulledToEl= document.querySelector("#pulled-to-el");
const pulledCommentEl = document.querySelector("#pulled-comment-el");
const pulledFromEl = document.querySelector("#pulled-from-el");
const consoleContainerEl = document.querySelector("#console-container-el")
const likeNumberEl = document.querySelector("#like-number-el")

//button identifier
const SubmitBtn = document.querySelector("#Submit-btn");

//need likes button
//need likes button function

//submit button - adds inputs into an array and sends it to the database
SubmitBtn.addEventListener("click", function(event) {
    const userInputsArray = {}
    userInputsArray["userTo"] = userToEl.value;
    userInputsArray["userFrom"] = userFromEl.value;
    userInputsArray["userComment"] = userCommentEl.value;
    userInputsArray["likes"] = 0;
    push(championsInDB, userInputsArray)
    clearUserInput()
    console.log(event)
})

//compares page values to database with a snapshot. if database has info it is printed out, if not it makes the user champions block empty
onValue(championsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let storedUserData = Object.entries(snapshot.val())
        clearUserPosts()
        for (let i = 0; i < storedUserData.length; i++) {
            let currentItem = storedUserData[i];
            makeElement(currentItem)
        }
    } else {
        consoleContainerEl.innerHTML = "no posts yet"
    }
}) 



//main function - make element out of id
function makeElement(id) {
    //pulled data from array saved to a variable
    const objectId = id[0]
    const userObject = id[1]
    const userId = id[0]
    let editLikes = userObject['likes']

    console.log(editLikes)


    //setting the variable from object to its own variable
    const makeTo = userObject["userTo"]
    const makeFrom = userObject["userFrom"]
    const makeComment = userObject["userComment"]
    const makeLikes = editLikes

    //make elements
    let newToEl = document.createElement("h3")
    let newFromEl = document.createElement("h3")
    let newCommentEl = document.createElement("p")
    let newFromLikeDivEL = document.createElement("div")
    let likeRatioDivEl = document.createElement("div")
    let likeImgEl = document.createElement("img")
    let likeCountEl = document.createElement("h3")
    const newElement = window.document.createElement('div');

    //set element values
    newToEl.textContent = makeTo;
    newFromEl.textContent = makeFrom;
    newCommentEl.textContent = makeComment;
    likeCountEl.textContent = makeLikes

    //set element attributes
    newFromLikeDivEL.setAttribute("class", "from-like-div-el")
    likeRatioDivEl.setAttribute("class", "ratio-container-el")
    likeRatioDivEl.setAttribute("id", `${userId}`)
    likeRatioDivEl.setAttribute("role", "button")
    newFromEl.setAttribute("id", "ratio-container-from-el")

    likeRatioDivEl.addEventListener("click", function() {
        editLikes += 1;
        let locationDB = ref(database, `champions/${objectId}`)
        update(locationDB, {likes: editLikes,})
    })

        
        /* const object = await Object.findOne({ id: 1 });
        object.values[0] += 1
         */

    likeImgEl.setAttribute("src", "./assets/like.png") 
    likeImgEl.setAttribute("id", "like-img-el-btn")
    likeCountEl.setAttribute("id", "like-number-el")
    newElement.classList.add('userPosts');

    //put new elements into the container
    newElement.append(newToEl, newCommentEl, newFromLikeDivEL)
    newFromLikeDivEL.append(newFromEl, likeRatioDivEl)
    likeRatioDivEl.append(likeImgEl, likeCountEl)

    //print new page section onto page
    window.document.querySelector("#console-container-el").appendChild(newElement)

}






//other functions

//clears user inputs 
function clearUserInput() {
    userToEl.value = "";
    userFromEl.value = "";
    userCommentEl.value = ""
}
function clearUserPosts() {
    consoleContainerEl.innerHTML = "";
}
function test() {
    console.log("see this")
}