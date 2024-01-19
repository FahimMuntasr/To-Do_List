const addBtn = document.getElementById('inputBtn');
const inputText = document.getElementById('inputText')
const clearBtn = document.getElementById('clearBtn');
const outputDiv = document.getElementById("userOutput");
const taskCounter = document.getElementById("countLeft");
const allRadio = document.getElementById('all');
const activeRadio = document.getElementById('active');
const completedRadio = document.getElementById('completed');
let taskCount = 0;

window.onload = function(){
    loadTasks();
}
addBtn.onclick = function(){
    if(inputText.value == ''){
        //console.log('null')
        window.alert('No task entered');
    } else {
        addTask(inputText.value);
        saveTask();
    }
}
clearBtn.onclick = function(){
    clearCompletedTasks();
    saveTask();
}
allRadio.onclick = function(){
    showAll();
}
function showAll(){
    var fieldsets = outputDiv.querySelectorAll('fieldset');
    fieldsets.forEach(function(fieldset) {
        fieldset.style.display = 'flex';
    });
}
activeRadio.onclick = function(){
    showActive();
}
function showActive(){
    var fieldsets = outputDiv.querySelectorAll('fieldset');
    fieldsets.forEach(function(fieldset) {
        var checkbox = fieldset.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            fieldset.style.display = 'none';
        } else{
            fieldset.style.display = 'flex';
        }
    });
}
completedRadio.onclick = function(){
    showCompleted();
}
function showCompleted(){
    var fieldsets = outputDiv.querySelectorAll('fieldset');
    fieldsets.forEach(function(fieldset) {
        var checkbox = fieldset.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            fieldset.style.display = 'none';
        } else {
            fieldset.style.display = 'flex';
        }
    });
}
function addTask(task, isChecked) {
    var fieldset = document.createElement("fieldset");
    var text = document.createTextNode(task);
    var checkbox = document.createElement("input");
    var span = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.checked = isChecked; // Set the checkbox state

    // Add an event listener to update the state when the checkbox is clicked
    checkbox.addEventListener('click', function() {
        saveTask();
    });

    fieldset.appendChild(checkbox);
    fieldset.appendChild(text);
    fieldset.appendChild(span);
    outputDiv.appendChild(fieldset);

    taskCount++;
    taskCounter.innerText = `${taskCount} tasks left`;
}
function clearCompletedTasks() {
    var fieldsets = outputDiv.querySelectorAll('fieldset');
    fieldsets.forEach(function (fieldset) {
        var checkbox = fieldset.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            outputDiv.removeChild(fieldset);
            taskCount--;
        }
    });
    taskCounter.innerText = `${taskCount} tasks left`;
}
function saveTask() {
    const tasks = Array.from(outputDiv.querySelectorAll('fieldset')).map(fieldset => {
        const checkbox = fieldset.querySelector('input[type="checkbox"]');
        return `${fieldset.innerText}|${checkbox.checked}`;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        JSON.parse(storedTasks).forEach(task => {
            const [taskText, isChecked] = task.split('|');
            addTask(taskText, isChecked === 'true');
        });
    }
}
