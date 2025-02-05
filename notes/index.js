const newNoteButton = document.getElementById('new-note');
const stopNote = document.getElementById('stop-note');
const notes = document.querySelector('div[id="notes"]');
const editor = document.getElementById('editor-area');
const editingTop = document.getElementById('editing');
const exportButton = document.getElementById('export');
const importButton = document.getElementById('import');

let count = 0;
let noteOpen = false;
let currentNote = null;

function getNotesFromCookies() {
    const notesCookie = document.cookie.split('; ').find(row => row.startsWith('notes='));
    return notesCookie ? JSON.parse(notesCookie.split('=')[1]) : [];
}

function saveNotesToCookies(notesArray) {
    document.cookie = `notes=${JSON.stringify(notesArray)}; path=/; max-age=31536000`;
}

function createNoteElement(note) {
    const newNote = document.createElement('button');
    newNote.className = "new-note";
    newNote.id = note.id;
    newNote.innerHTML = `#${note.id} ${note.time}`;

    newNote.addEventListener('click', () => {
        if (currentNote) {
            saveCurrentNoteContent();
            currentNote.style.backgroundColor = '';
        }
        document.querySelector('h2[class="hint"]').style.opacity = "0";
        noteOpen = true;
        currentNote = newNote;
        editor.style.display = "flex";
        editor.value = note.content;
        currentNote.style.backgroundColor = '#404040';
        editingTop.innerHTML = `Editing <strong>${newNote.innerHTML}</strong>`;
    });

    newNote.addEventListener('mousedown', (e) => {
        if (e.shiftKey) {
            renameCurrentNote();
        }
    });

    return newNote;
}

function updateNotesList() {
    const savedNotes = getNotesFromCookies();
    notes.innerHTML = '';
    savedNotes.forEach(note => {
        const noteElement = createNoteElement(note);
        notes.appendChild(noteElement);
    });
}

function saveCurrentNoteContent() {
    if (currentNote) {
        const savedNotes = getNotesFromCookies();
        const noteIndex = savedNotes.findIndex(note => note.id === parseInt(currentNote.id));
        if (noteIndex !== -1) {
            savedNotes[noteIndex].content = editor.value;
            saveNotesToCookies(savedNotes);
        }
    }
}

function renameCurrentNote() {
    const newTitle = prompt("Enter new title:");
    if (newTitle && currentNote) {
        const savedNotes = getNotesFromCookies();
        const noteIndex = savedNotes.findIndex(note => note.id === parseInt(currentNote.id));
        if (noteIndex !== -1) {
            savedNotes[noteIndex].time = newTitle;
            saveNotesToCookies(savedNotes);
            currentNote.innerHTML = `#${savedNotes[noteIndex].id} ${newTitle}`;
        }
    }
}

function exportNotes() {
    const savedNotes = getNotesFromCookies();
    const json = JSON.stringify(savedNotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()} ${new Date().getHours()}_${new Date().getMinutes()}-notes.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importNotes(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const importedNotes = JSON.parse(reader.result);
                console.log(importedNotes);
                if (Array.isArray(importedNotes)) {
                    saveNotesToCookies(importedNotes);
                    updateNotesList();
                } else {
                    alert('Invalid JSON structure');
                }
            } catch (e) {
                alert('Failed to parse JSON');
                console.error('Error parsing JSON:', e);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid JSON file');
    }
}

newNoteButton.addEventListener('click', () => {
    const currentTime = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}`;
    const newNote = {
        id: count + 1,
        time: currentTime,
        content: '',
    };
    count++;
    const newNoteElement = createNoteElement(newNote);
    notes.appendChild(newNoteElement);

    const savedNotes = getNotesFromCookies();
    savedNotes.push(newNote);
    saveNotesToCookies(savedNotes);
    updateNotesList();
});

stopNote.addEventListener('click', () => {
    document.querySelector('h2[class="hint"]').style.opacity = "1";
    noteOpen = false;
    if (currentNote) {
        currentNote.style.backgroundColor = '#303030';
        saveCurrentNoteContent();
    }
    editor.style.display = 'none';
});

exportButton.addEventListener('click', exportNotes);
importButton.addEventListener('change', importNotes);

updateNotesList();
