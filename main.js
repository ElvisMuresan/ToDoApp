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
                        <textarea  disabled>${storedTodos[i]}</textarea>
                        <div class="actions">
                            <i class="fas fa-edit editBtn"></i>
                            <i class=" fas fa-trash deleteBtn"></i>
                        </div>
                    </div>
                    <div class="editContent">
                        <button class="saveEditBtn">Save</button>
                        <button class="cancelEditBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".toDoList").innerHTML = toDos
     activateCheckListeners()
     activateEditListeners()
     activateSaveListeners()
     activateCancelListeners()
     activateDeleteListeners()
     //activateNotificationListeners()
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
        content[i].disabled = false
        content[i].focus()
         })
         
    })
  }

  function activateSaveListeners() {
    const saveEditBtn = document.querySelectorAll(".saveEditBtn")
    const content = document.querySelectorAll(".content textarea")
    saveEditBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateToDo(content[i].value, i)
        })
    })
  }

  function activateCancelListeners() {
    const cancelEditBtn = document.querySelectorAll(".cancelEditBtn")
    const editContent = document.querySelectorAll(".editContent")
    const content = document.querySelectorAll(".content textarea")
    cancelEditBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            editContent[i].style.display = "none"
            content[i].disabled = true
        })
    })
  }

  function activateCheckListeners() {
    const checkbox = document.querySelectorAll(".content input")
    const content = document.querySelectorAll(".content textarea")
    checkbox.forEach((cB, i) => {
        cB.addEventListener("click",() => { 
            if(cB.checked) {
                content[i].style.textDecoration = "line-through";
                console.log("content[i]:", content[i].value)
                console.log("cb.checked:", cB.checked.value)
            }
            else {
                content[i].style.textDecoration = "none";
            }
              //checkToDo(i, cB.checked) 
            });
    });
    }


// function checkToDo(i) {
//     console.log("storedToDo:", storedTodos[i])
//     storedTodos.push()
//     if(storedTodos[i].checked) {
//         storedTodos[i].style.textDecoration = "line-through";
//     }
//     else {
//         storedTodos[i].style.textDecoration = "none";
//     }
//     localStorage.setItem('toDos', JSON.stringify(storedTodos));
//     }

// function checkToDo() {
//     const storedTodos = JSON.parse(localStorage.getItem('toDos')) || [];
//     const checkboxList = document.querySelectorAll(".content input");
  
//     storedTodos.forEach((todo, i) => {
//       if (todo.completed) {
//         checkboxList[i].checked = true;
//         checkboxList[i].parentNode.querySelector("textarea").style.textDecoration = "line-through";
//       } else {
//         checkboxList[i].checked = false;
//         checkboxList[i].parentNode.querySelector("textarea").style.textDecoration = "none";
//       }
//     });
//   }

// Create the ToDos in local Storage
function createToDo(ToDo) {
    storedTodos.push(ToDo.value)
    localStorage.setItem('toDos', JSON.stringify(storedTodos));
    location.reload();
}

function deleteToDo(i) {
    storedTodos.splice(i, 1)
    localStorage.setItem('toDos', JSON.stringify(storedTodos))
    location.reload()

 }

 function updateToDo(text, i) {
    storedTodos[i] = text
    localStorage.setItem('toDos', JSON.stringify(storedTodos));
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