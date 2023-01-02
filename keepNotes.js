function toggleNavbar() {
    let navlinkbar = document.getElementById('navlinkbar');
    let nav = document.getElementById('nav');
    navlinkbar.classList.toggle('hidden')
    navlinkbar.classList.toggle('translate-y-16')
    nav.classList.toggle('h-48')
}

let animateby = document.getElementById('notetext');
let animate = document.getElementsByClassName('animate')
animateby.addEventListener("focus" , ()=>{
    animate[0].classList.remove('hidden')
    animate[0].classList.add('inline-block')
    animate[1].classList.remove('hidden')
    animate[1].classList.add('inline-block')
    animateby.classList.add('h-44')
});
const inputAnimation=()=>{
    animate[0].classList.remove('inline-block')
    animate[0].classList.add('hidden')
    animate[1].classList.remove('inline-block')
    animate[1].classList.add('hidden')
    animateby.classList.remove('h-44')
}

const searchAnimation = ()=>{
    let search = document.getElementById('search');
    let searchIcon = document.getElementsByClassName('fa-search');
    search.classList.toggle('hidden')
    searchIcon[0].classList.toggle('hidden')
}

showNote();
let noteTitle = document.getElementById('noteTitle');
let notetext = document.getElementById('notetext');
let output = document.getElementById('output');
let addbtn = document.getElementById('btn');

addbtn.addEventListener('click', function () {
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let fullDate = new Date();
    let date = fullDate.toLocaleString();
    let myObj = {
        title : noteTitle.value,
        text : notetext.value,
        date : date
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    noteTitle.value = "";
    notetext.value = "";
    showNote();
    inputAnimation();
});
function showNote() {
    let html = "";
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function(element, index){
        html += `
                <div id="card-body" class="noteCard max-w-md border-2 p-2 m-3">
                    <h3 id="card-title" class="card font-semibold">${element.title}</h3>
                    <p id="card-note" class="card">${element.text}</p>
                    <div class="flex flex-col space-y-1 mt-2">
                        <div class="flex space-x-2">
                            <i class="fa fa-trash" id="${index}" title="Delete" onclick="deletenote(this.id)" id="del"></i>
                            <i class="fa fa-archive" id="${index}" title="Archive" onclick="archivenote(this.id)" id="archive"></i>
                            <i class="fa fa-thumb-tack" id="${index}" title="Pin" onclick="pinnote(this.id)" id="pin"></i>
                        </div>
                        <span class="text-xs">${element.date}</span>
                    </div>
                </div>`
    });

    document.getElementById('output_header').innerText = "Notes";
    let noteContainor = document.getElementById('noteContainor');
    if(notesObj.length != 0){
        noteContainor.innerHTML = html;
    }
    else{
        noteContainor.innerHTML = `<h4>Nothing to show! Use above "Add Notes" section to add notes.</h4>`;
    }

    showPinNote();
    
    let main_containor = document.getElementById('main_containor');
    let timer_containor = document.getElementById('timer_containor');

    main_containor.style.display = "block";
    timer_containor.style.display = "none";
}
function deletenote(index){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes' , JSON.stringify(notesObj));
    showNote();
}

function archivenote(index){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let noteTitelValue = notesObj[index].title;
    let noteTextValue = notesObj[index].text;
    let noteDateValue = notesObj[index].date;
    
    notesObj.splice(index,1);
    localStorage.setItem('notes' , JSON.stringify(notesObj));

    let archiveNotes = localStorage.getItem('archiveNotes');
    if(archiveNotes == null){
        archivenotesObj = [];
    }
    else{
        archivenotesObj = JSON.parse(archiveNotes);
    }
    let myObj = {
        title : noteTitelValue,
        text : noteTextValue,
        date : noteDateValue
    }
    archivenotesObj.push(myObj);
    localStorage.setItem('archiveNotes', JSON.stringify(archivenotesObj));

    showNote();
}
function showArchive(){
    let html = "";
    let notes = localStorage.getItem('archiveNotes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function(element, index){
        html += `  
                <div id="card-body" class="noteCard max-w-md border-2 p-2 m-3">
                    <h3 id="card-title" class="card font-semibold">${element.title}</h3>
                    <p id="card-note" class="card">${element.text}</p>
                    <div class="flex flex-col space-y-1 mt-2">
                        <div class="flex space-x-2">
                            <i class="fa fa-trash" id="${index}" title="Delete" onclick="deleteArchivenote(this.id)" id="del"></i>
                            <i class="fa fa-archive" id="${index}" title="Unarchive" onclick="unArchive(this.id)" id="archive"></i>
                        </div>
                        <span class="text-xs">${element.date}</span>
                    </div>
                </div>`
    });

    let noteContainor = document.getElementById('noteContainor');
    document.getElementById('output_header').innerText = "Archive Notes";
    document.getElementById('pinNoteContainor').innerHTML = "";

    if(notesObj.length != 0){
        noteContainor.innerHTML = html;
    }
    else{
        noteContainor.innerHTML = `<h4>Nothing to show! Use above "Add Notes" section to add notes.</h4>`;
    }

    let main_containor = document.getElementById('main_containor');
    let timer_containor = document.getElementById('timer_containor');

    main_containor.style.display = "block";
    timer_containor.style.display = "none";
}
function deleteArchivenote(index){
    let notes = localStorage.getItem('archiveNotes');
    if(notes == null){
        archivenotesObj = [];
    }
    else{
        archivenotesObj = JSON.parse(notes);
    }
    archivenotesObj.splice(index,1);
    localStorage.setItem('archiveNotes' , JSON.stringify(archivenotesObj));
    showArchive();
}
function unArchive(index){
    let archivenotes = localStorage.getItem('archiveNotes');
    if(archivenotes == null){
        archivenotesObj = [];
    }
    else{
        archivenotesObj = JSON.parse(archivenotes);
    }
    let archiveNoteTitle =  archivenotesObj[index].title;
    let archiveNoteText =  archivenotesObj[index].text;
    let archiveNotedate =  archivenotesObj[index].date;
    archivenotesObj.splice(index,1);
    localStorage.setItem('archiveNotes' , JSON.stringify(archivenotesObj));


    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : archiveNoteTitle,
        text : archiveNoteText,
        date : archiveNotedate
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));


    showArchive();
}

