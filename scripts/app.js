var notImportantIcon="fa-solid fa-battery-empty"; 
var aLeastImportantIcon="fa-solid fa-battery-half";
var ImportantIcon="fa-solid fa-battery-full";
var isVisible=false;
var isImportant=false;


function toggleImportant(){
    if(isImportant){
        isImportant=false;
    $("#formIcon")
        .removeClass(ImportantIcon)
        .addClass(notImportantIcon);
    }else{
        isImportant=true;
        $("#formIcon")
        .removeClass(notImportantIcon)
        .addClass(ImportantIcon); 
    }
}

function saveTask(){
    let title=$("#txtTittle").val();
    let desc=$("#txtDesc").val();
    let category=$("#selCategory").val();
    let dueDate=$("#selDueDate").val();
    let priority=$("#selPriority").val();
    let color=$("#selColor").val();
    console.log(title,desc,category,dueDate,priority,color);

    let task=new Task(isImportant,title,desc,category,dueDate,priority,color);
    console.log(task);
    displayTask(task);
    deleteButtom(task);

    $.ajax({
        type:"POST",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success: function(res){
            console.log(res);
           
        },
        error: function(error){
            console.log(error);
        }
    });
}


function toggleView(){
    if(isVisible){
        isVisible=false;
        $("#form").hide();
    }else{
        isVisible=true
        $("#form").show();
    }
}

function displayTask(newTask){
    let icon="";
    if(newTask.isImportant){
        icon=  `<i class='${ImportantIcon}'></i>`;
    } else{
        icon=`<i class='${notImportantIcon}'></i>`;
    }

    let syntax=`
    <div class="containerTask" style="border: 4px solid${newTask.color};margin:8px;border-radius: 15px;">
        <ul id="task-list">
          <li>
            <input type="checkbox" class="checkbox">${icon}</input>
            <span class="title">${newTask.title}</span>
            <span class="description">${newTask.description}</span>
            <span class="due-date">${newTask.dueDate}</span>
            <button class="delete-button" id="deleteButtom">Delete</button>
          </li>
        </ul>
    </div>`;
      $("#pending-tasks").append(syntax);
      deleteButtom($("#pending-tasks"));
}

function deleteButtom(task){
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const listItem = button.parentElement;
        const listItem2 = listItem.parentElement;
        const listItem3 = listItem2.parentElement;
        listItem3.remove(task);
    });
    });

    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
        const listItem = checkbox.parentElement;
        listItem.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(() => {
            const listItem2 = listItem.parentElement;
            const listItem3 = listItem2.parentElement;
            listItem3.remove(task);
        }, 1000);
        }
    });
    });
}

function testRequest(){
    $.ajax({
        type:"GET",
        url:"http://fsdiapi.azurewebsites.net/", 
        success: function(res){
            console.log(res);
        },
        error: function(error){
            console.log(error);
        }
    });
}

 
function loadTasks(){
    $.ajax({
        type:"GET",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(res){
            let data = JSON.parse(res);
            console.log(res);
            console.log(data);
        },
        error: function(error){
            console.log(error);
            alert("Unexpected error");
        }
    });
}

function init(){
    console.log("Task Manager");
    loadTasks();

    $("#formIcon").click(toggleImportant);
    $("#toggleView").click(toggleView);
    $("#btnSave").click(saveTask);
    
}
window.onload=init;