'use strict'

var btnClear = document.body.querySelector('.task-btn_clear');
var btnAdd = document.body.querySelector('.task-btn_add');
var todoList = document.body.querySelector('.todo-list');


btnAdd.addEventListener('click', function (evt) {
    var taskInputValue = document.body.querySelector('.task-input').value;
    var taskDateValue = document.body.querySelector('.task-date').value;



    var newTaskBlock = document.createElement('div');
    newTaskBlock.classList = 'newTaskBlock';
    newTaskBlock.style.backgroundColor = 'red'

    var newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'checkTask';
    newCheckbox.classList = 'new-checkbox';

    var newTaskDate = document.createElement('p');
    newTaskDate.classList = 'new-task_text';

    var newTaskText = document.createElement('p');
    newTaskText.classList = 'new-task_date';

    var newTaskImg = document.createElement('div');
    newTaskImg.classList = 'new-task_img';
    newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";


    newTaskDate.innerHTML = taskDateValue;
    newTaskText.innerHTML = taskInputValue;

    newTaskBlock.appendChild(newCheckbox);
    newTaskBlock.appendChild(newTaskDate);
    newTaskBlock.appendChild(newTaskText);
    newTaskBlock.appendChild(newTaskImg);
    if (taskInputValue === '') {
        alert('Запишите задачу');
    } else {
        todoList.appendChild(newTaskBlock);
    }

    var allInput = document.body.querySelectorAll('.new-checkbox');
    var newTaskImg = document.querySelectorAll('.new-task_img');
    var allTaskText = document.body.querySelectorAll('.new-task_text');
    var taskBlockAll = document.body.querySelectorAll('.newTaskBlock');


for (var i = 0; i < allInput.length; i++) {
    allInput[i].addEventListener('click', function (evt) {
        if (evt.target.checked === true) {
            evt.target.parentElement.style.backgroundColor = '#90EE90';
            evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
        } else {
            evt.target.parentElement.style.backgroundColor = 'red';
            evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'none';
        }
    });
}

for (var j = 0; j < newTaskImg.length; j++) {
    newTaskImg[j].addEventListener('click', function (evt) {
        var parentDiv = evt.target.parentElement.parentElement;
        todoList.removeChild(parentDiv);
    });
}
});

btnClear.addEventListener('click', function () {
    var newTaskBlock = document.body.querySelectorAll('.newTaskBlock');
    for (var i = 0; i < newTaskBlock.length; i++) {
        todoList.removeChild(newTaskBlock[i]);
    }
});




