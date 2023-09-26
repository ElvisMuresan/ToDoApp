// get elements
const confirmationPopUp = document.getElementById("confirmationDialog");
const confirmationPopUpAll = document.getElementById("confirmationDialogAll");
const confirmButton = document.getElementById("PopUp-confirm");
const confirmDeleteAll = document.getElementById("PopUp-deleteAll");
const confirmDeleteHeader = document.getElementById("confirmDeleteHeader");
const confirmDeleteHeaderAll = document.getElementById(
  "confirmDeleteHeaderAll"
);
const confirmDeleteMessage = document.getElementById("confirmDeleteMessage");
const confirmDeleteMessageAll = document.getElementById(
  "confirmDeleteMessageAll"
);
const notificationElement = document.getElementById("notification");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const remainingTasks = document.getElementById("remaining-tasks");
const todoTitle = document.querySelector("#titleId");
const todoDescription = document.querySelector("#inputId");

// globals
let clearToDos = document.getElementById("clearToDo");
let addTask = document.getElementById("addToDo");
let counterStoredTodos = 1;
let position = 0;
let completedCount = 0;
let idToDo = undefined;
let allIdToDoToDelete = undefined;
let newToDoId = null;
let storedTodos = JSON.parse(localStorage.getItem("toDos")) || [];
let counterDisplayToDo = storedTodos.length + 1;

document.querySelector("#addToDo").addEventListener("click", () => {
  event.preventDefault();
  createToDo(position, todoTitle, todoDescription);
  position++;
  console.log("position:", position);
});

document.querySelector("#clearToDo").addEventListener("click", () => {
  event.preventDefault();
  deleteAllToDoListeners();
});

// Cancel function when it's called, removes the class PopUp-open
function Cancel() {
  confirmationPopUp.classList.remove("PopUp-open");
  confirmationPopUpAll.classList.remove("PopUpAll-open");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("confirmationDialog")
    .addEventListener("click", Cancel);
  document
    .querySelector(".PopUp")
    .addEventListener("click", (e) => e.stopPropagation());
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("confirmationDialogAll")
    .addEventListener("click", Cancel);
  document
    .querySelector(".PopUpAll")
    .addEventListener("click", (e) => e.stopPropagation());
});

function deleteAllToDoListeners() {
  if (storedTodos.length === 0) {
    let notificationConfig = {
      style: NOTIFICATION_WARN_STYLE,
      text: "The toDo list is empty. Please insert a toDo!",
    };
    notificationElement.style = notificationConfig.style;
    notificationElement.innerText = notificationConfig.text;
    setTimeout(() => (notificationElement.style.display = "none"), 6000);
  } else {
    confirmDeleteHeaderAll.innerText = `Are you sure you want to delete all?`;
    confirmationPopUpAll.classList.add("PopUpAll-open");
  }
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", (event) => {
      idToDo = storedTodos[i]._id;
      confirmDeleteHeader.innerText = `Are you sure you want to delete "${storedTodos[i].title}"?`;
      confirmationPopUp.classList.add("PopUp-open");
    });
  });
}

confirmButton.addEventListener("click", () => {
  deleteToDo(idToDo);
  confirmationPopUp.classList.remove("PopUp-open");
});
confirmDeleteAll.addEventListener("click", () => {
  deleteAllToDo();
  confirmationPopUpAll.classList.remove("PopUpAll-open");
});

function activateEditListeners() {
  let checkbox = document.querySelectorAll(".checkbox");
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  let upBtn = document.querySelectorAll(".upBtn");
  let downBtn = document.querySelectorAll(".downBtn");
  let editBtn = document.querySelectorAll(".editBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".title");
  let description = document.querySelectorAll(".description");

  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      idToDo = storedTodos[i]._id;
      clearToDos.disabled = true;
      addTask.disabled = true;
      editContent[i].style.display = "flex";
      content[i].disabled = false;
      description[i].disabled = false;
      content[i].focus();
      content[i].setSelectionRange(
        content[i].value.length,
        content[i].value.length
      );
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
    });
  });
}

function activateSaveListeners() {
  let editBtn = document.querySelectorAll(".editBtn");
  let checkbox = document.querySelectorAll(".checkbox");
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  let upBtn = document.querySelectorAll(".upBtn");
  let downBtn = document.querySelectorAll(".downBtn");
  let saveEditBtn = document.querySelectorAll(".saveEditBtn");
  let editContent = document.querySelectorAll(".editContent");
  let content = document.querySelectorAll(".title");
  let description = document.querySelectorAll(".description");
  saveEditBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      const updatedTitle = content[i].value;
      const updatedDescription = description[i].value;
      updateToDo(idToDo, updatedTitle, updatedDescription);
      editContent[i].style.display = "none";
      content[i].disabled = true;
      clearToDos.disabled = false;
      addTask.disabled = false;
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
  let content = document.querySelectorAll(".title");
  cancelEditBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      renderToDos();
      editContent[i].style.display = "none";
      content[i].disabled = true;
      clearToDos.disabled = false;
      addTask.disabled = false;
    });
  });
}