function pinnote(index){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let noteTitelValue = notesObj[index].title;
    let noteTextValue = notesObj[index].text;
    let noteDateValue = notesObj[index].date;
    
    notesObj.splice(index,1);
    localStorage.setItem('notes' , JSON.stringify(notesObj));

    let pinNotes = localStorage.getItem('pinNotes');
    if(pinNotes == null){
        pinnotesObj = [];
    }
    else{
        pinnotesObj = JSON.parse(pinNotes);
    }
    let myObj = {
        title : noteTitelValue,
        text : noteTextValue,
        date : noteDateValue
    }
    pinnotesObj.push(myObj);
    localStorage.setItem('pinNotes', JSON.stringify(pinnotesObj));

    showNote();
    showPinNote();
}
function showPinNote(){
    let html = "";
    let notes = localStorage.getItem('pinNotes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function(element, index){
        html += `  
                <div id="card-body" class="noteCard max-w-md border-2 p-2 m-3">
                    <h3 id="card-title" class="card font-semibold">${element.title}</h3>
                    <p id="card-note" class="card">${element.text}</p>
                    <div class="flex flex-col space-y-1 mt-2">
                        <div class="flex space-x-2">
                            <i class="fa fa-trash" id="${index}" title="Delete" onclick="deletePinNote(this.id)" id="del"></i>
                            <i class="fa fa-thumb-tack" id="${index}" title="Unpin" onclick="unPin(this.id)" id="unpin"></i>
                        </div>
                        <span class="text-xs">${element.date}</span>
                    </div>
                </div>`
    });

    let noteContainor = document.getElementById('pinNoteContainor');
    document.getElementById('output_header').innerText = "Notes";
    if(notesObj.length != 0){
        noteContainor.innerHTML = html;
    }
    else{
        noteContainor.innerHTML = ``;
    }
}
function deletePinNote(index){
    let notes = localStorage.getItem('pinNotes');
    if(notes == null){
        pinnotesObj = [];
    }
    else{
        pinnotesObj = JSON.parse(notes);
    }
    pinnotesObj.splice(index,1);
    localStorage.setItem('pinNotes' , JSON.stringify(pinnotesObj));
    showPinNote();
}
function unPin(index){
    let pinNotes = localStorage.getItem('pinNotes');
    if(pinNotes == null){
        pinnotesObj = [];
    }
    else{
        pinnotesObj = JSON.parse(pinNotes);
    }
    let archiveNoteTitle =  pinnotesObj[index].title;
    let archiveNoteText =  pinnotesObj[index].text;
    let archiveNotedate =  pinnotesObj[index].date;
    pinnotesObj.splice(index,1);
    localStorage.setItem('pinNotes' , JSON.stringify(pinnotesObj));


    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : archiveNoteTitle,
        text : archiveNoteText,
        date : archiveNotedate
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));


    showPinNote();
    showNote();
}

function timer(){ 
    let add_timer = document.getElementById('add_timer');
    add_timer.addEventListener('click' , function(){
        let time = document.getElementById('time').value;

        setTimeout(() => {
            alert("Your timer has ended of time " + time +" s");
        }, time*1000);
    });

    let main_containor = document.getElementById('main_containor');
    let timer_containor = document.getElementById('timer_containor');

    main_containor.style.display = "none";
    timer_containor.style.display = "block";
}

let searchtext = document.getElementById('search');
searchtext.addEventListener('input' , function(){
    let val = searchtext.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByClassName('card')[0].innerText.toLowerCase();
        let cardtext = element.getElementsByClassName('card')[1].innerText.toLowerCase();
        if(cardtext.includes(val) || cardTitle.includes(val)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});