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
}

function testRequest(){
    $.ajax({
        type:"POST",
        URL:"http://fsdiapi.azurewebsites.net/api/tasks",

        success: function(res){
            let data=JSON.parse(res);
            console.log(res);
        },
        error: function(error){
            console.log(error);
            alert("Unexpected error");
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
    

    let syntax= `<div class="task" style=""border:2px solid ${newTask.color}>
        <div class="info">
            <h1>${newTask.title}</h1>
            <p>${newTask.description}</p>
        </div>
        <label>${newTask.category}</label>
        <div class="details">
            <label>${newTask.priority}</label>
            <label>${newTask.dueDate}</label>
        </div>
    </div>`;
    $("#pending-tasks").append(syntax);
}

 


function init(){
    console.log("Task Manager");
    $("#formIcon").click(toggleImportant);
    $("#toggleView").click(toggleView);
    $("#btnSave").click(saveTask);
    
}
window.onload=init;