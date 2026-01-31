document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    function AddTask() {
        const inputValue = inputBox.value;
        if (inputValue === "") {
            return;
        }

        let li = document.createElement("li");
        li.innerHTML = inputValue;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.style.cursor = "pointer";
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
    }

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask() {
        const savedData = localStorage.getItem("data");
        if (savedData) {
            listContainer.innerHTML = savedData;
        }
    }

    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    });

    document.getElementById("addButton").addEventListener("click", AddTask);

    inputBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            AddTask();
        }
    });

    showTask();
});
