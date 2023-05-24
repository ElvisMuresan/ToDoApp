const confirmationPopUp = document.getElementById("confirmationDialog");
const confirmButton = document.getElementById("PopUp-confirm");
const confirmDeleteAll = document.getElementById("PopUp-deleteAll");
const confirmDeleteHeader = document.getElementById("confirmDeleteHeader");
const confirmDeleteMessage = document.getElementById("confirmDeleteMessage");
const notificationElement = document.getElementById("notification");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const remainingTasks = document.getElementById("remaining-tasks");
let clearToDos = document.getElementById("clearToDo");
let addTask = document.getElementById("addToDo");
const toDo = document.querySelector("#inputId");
let counterStoredTodos = 1;
let indexToDoToDelete = undefined;
let storedTodos = JSON.parse(localStorage.getItem("toDos")) || [];
let counterDisplayToDo = storedTodos.length + 1;

if (storedTodos && storedTodos.length > 0) {
  storedTodos = storedTodos.map((todo) => {
    if (!todo.hasOwnProperty("checked")) {
      todo.checked = false;
    }
    return todo;
  });
}

document.querySelector("#addToDo").addEventListener("click", () => {
  event.preventDefault();
  createToDo(toDo);
});

document.querySelector("#clearToDo").addEventListener("click", () => {
  event.preventDefault();
  deleteAllToDoListeners();
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

function deleteAllToDoListeners() {
  if (storedTodos.length === 0) {
    let notificationConfig = {
      style: "display: block; color: red",
      text: "The toDo list is empty. Please insert a toDo!",
    };
    notificationElement.style = notificationConfig.style;
    notificationElement.innerText = notificationConfig.text;
    setTimeout(() => (notificationElement.style.display = "none"), 6000);
  } else {
    confirmDeleteHeader.innerText = `Are you sure you want to delete all?`;
    confirmDeleteMessage.innerText = `Once you delete all the items, there is no going back. Please be certain.`;
    confirmationPopUp.classList.add("PopUp-open");
  }
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      indexToDoToDelete = i;
      confirmDeleteHeader.innerText = `Are you sure you want to delete "${storedTodos[i]}"?`;
      confirmationPopUp.classList.add("PopUp-open");
    });
  });
}

confirmButton.addEventListener("click", () => {
  deleteToDo(indexToDoToDelete);
  confirmationPopUp.classList.remove("PopUp-open");
});
confirmDeleteAll.addEventListener("click", () => {
  deleteAllToDo();
  confirmationPopUp.classList.remove("PopUp-open");
});

function activateEditListeners() {
  let actions = document.getElementById("actions");
  let removeEdit = document.getElementById("removeEdit");
  let checkbox = document.querySelectorAll(".toDo input");
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  let upBtn = document.querySelectorAll(".upBtn");
  let downBtn = document.querySelectorAll(".downBtn");
  let editBtn = document.querySelectorAll(".editBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".toDo textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      actions.removeChild(removeEdit);
      clearToDos.disabled = true;
      addTask.disabled = true;
      editContent[i].style.display = "flex";
      content[i].disabled = false;
      content[i].focus();
      content[i].setSelectionRange(
        content[i].value.length,
        content[i].value.length
      );
      //clearToDos.classList.add("disabled");
      //addTask.classList.add("disabled");
      checkbox.forEach((cB) => {
        cB.classList.add("disabled");
      });
      editBtn.forEach((eB) => {
        eB.classList.add("disabled");
      });
      deleteBtn.forEach((dB) => {
        dB.classList.add("disabled");
      });
      upBtn.forEach((uB) => {
        uB.classList.add("disabled");
      });
      downBtn.forEach((dB) => {
        dB.classList.add("disabled");
      });
      //eB.style.visibility = "hidden";
    });
  });
}

function activateSaveListeners() {
  let editBtn = document.querySelectorAll(".editBtn");
  let checkbox = document.querySelectorAll(".toDo input");
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  let upBtn = document.querySelectorAll(".upBtn");
  let downBtn = document.querySelectorAll(".downBtn");
  let saveEditBtn = document.querySelectorAll(".saveEditBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".toDo textarea");
  saveEditBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateToDo(content[i].value, i);
      displayToDos();
      editContent[i].style.display = "none";
      content[i].disabled = true;
      clearToDos.disabled = false;
      addTask.disabled = false;
      //clearToDos.classList.remove("disabled");
      //addTask.classList.remove("disabled");
      editBtn.forEach((eB) => {
        //eB.style.visibility = "visible";
      });
      checkbox.forEach((cB) => {
        cB.classList.remove("disabled");
      });
      editBtn.forEach((eB) => {
        eB.classList.remove("disabled");
      });
      deleteBtn.forEach((dB) => {
        dB.classList.remove("disabled");
      });
      upBtn.forEach((uB) => {
        uB.classList.remove("disabled");
      });
      downBtn.forEach((dB) => {
        dB.classList.remove("disabled");
      });
    });
  });
}

