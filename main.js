let confirmationPopUp = document.getElementById("confirmationDialog");
let confirmButton = document.getElementById("PopUp-confirm");
let confirmDeleteHeader = document.getElementById("confirmDeleteHeader");
let notificationElement = document.getElementById("notification");
let toDo = document.querySelector("#inputId");
let storedTodos = JSON.parse(localStorage.getItem("toDos")) || [];

document.querySelector("#addToDo").addEventListener("click", () => {
  event.preventDefault();
  createToDo(toDo);
})

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
    toDos += `<li class="toDo">
                    <div class="content">
                        <input type="checkbox">
                        <textarea  disabled>${storedTodos[i]}</textarea>
                        <div class="actions">
                            <button><i class=" fa fa-arrow-up upBtn"></i></button>
                            <button><i class=" fa fa-arrow-down downBtn"></i></  button>
                            <button><i class="fas fa-edit editBtn"></i></button>
                            <button><i class=" fas fa-trash deleteBtn"></i></button>
                        </div>
                    </div>
                    <div class="editContent">
                        <button class="saveEditBtn">Save</button>
                        <button class="cancelEditBtn">Cancel</button>
                    </div>
                </li>`
  }
  document.querySelector(".toDoList").innerHTML = `<ol>${toDos}</ol>`;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateDeleteListeners();
  activateUpListeners();
  activateDownListeners();
  //activateNotificationListeners()
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
  if(toDo.value === "") {
    // return if no input value 
    return;
  }

  // store in local storage
  storedTodos.push(toDo.value);
  localStorage.setItem('toDos', JSON.stringify(storedTodos));
  let toDoDisplay = "";
  // display toDo on screen
  let counter = 1;
    toDoDisplay = `<li class="toDo">
                          <div class="content">
                          <span class="counter">${counter}</span>
                            <input type="checkbox">
                            <textarea  disabled>${toDo.value}</textarea>
                            <div class="actions">
                              <button><i class=" fa fa-arrow-up upBtn"></i></button>
                              <button><i class=" fa fa-arrow-down downBtn"></i></button>
                              <button><i class="fas fa-edit editBtn"></i></button>
                              <button><i class=" fas fa-trash deleteBtn"></i></button>
                            </div>
                          </div>
                          <div class="editContent">
                            <button class="saveEditBtn">Save</button>
                            <button class="cancelEditBtn">Cancel</button>
                          </div>
                        </li>`
  document.querySelector(".toDoList").innerHTML += `<ol>${toDoDisplay}</ol>`;
  counter++;
  activateCheckListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateDeleteListeners();
  activateUpListeners();
  activateDownListeners();
  // clean input field
  toDo.value = ""; 
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      confirmDeleteHeader.innerText = `Are you sure you want to delete "${storedTodos[i]}"?`;
      confirmationPopUp.classList.add("PopUp-open");
      confirmButton.addEventListener("click", () => {
        deleteToDo(i);
        confirmationPopUp.classList.remove("PopUp-open");
      });
    })
  })
}

function activateEditListeners() {
  let editBtn = document.querySelectorAll(".editBtn")
  let editContent = document.querySelectorAll(".editContent")
  let content = document.querySelectorAll(".content textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      editContent[i].style.display = "block";
      content[i].disabled = false;
      content[i].focus();
    })

  })
}

function activateSaveListeners() {
  let saveEditBtn = document.querySelectorAll(".saveEditBtn")
  let content = document.querySelectorAll(".content textarea")
  saveEditBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateToDo(content[i].value, i)
    })
  })
}

function activateCancelListeners() {
  let cancelEditBtn = document.querySelectorAll(".cancelEditBtn")
  let editContent = document.querySelectorAll(".editContent")
  let content = document.querySelectorAll(".content textarea")
  cancelEditBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      editContent[i].style.display = "none"
      content[i].disabled = true
    })
  })
}

function activateCheckListeners() {
  let checkbox = document.querySelectorAll(".content input")
  let content = document.querySelectorAll(".content textarea")
  checkbox.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      if (cB.checked) {
        content[i].style.textDecoration = "line-through";
      }
      else {
        content[i].style.textDecoration = "none";
      }
      checkedToDo(cB.checked, i);
    })
  })
}

function activateUpListeners() {
  let upBtn = document.querySelectorAll(".upBtn")
  upBtn.forEach((uB,i) => {
    uB.addEventListener("click", () => {
      if( i > 0) {
        let temp = storedTodos[i];
        storedTodos[i] = storedTodos [ i - 1];
        storedTodos[i - 1] = temp;
        localStorage.setItem('toDos', JSON.stringify(storedTodos))
        location.reload();
      }
    })
  })
}

function activateDownListeners() {
  let downBtn = document.querySelectorAll(".downBtn")
  downBtn.forEach((dB,i) => {
    dB.addEventListener("click", () => {
      if( i >= 0 && i < storedTodos.length - 1) {
        let temp = storedTodos[i];
        storedTodos[i] = storedTodos [ i + 1];
        storedTodos[i + 1] = temp;
        localStorage.setItem('toDos', JSON.stringify(storedTodos))
        location.reload();
      }
    })
  })
}

function deleteToDo(i) {
  storedTodos.splice(i, 1)
  localStorage.setItem('toDos', JSON.stringify(storedTodos))
  location.reload();

}

function updateToDo(text, i) {
  storedTodos[i] = text
  localStorage.setItem('toDos', JSON.stringify(storedTodos));
  location.reload();
}

function checkedToDo(completed,  i) {
  storedTodos[i] = completed
  localStorage.setItem('toDos', JSON.stringify(storedTodos));
}

// Display date
function displayDate() {
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3]
  document.querySelector("#date").innerHTML = date
}



window.onload = function () {
  displayDate();
  displayToDos();
};

