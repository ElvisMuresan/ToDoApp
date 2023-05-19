const confirmationPopUp = document.getElementById("confirmationDialog");
const confirmButton = document.getElementById("PopUp-confirm");
const confirmDeleteHeader = document.getElementById("confirmDeleteHeader");
const notificationElement = document.getElementById("notification");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const remainingTasks = document.getElementById("remaining-tasks");
const toDo = document.querySelector("#inputId");
let storedTodos = JSON.parse(localStorage.getItem("toDos")) || [];
let counterDisplayToDo = storedTodos.length + 1;
let counterStoredTodos = 1;

document.querySelector("#addToDo").addEventListener("click", () => {
  event.preventDefault();
  createToDo(toDo);
});

// Cancel function when it's called, removes the class PopUp-open
function Cancel() {
  confirmationPopUp.classList.remove("PopUp-open");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("confirmationDialog")
    .addEventListener("click", Cancel);
  document
    .querySelector(".PopUp")
    .addEventListener("click", (e) => e.stopPropagation());
});

function displayToDos() {
  let toDos = "";
  for (let i = 0; i < storedTodos.length; i++) {
    toDos += `<div class="toDo">
                        <span class="counter">${counterStoredTodos + i}</span>
                        <input type="checkbox" class="checkbox">
                        <textarea  disabled>${storedTodos[i]}</textarea>
                        <div class="actions">
                            <button><i class=" fa fa-arrow-up upBtn"></i></button>
                            <button><i class=" fa fa-arrow-down downBtn"></i></  button>
                            <button><i class="fas fa-edit editBtn"></i></button>
                            <button><i class=" fas fa-trash deleteBtn"></i></button>
                        </div>
                    <div class="editContent">
                        <button class="saveEditBtn">Save</button>
                    </div>
                </div>`;
  }

  document.querySelector(".toDoList").innerHTML = toDos;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  //activateCancelListeners();
  activateDeleteListeners();
  activateUpListeners();
  activateDownListeners();
  activateCountListeners();
}

/**
 * Show notification
 */

function showNotification(inputValue) {
  let notificationConfig = {
    style: "display: block; color: rgb(128, 230, 230)",
    text: "To do succesfully added!",
  };

  if (!inputValue) {
    notificationConfig = {
      style: "display: block; color: red",
      text: "Please insert a task!",
    };
  }

  notificationElement.style = notificationConfig.style;
  notificationElement.innerText = notificationConfig.text;
  setTimeout(() => (notificationElement.style.display = "none"), 4000);
}

// Create the ToDos
function createToDo(toDo) {
  // showNotification
  showNotification(toDo.value);

  // validate input
  if (toDo.value === "") {
    // return if no input value
    return;
  }

  // store in local storage
  storedTodos.push(toDo.value);
  localStorage.setItem("toDos", JSON.stringify(storedTodos));

  // display toDo on screen
  let toDoDisplay = "";
  toDoDisplay = `<div class="toDo">
                          <span class="counter">${counterDisplayToDo}</span>
                            <input type="checkbox" class="checkbox">
                            <textarea  disabled>${toDo.value}</textarea>
                            <div class="actions">
                              <button><i class=" fa fa-arrow-up upBtn"></i></button>
                              <button><i class=" fa fa-arrow-down downBtn"></i></button>
                              <button><i class="fas fa-edit editBtn"></i></button>
                              <button><i class=" fas fa-trash deleteBtn"></i></button>
                            </div>
                          <div class="editContent">
                            <button class="saveEditBtn">Save</button>
                          </div>
                        </div>`;
  document.querySelector(".toDoList").innerHTML += toDoDisplay;
  counterDisplayToDo++;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  //activateCancelListeners();
  activateDeleteListeners();
  activateUpListeners();
  activateDownListeners();
  activateCountListeners();

  // clean input field
  toDo.value = "";
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      confirmDeleteHeader.innerText = `Are you sure you want to delete "${storedTodos[i]}"?`;
      confirmationPopUp.classList.add("PopUp-open");
      confirmButton.addEventListener("click", () => {
        deleteToDo(i);
        console.log(i);
        confirmationPopUp.classList.remove("PopUp-open");
      });
    });
  });
}

