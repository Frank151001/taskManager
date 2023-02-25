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

function toggleView(){
    
}

 


function init(){
    console.log("Task Manager");
    $("#formIcon").click(toggleImportant);
    
}
window.onload=init;