function activateCheckListeners() {
  let checkbox = document.querySelectorAll(".checkbox");
  let content = document.querySelectorAll(".title");
  let description = document.querySelectorAll(".description");
  checkbox.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      idToDo = storedTodos[i]._id;
      if (cB.checked) {
        content[i].style.textDecoration = "line-through";
        description[i].style.textDecoration = "line-through";
      } else {
        description[i].style.textDecoration = "none";
      }
      checkedToDo(idToDo, cB.checked);
    });
  });
}

// function activateDragListeners() {
//   let toDos = document.querySelectorAll(".toDo");
//   let dragSrcEl = null;

//   function handleDragStart(e) {
//     dragSrcEl = this;
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/html", this.innerHTML);
//     this.classList.add("dragging");
//   }

//   function handleDragEnter(e) {
//     e.preventDefault();
//     this.classList.add("over");
//   }

//   function handleDragLeave() {
//     this.classList.remove("over");
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//     return false;
//   }

//   function handleDrop(e) {
//     if (dragSrcEl !== this) {
//       dragSrcEl.innerHTML = this.innerHTML;
//       this.innerHTML = e.dataTransfer.getData("text/html");
//       const newOrder = Array.from(document.querySelectorAll(".toDo")).map(
//         (todo) => {
//           const isChecked = todo.querySelector(".checkbox").checked;
//           const titleDecoration = isChecked ? "line-through" : "none";
//           const text = todo.querySelector(".title").value;
//           return { text, checked: isChecked };
//         }
//       );
//       storedTodos = newOrder;
//       localStorage.setItem("toDos", JSON.stringify(storedTodos));
//       initializeListeners();
//     }
//     return false;
//   }

//   function handleDragEnd() {
//     toDos.forEach((todoTitle) =>
//       todoTitle.classList.remove("over", "dragging")
//     );
//   }

//   toDos.forEach((todoTitle) => {
//     todoTitle.addEventListener("dragstart", handleDragStart, false);
//     todoTitle.addEventListener("dragenter", handleDragEnter, false);
//     todoTitle.addEventListener("dragleave", handleDragLeave, false);
//     todoTitle.addEventListener("dragover", handleDragOver, false);
//     todoTitle.addEventListener("drop", handleDrop, false);
//     todoTitle.addEventListener("dragend", handleDragEnd, false);
//     renderToDo();
//   });
// }

function activateUpListeners() {
  let upBtn = document.querySelectorAll(".upBtn");
  upBtn.forEach((uB, i) => {
    uB.addEventListener("click", () => {
      idToDo = storedTodos[i]._id;
      if (i > 0) {
        moveToDoUp(idToDo);
      } else {
        let notificationConfig = {
          style: NOTIFICATION_WARN_STYLE,
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
        renderToDos();
      } else {
        let notificationConfig = {
          style: NOTIFICATION_WARN_STYLE,
          text: "Cannot be moved down!",
        };
        notificationElement.style = notificationConfig.style;
        notificationElement.innerText = notificationConfig.text;
        setTimeout(() => (notificationElement.style.display = "none"), 6000);
      }
    });
  });
}

async function deleteToDo(idToDo) {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/delete/${idToDo}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Eroare la stergerea toDo");
    }
    getAllTodos();
    position = position - 1;
  } catch (error) {
    console.error("Eroare la stergerea ToDo:", error);
  }
}

