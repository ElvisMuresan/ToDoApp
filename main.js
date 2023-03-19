let bodyElement = document.body;
let inputElement = document.getElementById("inputId");
let addTodoElement = document.getElementById("buttonId");
let listaParinteElement = document.getElementById("listaParinteId");
let notificationElement = document.getElementById("notification");

/**
 * Show notification
 */

function showNotification(inputValue) {
  let notificationConfig = {
    style: "display: block; color: blue",
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

/**
 * Creates todo item
 */
function createTodo(inputValue) {
  // add task element
  let todoElement = document.createElement("div");
  todoElement.classList.add("task");

  // input
  const todoInputElement = document.createElement("input");
  todoInputElement.classList.add("text");
  todoInputElement.type = "text"; 
  todoInputElement.value = inputValue;
  todoInputElement.setAttribute("readonly", "");

  // create task content
  const todoContentElement = document.createElement("div");
  todoContentElement.classList.add("content");
  todoContentElement.appendChild(todoInputElement);

  // buttons
  
  // create the checkbox element 
  const checkbox = document.createElement("input");

  // set the type to checkbox
  checkbox.type = 'checkbox';

  const checkboxFondAwesome = document.createElement("i");
  checkboxFondAwesome.className = "far fa-square";

  checkbox.addEventListener("click", () => {
    if(checkbox.checked) {
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
    }
   });


   //Delete icon
  const todoDeleteButtonElement = document.createElement("button");
  const todoDeleteIconElement = document.createElement("i");
  todoDeleteIconElement.className = "fas fa-trash";
  todoDeleteButtonElement.addEventListener("click", () => {
    listaParinteElement.removeChild(todoElement);
  });

  // actions
  const todoActionsElement = document.createElement("div");
  todoActionsElement.classList.add("actions");
  checkbox.appendChild(checkboxFondAwesome);
  todoEditButtonElement.appendChild(todoEditIconElement);
  todoDeleteButtonElement.appendChild(todoDeleteIconElement);
  todoActionsElement.appendChild(checkbox);
  todoActionsElement.appendChild(todoEditButtonElement);
  todoActionsElement.appendChild(todoDeleteButtonElement);

  todoElement.appendChild(todoContentElement);
  todoElement.appendChild(todoActionsElement);

  listaParinteElement.appendChild(todoElement);
}

// Event de adaugare todo
addTodoElement.addEventListener("click", (event) => {
  event.preventDefault();

  showNotification(inputElement.value);

  if (!inputElement.value) return;

  createTodo(inputElement.value);

  const link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
link.rel = "stylesheet";
document.head.appendChild(link);

  inputElement.value = "";
});
