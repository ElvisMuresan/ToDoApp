let bodyElement = document.body;
let inputElement = document.getElementById("inputId");
let addTodoElement = document.getElementById("buttonId");
let listaParinteElement = document.getElementById("listaParinteId");
let notificationElement = document.getElementById("notification");
let confirmationPopUp = document.getElementById("confirmationDialog");
let confirmButton = document.getElementById("PopUp-confirm");

// Display date
function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
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

/**
 * Creates todo item
 */
function createTodo(inputValue, isNewTodo) {
  // add task element
  let todoElement = document.createElement("div");
  todoElement.classList.add("task");

  // input
  let todoInputElement = document.createElement("input");
  todoInputElement.classList.add("text");
  todoInputElement.type = "text"; 
  todoInputElement.value = inputValue;
  todoInputElement.setAttribute("readonly", "");

  // create task content
  const todoContentElement = document.createElement("div");
  todoContentElement.classList.add("content");
  todoContentElement.appendChild(todoInputElement);

  // create the checkbox element 
  const todoCheckButtonElement = document.createElement("input");
  todoCheckButtonElement.type = 'checkbox';
  const todoCheckIconElement = document.createElement("i");
  todoCheckIconElement.className = "fas fa-check";

  todoCheckButtonElement.addEventListener("click", () => {
    if(todoCheckButtonElement.checked) {
      todoContentElement.style.textDecoration = "line-through";
    } else {
      todoContentElement.style.textDecoration = "none";
    }
  });

  // Edit icon 
  const todoEditButtonElement = document.createElement("button");
  const todoEditIconElement = document.createElement("i");
  todoEditIconElement.className = "fas fa-edit";
   todoEditButtonElement.addEventListener("click", () => {
     if (todoEditButtonElement.innerHTML == '<i class="fas fa-edit"></i>') {
       todoEditButtonElement.innerText = "Save";
       todoInputElement.removeAttribute("readonly"); 
       todoInputElement.focus();
     } else {
       todoEditButtonElement.innerHTML = '<i class="fas fa-edit"></i>';
       todoInputElement.setAttribute("readonly", "");

       // update stored todos
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoIndex = storedTodos.indexOf(inputValue);
      storedTodos[todoIndex] = todoInputElement.value;
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    }
   });
  

   //Delete icon
  const todoDeleteButtonElement = document.createElement("button");
  const todoDeleteIconElement = document.createElement("i");
  todoDeleteIconElement.className = "fas fa-trash";
  todoDeleteButtonElement.addEventListener("click", () => {
    confirmationPopUp.classList.add("PopUp-open");
    confirmButton.addEventListener("click", () => {
      listaParinteElement.removeChild(todoElement);
      //todoElement.style.display = "none";
      confirmationPopUp.classList.remove("PopUp-open");

      // remove from stored todos
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoIndex = storedTodos.indexOf(inputValue);
      storedTodos.splice(todoIndex, 1);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    }); 
});

  // actions
  const todoActionsElement = document.createElement("div");
  todoActionsElement.classList.add("actions");
  todoCheckButtonElement.appendChild(todoCheckIconElement);
  todoEditButtonElement.appendChild(todoEditIconElement);
  todoDeleteButtonElement.appendChild(todoDeleteIconElement);
  //todoActionsElement.appendChild(todoCheckButtonElement);
  todoActionsElement.appendChild(todoEditButtonElement);
  todoActionsElement.appendChild(todoDeleteButtonElement);

  todoElement.appendChild(todoCheckButtonElement);
  todoElement.appendChild(todoContentElement);
  todoElement.appendChild(todoActionsElement);

  listaParinteElement.appendChild(todoElement);

  // Store the toDos in local storage if isNewTodo
  if(isNewTodo) {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    storedTodos.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }
}

// Event de adaugare todo
addTodoElement.addEventListener("click", (event) => {
  event.preventDefault();

  showNotification(inputElement.value, false);

  if (!inputElement.value) return;

  createTodo(inputElement.value, true);
  const link = document.createElement("link");
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  
  inputElement.value = "";
});

  // Load all todos from local storage on page load
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  storedTodos.forEach((inputValue) => {
  createTodo(inputValue, false);
  });

  window.onload = function() {
    displayDate()
  };
  