async function deleteAllToDo() {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/delete`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Eroare la stergerea toDo-urilor");
    }
    getAllTodos();
  } catch (error) {
    console.error("Eroare la stergerea ToDo:", error);
  }
}

async function updateToDo(idToDo, updatedTitle, updatedDescription) {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/update/${idToDo}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Eroare la actualizarea ToDo-ului");
    }
    getAllTodos();
  } catch (error) {
    console.error("Eroare la actualizarea ToDo:", error);
  }
}

async function checkedToDo(idToDo, checked) {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/check/${idToDo}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checked: checked,
      }),
    });
    if (!response.ok) {
      throw new Error("Eroare la actualizarea ToDo-ului");
    }
    getAllTodos();
  } catch (error) {
    console.error("Eroare la actualizarea ToDo:", error);
  }
}

async function getAllTodos() {
  const apiUrl = "https://todoapp-backend-kbsb.onrender.com";
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Eroare la obtinerea ToDo-urilor");
    }
    const data = await response.json();
    storedTodos = data;
    position = storedTodos.length;
    renderToDos();
  } catch (error) {
    console.error("Eroare la obtinerea ToDo-urilor", error);
  }
}

async function moveToDoUp(idToDo) {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/moveUp/${idToDo}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Eroare la mutarea ToDo-urilui in sus");
    }
    getAllTodos();
  } catch (error) {
    console.error("Eroare la mutarea ToDo-urilui in sus", error);
  }
}

function renderToDo(
  todoChecked,
  todoTitleDecoration,
  todoId,
  todoTitle,
  todoDescription
) {
  return `<div class="toDo" draggable="true">
              <div class="title-container">
                <input type="checkbox" class="checkbox" ${todoChecked}>
                <div class="title-description">
                  <textarea class="title" disabled style="text-decoration: ${todoTitleDecoration};">${todoTitle}</textarea>
                  <textarea class="description" disabled style="text-decoration: ${todoTitleDecoration};">${todoDescription}</textarea>
                </div>
                  <div id="actions" class="actions">
                    <button id="removeUp"><i class=" fa fa-arrow-up upBtn"></i></button>
                    <button id="removeDown"><i class=" fa fa-arrow-down downBtn"></i></  button>
                    <button id="removeEdit" ><i class="fas fa-edit editBtn"></i></button>
                    <button id="removeDelete"><i class=" fas fa-trash deleteBtn"></i></button>
              </div>
                <div class="editContent">
                  <button class="saveEditBtn">Save</button>
                  <button class="cancelEditBtn">Cancel</button>
                </div>
            </div>
            
          </div>`;
}

function renderToDos() {
  let toDos = "";
  for (let i = 0; i < storedTodos.length; i++) {
    const todo = storedTodos[i];
    const isChecked = todo.checked ? "checked" : "";
    //const titleDecoration = todo.checked ? "line-through" : "none";
    const descriptionDecoration = todo.checked ? "line-through" : "none";
    toDos += renderToDo(
      isChecked,
      //titleDecoration,
      descriptionDecoration,
      storedTodos[i]._id,
      storedTodos[i].title,
      storedTodos[i].description
    );
  }
  completedTasks.textContent = completedCount;
  document.querySelector(".toDoList").innerHTML = toDos;
  initializeListeners();
  initializeCounter();
}

function initializeListeners() {
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateDeleteListeners();
  //activateDragListeners();
  activateUpListeners();
  activateDownListeners();
}

function initializeCounter() {
  completedTasks.textContent = storedTodos.filter(
    (todo) => todo.checked
  ).length;
  remainingTasks.textContent = storedTodos.filter(
    (todo) => !todo.checked
  ).length;
  totalTasks.textContent = storedTodos.length;
}

/**
 * Notification config for info & warn
 */
const NOTIFICATION_INFO_STYLE =
  "display: block; background-color: var(--clr-pink); color: var(--clr-gb-2)";

const NOTIFICATION_WARN_STYLE =
  "display: block; background-color: var(--notification-warn); color: var(--clr-gb-2)";

/**
 * Show notification
 */
function showNotification(inputValue) {
  let notificationConfig = {
    style: NOTIFICATION_INFO_STYLE,
    text: "To do succesfully added!",
  };

  if (!inputValue) {
    notificationConfig = {
      style: NOTIFICATION_WARN_STYLE,
      text: "Please insert a task!",
    };
  }

  notificationElement.style = notificationConfig.style;
  notificationElement.innerText = notificationConfig.text;
  setTimeout(() => (notificationElement.style.display = "none"), 4000);
}

// Create the ToDos
async function createToDo(position, todoTitle, todoDescription) {
  const apiUrl = "https://todoapp-backend-kbsb.onrender.com/save";
  // showNotification
  showNotification(todoTitle.value);

  // validate input
  if (todoTitle.value === "") {
    return;
  }
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: position,
        title: todoTitle.value,
        description: todoDescription.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Eroarea la adaugarea ToDo");
    }
    const newToDo = await response.json();
    newToDoId = newToDo._id;
    getAllTodos();

    todoTitle.value = "";
    todoDescription.value = "";
    //position++;
    return newToDoId;
  } catch (error) {
    console.error("Eroare la adaugarea ToDo", error);
  }
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
  getAllTodos();
};
