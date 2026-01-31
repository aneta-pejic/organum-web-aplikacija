document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes-container");
    const createBtn = document.querySelector(".button");

    function showNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = "";

        savedNotes.forEach((noteText) => {
            createNote(noteText);
        });
    }

    function updateStorage() {
        const allNotes = Array.from(document.querySelectorAll(".note p")).map(note => note.innerText);
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }

    function createNote(text = "") {
        let note = document.createElement("div");
        note.className = "note";

        let noteText = document.createElement("p");
        noteText.className = "note-text";
        noteText.setAttribute("contenteditable", "true");
        noteText.innerText = text;

        let img = document.createElement("img");
        img.src = "images/delete.png";
        img.className = "delete-btn";

        img.addEventListener("click", () => {
            note.remove();
            updateStorage();
        });

        noteText.addEventListener("input", updateStorage);

        note.appendChild(noteText);
        note.appendChild(img);
        notesContainer.appendChild(note);
    }

    createBtn.addEventListener("click", () => {
        createNote();
        updateStorage();
    });

    showNotes();
});
