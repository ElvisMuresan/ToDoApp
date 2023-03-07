let inputElement = document.getElementById('new-task-input');
let buttonElement = document.getElementById('new-task-submit');
let listaParinteElement = document.getElementById('tasks');
const success = document.getElementById('success');
const filledIn = document.getElementById('filledIn');

//Event Listeners
buttonElement.addEventListener('click', addTask);

//Functions
//Function Add task
function addTask(event) {
  event.preventDefault();

  const input = inputElement.value;

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

  const task_checked_div = document.createElement("button");
  task_checked_div.classList.add("checked");
  task_checked_div.innerHTML = "Checked";

  const task_edit_div = document.createElement("button");
  task_edit_div.classList.add("edit");
  task_edit_div.innerHTML = "Edit";

  const task_delete_div = document.createElement("button");
  task_delete_div.classList.add("delete");
  task_delete_div.innerHTML = "Delete";

  task_actions_div.appendChild(task_checked_div);
  task_actions_div.appendChild(task_edit_div);
  task_actions_div.appendChild(task_delete_div);


  task_div.appendChild(task_actions_div);

  listaParinteElement.appendChild(task_div); // Adauga task-ul
  inputElement.value = "";



  task_checked_div.addEventListener('click', checkedTask);
  //Checked function
  function checkedTask(e) {
    //task_content_div.style.textDecoration = "line-through";
    if (task_checked_div.innerText.toLowerCase() == "checked") {
      task_content_div.style.textDecoration = "line-through";
      task_checked_div.innerText = "Unchecked";
      task_input_div.focus();
    } else {
      task_checked_div.innerText = "Checked";
      task_content_div.style.textDecoration = "none";
    }
  }

  task_edit_div.addEventListener('click', editTask);
  function editTask(e) {
    if (task_edit_div.innerText.toLowerCase() == "edit") {
      task_edit_div.innerText = "Save";
      task_input_div.removeAttribute("readonly");
      task_input_div.focus();
    } else {
      task_edit_div.innerText = "Edit";
      task_input_div.setAttribute("readonly", "readonly");
    }
  }



  task_delete_div.addEventListener('click', deleteTask);
  //Delete function
  function deleteTask(e) {
    listaParinteElement.removeChild(task_div);
  }

  // Message task
  if (!input) {
    //alert("Please fill out the task!");
    //return;
    filledIn.style.display = 'block';
    listaParinteElement.removeChild(task_div);
  }
  else {
    setTimeout(() => {
      success.style.display = 'block';
    }, 500);

  }

  setTimeout(() => {
    success.style.display = 'none';
    filledIn.style.display = 'none';
  }, 4000);

}



