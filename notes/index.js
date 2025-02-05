const newNoteButton = document.getElementById('new-note');
const notes = document.querySelector('div[id="notes"]');
const editor = document.getElementById('editor-area');
const left = document.getElementById('left');
const editingTop = document.getElementById('editing');

let count = 0;
let noteOpen = false;
let currentNote = null;

newNoteButton.addEventListener('click', () => {
    const newNote = document.createElement('button');
    count++;
    newNote.className = "new-note";
    newNote.id = count;

    let currentTime = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}`;
    newNote.innerHTML = `#${count} ${currentTime}`;

    notes.appendChild(newNote);

    newNote.addEventListener('click', () => {
        noteOpen = true;
        if (currentNote) {
            currentNote.style.backgroundColor = '';
        }
        currentNote = newNote;
        document.querySelector('h1[class="hint"]').innerHTML = `Editing #${currentNote.id}`;
        editor.style.display = "flex";
        currentNote.style.backgroundColor = '#404040';
        editingTop.innerHTML = `Editing <strong>${newNote.innerHTML}</strong>`;
    });
});
