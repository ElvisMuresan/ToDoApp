let bodyElement = document.body;
let inputElement = document.getElementById("inputId");
let addTodoElement = document.getElementById("buttonId");
let listaParinteElement = document.getElementById("listaParinteId");
let notificationElement = document.createElement("div");

/**
 * Notification initialization
 */
function initializeNotification() {
  notificationElement.classList.add("notificationBox");
  bodyElement.appendChild(notificationElement);
}
initializeNotification();

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
  const todoCheckButtonElement = document.createElement("button");
  todoCheckButtonElement.classList.add("checked");
  todoCheckButtonElement.innerHTML = "Checked";
  todoCheckButtonElement.addEventListener("click", () => {
    if (todoCheckButtonElement.innerText.toLowerCase() == "checked") {
      todoContentElement.style.textDecoration = "line-through";
      todoCheckButtonElement.innerText = "Unchecked";
    } else {
      todoCheckButtonElement.innerText = "Checked";
      todoContentElement.style.textDecoration = "none";
    }
  });

  const todoEditButtonElement = document.createElement("button");
  todoEditButtonElement.classList.add("edit");
  todoEditButtonElement.innerHTML = "Edit";
  todoEditButtonElement.addEventListener("click", () => {
    if (todoEditButtonElement.innerText.toLowerCase() == "edit") {
      todoEditButtonElement.innerText = "Save";
      todoInputElement.removeAttribute("readonly");
      todoInputElement.focus();
    } else {
      todoEditButtonElement.innerText = "Edit";
      todoInputElement.setAttribute("readonly", "readonly");
    }
  });

  const todoDeleteButtonElement = document.createElement("button");
  todoDeleteButtonElement.classList.add("delete");
  todoDeleteButtonElement.innerHTML = "Delete";
  todoDeleteButtonElement.addEventListener("click", () => {
    listaParinteElement.removeChild(todoElement);
  });

  // actions
  const todoActionsElement = document.createElement("div");
  todoActionsElement.classList.add("actions");
  todoActionsElement.appendChild(todoCheckButtonElement);
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

  inputElement.value = "";
});
