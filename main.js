const storedTodos = JSON.parse(localStorage.getItem("toDos")) || [];

console.log(storedTodos);

document.querySelector("#addToDo").addEventListener("click", () => {
    const ToDo = document.querySelector("#inputId");
    createToDo(ToDo);
})

function displayToDos() {
    let toDos = ""
    for(let i = 0; i < storedTodos.length; i++) {
        toDos += `<div class="toDo">
                    <div class="content">
                        <input type="checkbox">
                        <textarea disabled>${storedTodos[i]}</textarea>
                        <div class="actions">
                            <i class="fas fa-edit editBtn"></i>
                            <i class=" fas fa-trash deleteBtn"></i>
                        </div>
                    </div>
                    <div class="editContent">
                        <button class="saveEdit">Save</button>
                        <button class="cancelEdit">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".toDoList").innerHTML = toDos
    //activateCheckListeners()
    //activateEditListeners()
    //activateSaveListeners()
    //activateCancelListeners()
    activateDeleteListeners()
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteToDo(i) })
    })
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn")
    const editContent = document.querySelectorAll(".editContent")
    const content = document.querySelectorAll(".content textarea")
    editBtn.forEach((eB, i) => {
      eB.addEventListener("click", () => { 
        editContent[i].style.display = "block"
        content[i].disabled = false })
    })
  }

// Create the ToDos in local Storage
function createToDo(ToDo) {
    storedTodos.push(ToDo.value)
    localStorage.setItem('toDos', JSON.stringify(storedTodos));
    location.reload();
}

function deleteToDo(i) {
    storedTodos.splice(i, 1)
    localStorage.setItem('ToDos', JSON.stringify(storedTodos))
    location.reload()

 }

// Display date
function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
}

window.onload = function() {
    displayDate();
    displayToDos();
  };