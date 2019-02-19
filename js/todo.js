'use strict';

var btnClear = document.body.querySelector('.task-btn_clear');
var btnAdd = document.body.querySelector('.task-btn_add');
var todoList = document.body.querySelector('.todo-list');
let taskInput = document.body.querySelector('.task-input');
let sortList = document.body.querySelector('.sort-list');
let sortDateUp = document.body.querySelector('.sort-list .sort-list_date .sort-list_up');
let sortDateDown = document.body.querySelector('.sort-list .sort-list_date .sort-list_down');
let sortTextUp = document.body.querySelector('.sort-list .sort-list_text .sort-list_up');
let sortTextDown = document.body.querySelector('.sort-list .sort-list_text .sort-list_down');
let taskMass = [];
let dateMass = [];
/*let mas = []*/

function createTask() {

}


btnAdd.addEventListener('click', function (evt) {
    var taskInputValue = document.body.querySelector('.task-input').value;
    var taskDateValue = document.body.querySelector('.task-date').value;
    let taskDateValueNum = document.body.querySelector('.task-date').valueAsNumber;
dateMass.push(taskDateValueNum);

    var newTaskBlock = document.createElement('div');
    newTaskBlock.classList = 'newTaskBlock';

    var newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'checkTask';
    newCheckbox.classList = 'new-checkbox';

    window.newTaskDate = document.createElement('p');
    newTaskDate.classList = 'new-task_date';

    window.newTaskText = document.createElement('p');
    newTaskText.classList = 'new-task_text';

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
        alert('Заполните пустое поле');
        taskInput.style.border = '2px solid red';

    } else {
        taskInput.style.border = '1px solid black';
        todoList.appendChild(newTaskBlock);
    }

    var allInput = document.body.querySelectorAll('.new-checkbox');
    var newTaskImg = document.querySelectorAll('.new-task_img');
    var allTaskText = document.body.querySelectorAll('.new-task_text');
    window.taskBlockAll = document.body.querySelectorAll('.newTaskBlock');


    for (var i = 0; i < allInput.length; i++) {
        allInput[i].addEventListener('click', function (evt) {
            if (evt.target.checked === true) {
                evt.target.parentElement.style.backgroundColor = '#90EE90';
                evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
            } else {
                evt.target.parentElement.style.backgroundColor = 'lightgray';
                evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'none';
            }
        });
    }

    for (var j = 0; j < newTaskImg.length; j++) {
        newTaskImg[j].addEventListener('click', function(evt) {
            var parentDiv = evt.target.parentElement.parentElement;
            todoList.removeChild(parentDiv);
        });
    }



});

function removeTaskBlocks(){
    var newTaskBlock = document.body.querySelectorAll('.newTaskBlock');
    for (var i = 0; i < newTaskBlock.length; i++) {
        todoList.removeChild(newTaskBlock[i]);
    }
}

btnClear.addEventListener('click', removeTaskBlocks);

let sortDateu = (taskBlockA, taskBlockB) => {
    return parseInt(taskBlockA.dateSort) - parseInt(taskBlockB.dateSort);
};

let sortDated = (taskBlockA, taskBlockB) => {
    return  parseInt(taskBlockB.dateSort) - parseInt(taskBlockA.dateSort);
};

let sortTextu = (taskBlockA, taskBlockB) =>{
    if ( taskBlockA.text < taskBlockB.text ) return -1;
    if ( taskBlockA.text < taskBlockB.text ) return 1;
};

let sortTextd = (taskBlockA, taskBlockB) =>{
    if ( taskBlockA.text > taskBlockB.text ) return -1;
    if ( taskBlockA.text > taskBlockB.text ) return 1;
};


function repaintTodoList(mas, func) {
    let allTaskBlock = document.body.querySelectorAll('.newTaskBlock');
     taskMass = [];

    allTaskBlock.forEach(function(item, index){
        let taskObject = {};
        taskObject.checkbox = todoList.childNodes[index].childNodes[0].checked;
        taskObject.dateSort = dateMass[index];
        taskObject.date = todoList.childNodes[index].childNodes[1].innerHTML;
        taskObject.text = todoList.childNodes[index].childNodes[2].innerHTML;

        mas.push(taskObject);
    });

    mas.sort(func);

    todoList.innerHTML = '';

    mas.forEach(function (item, index) {
        var newTaskBlock = document.createElement('div');
        newTaskBlock.classList = 'newTaskBlock';

        var newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'checkTask';
        newCheckbox.classList = 'new-checkbox';
        newCheckbox.checked = mas[index].checkbox;

        var newTaskDate = document.createElement('p');
        newTaskDate.classList = 'new-task_date';

        var newTaskText = document.createElement('p');
        newTaskText.classList = 'new-task_text';

        var newTaskImg = document.createElement('div');
        newTaskImg.classList = 'new-task_img';
        newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

        newTaskDate.innerHTML = mas[index].date;
        newTaskText.innerHTML = mas[index].text;

        newTaskBlock.appendChild(newCheckbox);
        newTaskBlock.appendChild(newTaskDate);
        newTaskBlock.appendChild(newTaskText);
        newTaskBlock.appendChild(newTaskImg);
        if(newCheckbox.checked === true){
            newTaskBlock.style.backgroundColor =  '#90EE90';
            newTaskText.style.textDecoration = 'line-through';
        } else{
            newTaskBlock.style.backgroundColor =  'lightgray';
            newTaskText.style.textDecoration = 'none';
        }

        newCheckbox.addEventListener('change', function () {
            if(newCheckbox.checked === true){
                newTaskBlock.style.backgroundColor =  '#90EE90';
                newTaskText.style.textDecoration = 'line-through';
            } else{
                newTaskBlock.style.backgroundColor =  'lightgray';
                newTaskText.style.textDecoration = 'none';
            }
        });

        todoList.appendChild(newTaskBlock);
    });
};




sortList.addEventListener('click',({target}) => {
    switch (target) {
        case sortDateUp:
            repaintTodoList(taskMass, sortDateu);
            break;
        case sortDateDown:
            repaintTodoList(taskMass, sortDated);
            break;
        case sortTextUp:
            repaintTodoList(taskMass, sortTextu);
            break;
        case sortTextDown:
            repaintTodoList(taskMass, sortTextd);
            break;
    }
});