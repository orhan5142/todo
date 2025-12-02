// elementleri secmek
var addButton = document.querySelector('.g-input');
var taskContainer = document.querySelector('.task-container');
var sortBtn = document.querySelector('.sort-btn');
var sortClicked = true;
var taskNumber = 1;
var plusBtn = document.querySelector('.add-circle');
var closeBtn = document.querySelector('.close-btn');
var closeImg = document.querySelector('.close-icon');


addButton.addEventListener('click', function() {
    var input = document.querySelector('.main-task-input');
    var inputArea = document.querySelector('.task-input-area');

    if (input.value.trim() === '') {
        inputArea.classList.add('hidden');
        return;
    }

    var taskText = input.value;
    var newTask = document.createElement('div');
    newTask.classList.add('task-item');
    newTask.setAttribute('draggable', 'true');

    newTask.innerHTML = `
    <div class="task-number">${taskNumber}</div>
    <input type="text" class="task-text" value="${taskText}" placeholder="" readonly>
    <button class="remove-task"><img src="images/Group 77.svg" alt="delete" class="delete-icon"></button>
    `;

    newTask.addEventListener('dragstart', function() {
        newTask.classList.add('dragging');
    });

    newTask.addEventListener('dragend', function() {
        newTask.classList.remove('dragging');
    });

    var deleteBtn = newTask.querySelector('.remove-task');
    var deleteImg = newTask.querySelector('.delete-icon');
    
    deleteBtn.addEventListener('mouseenter', function() {
        deleteImg.src = "./images/Group 70.svg";
    });
    
    deleteBtn.addEventListener('mouseleave', function() {
        deleteImg.src = "./images/Group 77.svg";
    });
    
    deleteBtn.addEventListener('click', function(e) {
        var task = e.target.closest('.task-item');
        if (task) {
            taskContainer.removeChild(task);
            
            if (taskContainer.children.length === 0) {
                taskContainer.classList.add('hidden');
                var inputArea2 = document.querySelector('.task-input-area');
                var input2 = document.querySelector('.main-task-input');
                inputArea2.classList.remove('hidden');
                input2.value = '';
                input2.focus();
            }
        }
    });

    taskContainer.classList.remove('hidden');
    taskContainer.appendChild(newTask);

    taskNumber++;
    input.value = '';
    inputArea.classList.add('hidden');
});


sortBtn.addEventListener('mouseenter', function() {
    if (sortClicked) {
        sortBtn.src = "./images/Group 91.svg";
    } else {
        sortBtn.src = "./images/Group 73.svg";
    }
});

sortBtn.addEventListener('mouseleave', function() {
    if (sortClicked) {
        sortBtn.src = "./images/Group 90.svg";
    } else {
        sortBtn.src = "./images/Group 74.svg";
    }
});


sortBtn.addEventListener('click', function() {
    var tasks = taskContainer.children;
    var tasksArray = [];
    
    for (var i = 0; i < tasks.length; i++) {
        tasksArray.push(tasks[i]);
    }

    if (sortClicked) {
        tasksArray.sort(function(a, b) {
            var textA = a.querySelector('.task-text').value.toLowerCase();
            var textB = b.querySelector('.task-text').value.toLowerCase();

            if (textA < textB) return -1;
            if (textA > textB) return 1;
            return 0;
        });
        sortClicked = false;
    } else {
        tasksArray.sort(function(a, b) {
            var textA = a.querySelector('.task-text').value.toLowerCase();
            var textB = b.querySelector('.task-text').value.toLowerCase();

            if (textA > textB) return -1;
            if (textA < textB) return 1;
            return 0;
        });
        sortClicked = true;
    }

    taskContainer.innerHTML = '';
    for (var i = 0; i < tasksArray.length; i++) {
        taskContainer.appendChild(tasksArray[i]);
    }
    
    if (sortClicked) {
        sortBtn.src = "./images/Group 91.svg";
    } else {
        sortBtn.src = "./images/Group 73.svg";
    }
});


taskContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
    
    var items = taskContainer.querySelectorAll('.task-item:not(.dragging)');
    var dragging = document.querySelector('.dragging');
    var afterElement = null;
    var closestOffset = Number.NEGATIVE_INFINITY;
    
    for (var i = 0; i < items.length; i++) {
        var box = items[i].getBoundingClientRect();
        var offset = e.clientY - box.top - box.height / 2;
        
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            afterElement = items[i];
        }
    }

    if (dragging) {
        if (afterElement == null) {
            taskContainer.appendChild(dragging);
        } else {
            taskContainer.insertBefore(dragging, afterElement);
        }
    }
});


plusBtn.addEventListener('click', function(e) {
    var inputArea = document.querySelector('.task-input-area');
    var input = document.querySelector('.main-task-input');
    inputArea.classList.remove('hidden');
    input.value = '';
    input.focus();
    e.stopPropagation();
});


window.addEventListener('load', function() {
    var inputArea = document.querySelector('.task-input-area');
    var input = document.querySelector('.main-task-input');
    inputArea.classList.remove('hidden');
    input.value = '';
    input.focus();
});


document.addEventListener('keydown', function(e) {
    if (e.key === '+') {
        e.preventDefault();
        var inputArea = document.querySelector('.task-input-area');
        var input = document.querySelector('.main-task-input');
        inputArea.classList.remove('hidden');
        input.value = '';
        input.focus();
    }
    if (e.key === 'Enter') {
        var input = document.querySelector('.main-task-input');
        var inputArea = document.querySelector('.task-input-area');

        if (input.value.trim() === '') {
            inputArea.classList.add('hidden');
            return;
        }

        var taskText = input.value;
        var newTask = document.createElement('div');
        newTask.classList.add('task-item');
        newTask.setAttribute('draggable', 'true');

        newTask.innerHTML = `
        <div class="task-number">${taskNumber}</div>
        <input type="text" class="task-text" value="${taskText}" placeholder="" readonly>
        <button class="remove-task"><img src="images/Group 77.svg" alt="delete" class="delete-icon"></button>
        `;

        newTask.addEventListener('dragstart', function() {
            newTask.classList.add('dragging');
        });

        newTask.addEventListener('dragend', function() {
            newTask.classList.remove('dragging');
        });

        var deleteBtn = newTask.querySelector('.remove-task');
        var deleteImg = newTask.querySelector('.delete-icon');
        
        deleteBtn.addEventListener('mouseenter', function() {
            deleteImg.src = "./images/Group 70.svg";
        });
        
        deleteBtn.addEventListener('mouseleave', function() {
            deleteImg.src = "./images/Group 77.svg";
        });
        
        deleteBtn.addEventListener('click', function(e) {
            var task = e.target.closest('.task-item');
            if (task) {
                taskContainer.removeChild(task);
                
                if (taskContainer.children.length === 0) {
                    taskContainer.classList.add('hidden');
                    var inputArea2 = document.querySelector('.task-input-area');
                    var input2 = document.querySelector('.main-task-input');
                    inputArea2.classList.remove('hidden');
                    input2.value = '';
                    input2.focus();
                }
            }
        });

        taskContainer.classList.remove('hidden');
        taskContainer.appendChild(newTask);

        taskNumber++;
        input.value = '';
        inputArea.classList.add('hidden');
    }
});


closeBtn.addEventListener('mouseenter', function() {
    closeImg.src = "./images/Group 70.svg";
});

closeBtn.addEventListener('mouseleave', function() {
    closeImg.src = "./images/Group 77.svg";
});