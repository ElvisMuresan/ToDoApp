let inputElement = document.getElementById('new-task-input');
let buttonElement = document.getElementById('new-task-submit');
let listaParinteElement = document.getElementById('tasks');

//Event Listeners
buttonElement.addEventListener('click', addTask);
listaParinteElement.addEventListener('click', deleteTask);

//Functions
//Function Add task
function addTask(event) {
  event.preventDefault();

  const input = inputElement.value;

  if (!input) {
    alert("Please fill out the task!");
    return;
  }
  else {
    console.log("succes");
  }

  const task_div = document.createElement("div");
  task_div.classList.add("task");

  const task_content_div = document.createElement("div");
  task_content_div.classList.add("content");

  task_div.appendChild(task_content_div);

  const task_input_div = document.createElement("input");
  task_input_div.classList.add("text");
  task_input_div.type = "text";
  task_input_div.value = input;
  task_input_div.setAttribute("readonly", "readonly");

  task_content_div.appendChild(task_input_div);

  const task_actions_div = document.createElement("div");
  task_actions_div.classList.add("actions");

  const task_edit_div = document.createElement("button");
  task_edit_div.classList.add("edit");
  task_edit_div.innerHTML = "Edit";

  const task_delete_div = document.createElement("button");
  task_delete_div.classList.add("delete");
  task_delete_div.innerHTML = "Delete";

  task_actions_div.appendChild(task_edit_div);
  task_actions_div.appendChild(task_delete_div);

  task_div.appendChild(task_actions_div);

  listaParinteElement.appendChild(task_div);
  inputElement.value = "";
}



