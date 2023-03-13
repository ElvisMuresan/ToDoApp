// Am creat variabila si m-am folosit de DOM(document.getElementById) pentru ma folosi de inputul creat in HTML (dupa ID)
let inputElement = document.getElementById('inputId');
let buttonElement = document.getElementById('buttonId');
let popup = document.getElementById('popup');
//Practic e un div in care avem lista de to do-uri
let listaParinteElement = document.getElementById('listaParinteId');

// const success = document.getElementById('success');
// const filledIn = document.getElementById('filledIn');


// function openPopup() {
//   popup.classList.add("open-popup");
// }
// function closePopup() {
//   popup.classList.remove("open-popup");
// }

//Event Listeners.  Crearea evenimentului cand apasam buttonElement si functioa addToDo
buttonElement.addEventListener('click', addToDo);

//Functions
//Function Add task
function addToDo(event) {
  event.preventDefault();
  // Declararea constantei input care ia valoarea lui inputElement
  const input = inputElement.value;

  //Crearea elementului div in care vom avea content-ul si actions
  const task_div = document.createElement("div");

  //Crearea clasei task in task_div
  task_div.classList.add("task");

  //Crearea elementului div in care este clasa content
  const task_content_div = document.createElement("div");

  //Crearea clasei content in care vom avea clasa text cu continutul inputului
  task_content_div.classList.add("content");

  //aceasta comanda ne adauga continutul lui task_content_div in task_div si afiseaza textul 
  task_div.appendChild(task_content_div);

  //Crearea elementului input care va fi asociat constantei task_input_div
  const task_input_div = document.createElement("input");

  //Crearea clasei text in care vom avea textul in task_input_div
  task_input_div.classList.add("text");

  //Type-ul sa fie text pentru constanta
  task_input_div.type = "text";

  //Valoarea lui task_input_div va fi in input. Practic ne scrie textul in toDo-ul afisat
  task_input_div.value = input;

  //Setam atributul de readnonly pentru task_input_div.Practic sa nu putem modica textul scris din input
  task_input_div.setAttribute("readonly", "readonly");

  //Constanta task_input_div este child-ul lui task_content_div
  task_content_div.appendChild(task_input_div);

  //Crearea div in care avem cele 3 butoane(cheched, edit si delete)
  const task_actions_div = document.createElement("div");
  task_actions_div.classList.add("actions");

  //Crearea buttonului checked
  const task_checked_div = document.createElement("button");
  task_checked_div.classList.add("checked");
  task_checked_div.innerHTML = "Checked"; //Afisarea butonului checked

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
  inputElement.value = ""; // ne curata labelul dupa ce adaugam un toDo

  const task_message_div = document.createElement("div");
  task_message_div.classList.add("message");
  const task_filledIn_div = document.createElement("p");
  task_filledIn_div.classList.add("filledIn");
  task_filledIn_div.setAttribute("id", "filledIn");
  task_filledIn_div.innerText = "Please insert a task!";

  const task_succes_div = document.createElement("p");
  task_succes_div.classList.add("success");
  task_succes_div.setAttribute("id", "success");
  task_succes_div.innerText = "To do succesfully added!";

  task_message_div.appendChild(task_filledIn_div);
  task_message_div.appendChild(task_succes_div);

  listaParinteElement.appendChild(task_message_div);

  if (!input) {
    //alert("Please fill out the task!");
    //return;
    task_filledIn_div.style.display = 'block';
    listaParinteElement.removeChild(task_div);
  }
  else {
    setTimeout(() => {
      task_succes_div.style.display = 'block';
    }, 500);

  }

  setTimeout(() => {
    task_succes_div.style.display = 'none';
    task_filledIn_div.style.display = 'none';
  }, 4000);

  task_checked_div.addEventListener('click', checkedTask);
  //Checked function
  /* Functia checked in care daca task_checked_div este egal cu
  "checked" ne sublineaza textul folosind text decoration style
  - line-through. Apoi butonul check se schimba in unchecked. 
  Pentru ca butonul e pe unchecked o sa intre in else si il schimba
  pe checked si apoi textDecoration style se muta pe none. Practic 
  se uncheck-uie textul. */
  function checkedTask(e) {
    if (task_checked_div.innerText.toLowerCase() == "checked") {
      task_content_div.style.textDecoration = "line-through";
      task_checked_div.innerText = "Unchecked";
    } else {
      task_checked_div.innerText = "Checked";
      task_content_div.style.textDecoration = "none";
    }
  }

  // Aici adaugam un eveniment care contine functia de editare
  task_edit_div.addEventListener('click', editTask);

  /* E aceiasi metoda ca functia de checked. Ce am adaugat aici
  este:
  - am scos atributul de readonly pentru a putea modifica textul
  - metoda de focus pe text dupa ce apasam butonul de edit */
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


  //Evenimentul in care apelam functia de stergere a unui toDo
  task_delete_div.addEventListener('click', deleteTask);
  //Delete function in care stergem child-ul task_div din ListaParinte
  function deleteTask(e) {
    listaParinteElement.removeChild(task_div);
  }



  /* Message task. Aici avem un if in care daca input nu are continut
 adaugam div-ul filled id care este pus manual in html si eliminam
 din lista Parinte task_div care reprezinta tot label-ul. Altfel
 set un timeout in care afisam div-ul succes in care avem mesajul
 de succes. Apoi dupa 4 secunde eliminam cele doua div-uri. Ele 
 exista dar nu le mai afisam pe ecran*/

}



