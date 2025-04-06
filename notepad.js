document.addEventListener('DOMContentLoaded', function() {
    const noteEditor = document.getElementById('noteEditor');
    const noteTitle = document.getElementById('noteTitle');
    const notesList = document.querySelector('.notes-list');
    const newNoteBtn = document.getElementById('newNote');
    const saveNoteBtn = document.getElementById('saveNote');
    const downloadNoteBtn = document.getElementById('downloadNote');
    const clearAllNotesBtn = document.getElementById('clearAllNotes');
    const boldBtn = document.getElementById('boldText');
    const italicBtn = document.getElementById('italicText');
    const underlineBtn = document.getElementById('underlineText');
    const fontSizeSelect = document.getElementById('fontSize');
    const textColorInput = document.getElementById('textColor');
    const saveModal = document.getElementById('saveModal');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDelete');

    let currentNoteId = null;
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Initialize
    loadNotes();
    if (notes.length > 0) {
        loadNote(notes[0].id);
    }

    // Event Listeners
    newNoteBtn.addEventListener('click', createNewNote);
    saveNoteBtn.addEventListener('click', saveNote);
    downloadNoteBtn.addEventListener('click', downloadNote);
    clearAllNotesBtn.addEventListener('click', () => deleteModal.style.display = 'block');
    confirmDeleteBtn.addEventListener('click', clearAllNotes);

    // Text formatting
    boldBtn.addEventListener('click', () => document.execCommand('bold', false, null));
    italicBtn.addEventListener('click', () => document.execCommand('italic', false, null));
    underlineBtn.addEventListener('click', () => document.execCommand('underline', false, null));
    fontSizeSelect.addEventListener('change', () => document.execCommand('fontSize', false, fontSizeSelect.value));
    textColorInput.addEventListener('change', () => document.execCommand('foreColor', false, textColorInput.value));

    // Auto-save functionality
    let autoSaveTimeout;
    noteEditor.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(saveNote, 1000);
    });

    noteTitle.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(saveNote, 1000);
    });

    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            saveModal.style.display = 'none';
            deleteModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === saveModal) saveModal.style.display = 'none';
        if (event.target === deleteModal) deleteModal.style.display = 'none';
    });

    function createNewNote() {
        const note = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            created: new Date().toLocaleString()
        };
        notes.unshift(note);
        saveToLocalStorage();
        loadNotes();
        loadNote(note.id);
    }

    function saveNote() {
        if (!currentNoteId) return;

        const noteIndex = notes.findIndex(note => note.id === currentNoteId);
        if (noteIndex === -1) return;

        notes[noteIndex] = {
            ...notes[noteIndex],
            title: noteTitle.value || 'Untitled Note',
            content: noteEditor.innerHTML,
            lastModified: new Date().toLocaleString()
        };

        saveToLocalStorage();
        loadNotes();
        showSaveConfirmation();
    }

    function loadNotes() {
        notesList.innerHTML = notes.map(note => `
            <div class="note-item ${note.id === currentNoteId ? 'active' : ''}" 
                 data-id="${note.id}">
                <div class="note-item-title">${note.title}</div>
                <div class="note-item-date">
                    ${note.lastModified || note.created}
                </div>
            </div>
        `).join('');

        // Add click listeners to note items
        document.querySelectorAll('.note-item').forEach(item => {
            item.addEventListener('click', () => loadNote(parseInt(item.dataset.id)));
        });
    }

    function loadNote(id) {
        const note = notes.find(note => note.id === id);
        if (!note) return;

        currentNoteId = id;
        noteTitle.value = note.title;
        noteEditor.innerHTML = note.content;
        
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.id) === id);
        });
    }

    function downloadNote() {
        if (!currentNoteId) return;

        const note = notes.find(note => note.id === currentNoteId);
        if (!note) return;

        const content = `${note.title}\n\n${noteEditor.innerText}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    function clearAllNotes() {
        notes = [];
        saveToLocalStorage();
        currentNoteId = null;
        noteTitle.value = '';
        noteEditor.innerHTML = '';
        loadNotes();
        deleteModal.style.display = 'none';
    }

    function saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function showSaveConfirmation() {
        saveModal.style.display = 'block';
        setTimeout(() => {
            saveModal.style.display = 'none';
        }, 1500);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    saveNote();
                    break;
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold', false, null);
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic', false, null);
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline', false, null);
                    break;
                case 'n':
                    e.preventDefault();
                    createNewNote();
                    break;
            }
        }
    });

    // Prevent accidental page navigation
    window.addEventListener('beforeunload', function(e) {
        if (noteEditor.innerHTML !== '') {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});