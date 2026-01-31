document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const amountBox = document.getElementById("amount-box");
    const typeBox = document.getElementById("type-box");
    const listContainer = document.getElementById("list-container");

    function AddTask() {
        const itemValue = inputBox.value.trim();
        let amountValue = amountBox.value.trim();
        let typeValue = typeBox.value.trim();

        if (amountValue === "") {
            amountValue = "1";
        }

        if (typeValue === "") {
            typeValue = "piece";
        }

        let li = document.createElement("li");
        li.innerHTML = `<strong>${itemValue}</strong> - ${amountValue} ${typeValue}`;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.style.marginLeft = "10px";
        span.style.cursor = "pointer";
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
        li.appendChild(span);

        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData();
        });

        listContainer.appendChild(li);

        inputBox.value = "";
        amountBox.value = "";
        typeBox.value = "";

        saveData();
    }

    function saveData() {
        localStorage.setItem("shoppingData", listContainer.innerHTML);
    }

    function showTask() {
        const savedData = localStorage.getItem("shoppingData");
        if (savedData) {
            listContainer.innerHTML = savedData;

            listContainer.querySelectorAll("span").forEach(span => {
                span.addEventListener("click", function () {
                    span.parentElement.remove();
                    saveData();
                });
            });

            listContainer.querySelectorAll("li").forEach(li => {
                li.addEventListener("click", function () {
                    li.classList.toggle("checked");
                    saveData();
                });
            });
        }
    }

    document.getElementById("addButton").addEventListener("click", AddTask);

    [inputBox, amountBox, typeBox].forEach(input => {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                AddTask();
            }
        });
    });

    showTask();
});