function activateEditListeners() {
  let editBtn = document.querySelectorAll(".editBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".toDo textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      editContent[i].style.display = "block";
      content[i].disabled = false;
      content[i].focus();
      content[i].setSelectionRange(
        content[i].value.length,
        content[i].value.length
      );
    });
  });
}

function activateSaveListeners() {
  let editBtn = document.querySelectorAll(".editBtn");
  let saveEditBtn = document.querySelectorAll(".saveEditBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".toDo textarea");
  saveEditBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateToDo(content[i].value, i);
      editContent[i].style.display = "none";
      content[i].disabled = true;
    });
  });
}

// function activateCancelListeners() {
//   let cancelEditBtn = document.querySelectorAll(".cancelEditBtn");
//   let editContent = document.querySelectorAll(".editContent");
//   let content = document.querySelectorAll(".toDo textarea");
//   cancelEditBtn.forEach((cb, i) => {
//     cb.addEventListener("click", () => {
//       editContent[i].style.display = "none";
//       content[i].disabled = true;
//     });
//   });
// }

function activateCheckListeners() {
  let checkbox = document.querySelectorAll(".toDo input");
  let content = document.querySelectorAll(".toDo textarea");
  checkbox.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      if (cB.checked) {
        content[i].style.textDecoration = "line-through";
      } else {
        content[i].style.textDecoration = "none";
      }
      checkedToDo(content[i].value, i);
    });
  });
}

function activateUpListeners() {
  let upBtn = document.querySelectorAll(".upBtn");
  upBtn.forEach((uB, i) => {
    uB.addEventListener("click", () => {
      if (i > 0) {
        let contentUp = storedTodos[i];
        storedTodos[i] = storedTodos[i - 1];
        storedTodos[i - 1] = contentUp;
        localStorage.setItem("toDos", JSON.stringify(storedTodos));
        displayToDos();
      } else {
        let notificationConfig = {
          style: "display: block; color: red",
          text: "Cannot be moved up!",
        };
        notificationElement.style = notificationConfig.style;
        notificationElement.innerText = notificationConfig.text;
        setTimeout(() => (notificationElement.style.display = "none"), 6000);
      }
    });
  });
}

function activateDownListeners() {
  let downBtn = document.querySelectorAll(".downBtn");
  downBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      if (i < storedTodos.length - 1) {
        let contentDown = storedTodos[i];
        storedTodos[i] = storedTodos[i + 1];
        storedTodos[i + 1] = contentDown;
        localStorage.setItem("toDos", JSON.stringify(storedTodos));
        displayToDos();
      } else {
        let notificationConfig = {
          style: "display: block; color: red",
          text: "Cannot be moved done!",
        };
        notificationElement.style = notificationConfig.style;
        notificationElement.innerText = notificationConfig.text;
        setTimeout(() => (notificationElement.style.display = "none"), 6000);
      }
    });
  });
}

function activateCountListeners() {
  let checkbox = document.querySelectorAll(".toDo input");
  let contorTest = 0;
  checkbox.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      if (cB.checked) {
        contorTest++;
      } else {
        contorTest--;
      }
      completedTasks.textContent = contorTest;
      remainingTasks.textContent = storedTodos.length - contorTest;
    });
  });
  remainingTasks.textContent = storedTodos.length;
  totalTasks.textContent = storedTodos.length;
}

function deleteToDo(i) {
  storedTodos.splice(i, 1);
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
  counterDisplayToDo = storedTodos.length + 1;
  displayToDos();
}

function updateToDo(text, i) {
  storedTodos[i] = text;
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
}

function checkedToDo(text, i) {
  storedTodos[i] = text;
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
}

// Display date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
}

window.onload = function () {
  displayDate();
  displayToDos();
};