function activateCancelListeners() {
  let cancelEditBtn = document.querySelectorAll(".cancelEditBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".toDo textarea");
  cancelEditBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      displayToDos();
      editContent[i].style.display = "none";
      content[i].disabled = true;
      clearToDos.disabled = false;
      addTask.disabled = false;
    });
  });
}

function activateCheckListeners() {
  let checkbox = document.querySelectorAll(".toDo input");
  let content = document.querySelectorAll(".toDo textarea");
  checkbox.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      if (cB.checked) {
        content[i].style.textDecoration = "line-through";
        //content[i].classList.add("completed");
      } else {
        content[i].style.textDecoration = "none";
        //content[i].classList.remove("completed");
      }
      checkedToDo(cB.checked, i);
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
  console.log("callDeleteToDo:", i);
  storedTodos.splice(i, 1);
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
  counterDisplayToDo = storedTodos.length + 1;
  displayToDos();
}

function deleteAllToDo(i) {
  storedTodos.splice(i, storedTodos.length);
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
  counterDisplayToDo = storedTodos.length + 1;
  displayToDos();
}

function updateToDo(text, i) {
  storedTodos[i].text = text;
  localStorage.setItem("toDos", JSON.stringify(storedTodos));
}

function checkedToDo(checked, i) {
  storedTodos[i].checked = checked;
  console.log("storedToDos", storedTodos);
  localStorage.setItem("toDos", JSON.stringify(storedTodos));

  // 	["emanuel","fdfsfsdf","aaaaa","fdsfsdfsd"]
  // ["true.emanuel","fdfsfsdf","aaaaa","fdsfsdfsd"]
  // 	[ { "text": "emanuel", "state": "checked"}, {"text": fdfsfsdf state: checked},aaaaa {state: checked},fdsfsdfsd {state: checked}}]
  // let dataToStore = [
  //   { text: content[i], checked: true },
  //   { text: "blabla", checked: true },
  //   { text: "elvis", checked: false },
  //   { text: "emanuel222", checked: false },
  // ];
  // localStorage.setItem("toDos", JSON.stringify(dataToStore));
}

function displayToDos() {
  let toDos = "";
  for (let i = 0; i < storedTodos.length; i++) {
    const todo = storedTodos[i];
    const isChecked = todo.checked ? "checked" : "";
    const textDecoration = todo.checked ? "line-through" : "none";
    toDos += `<div class="toDo">
                        <span class="counter">${counterStoredTodos + i}</span>
                        <input type="checkbox" class="checkbox" ${isChecked}>
                        <textarea  disabled style="text-decoration: ${textDecoration};">${
      storedTodos[i].text
    }</textarea>
                        <div id="actions" class="actions">
                            <button><i class=" fa fa-arrow-up upBtn"></i></button>
                            <button><i class=" fa fa-arrow-down downBtn"></i></  button>
                            <button id="removeEdit" ><i class="fas fa-edit editBtn"></i></button>
                            <button><i class=" fas fa-trash deleteBtn"></i></button>
                        </div>
                    <div class="editContent">
                        <button class="saveEditBtn">Save</button>
                        <button class="cancelEditBtn">Cancel</button>
                    </div>
                </div>`;
  }

  document.querySelector(".toDoList").innerHTML = toDos;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
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
  //storedTodos.push(toDo.value);
  storedTodos.push({ text: toDo.value, checked: false });
  localStorage.setItem("toDos", JSON.stringify(storedTodos));

  // display toDo on screen
  let toDoDisplay = "";
  toDoDisplay = `<div class="toDo">
                          <span class="counter">${counterDisplayToDo}</span>
                            <input type="checkbox" class="checkbox">
                            <textarea  disabled>${toDo.value}</textarea>
                            <div id="actions" class="actions">
                              <button><i class=" fa fa-arrow-up upBtn"></i></button>
                              <button><i class=" fa fa-arrow-down downBtn"></i></button>
                              <button id="removeEdit"><i class="fas fa-edit editBtn"></i></button>
                              <button><i class=" fas fa-trash deleteBtn"></i></button>
                            </div>
                          <div class="editContent">
                            <button class="saveEditBtn">Save</button>
                            <button class="cancelEditBtn">Cancel</button>
                          </div>
                        </div>`;
  document.querySelector(".toDoList").innerHTML += toDoDisplay;
  counterDisplayToDo++;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateDeleteListeners();
  activateUpListeners();
  activateDownListeners();
  activateCountListeners();

  // clean input field
  toDo.value = "";
}

// Display date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
  //date.getDate() + " " + date.getMonth() + 1 + " " + date.getFullYear();
}

window.onload = function () {
  displayDate();
  displayToDos();
};
