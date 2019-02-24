'use strict';

const btnClear = document.body.querySelector('.task-btn_clear');
const btnAdd = document.body.querySelector('.task-btn_add');
const todoList = document.body.querySelector('.todo-list');
const taskInput = document.body.querySelector('.task-input');
const sortList = document.body.querySelector('.sort-list');
const sortDateUp = document.body.querySelector('.sort-list .sort-list_date .sort-list_up');
const sortDateDown = document.body.querySelector('.sort-list .sort-list_date .sort-list_down');
const sortTextUp = document.body.querySelector('.sort-list .sort-list_text .sort-list_up');
const sortTextDown = document.body.querySelector('.sort-list .sort-list_text .sort-list_down');
const btnFilter = document.body.querySelector('.btn-filter');
const clearSortFilter = document.body.querySelector('.clear-sort-filter');
const newTaskMass = JSON.parse(localStorage.getItem(localStorage.key("myTaskList")));


let taskMass = [];
let dateMass = [];
let mas = [];
mas.push(newTaskMass);

(function () {
    todoList.innerHTML = '';

    for (let index = 0; index < localStorage.length; index++) {
        let elementLocal = JSON.parse(localStorage.getItem(localStorage.key("myTaskList")));
        if (elementLocal !== null) {
            elementLocal.forEach(function (item, index) {
                let newTaskBlock = document.createElement('div');
                newTaskBlock.classList = 'newTaskBlock';

                let newCheckbox = document.createElement('input');
                newCheckbox.type = 'checkbox';
                newCheckbox.name = 'checkTask';
                newCheckbox.classList = 'new-checkbox';
                newCheckbox.checked = elementLocal.checkbox;

                let newTaskDate = document.createElement('p');
                newTaskDate.classList = 'new-task_date';

                let newTaskText = document.createElement('p');
                newTaskText.classList = 'new-task_text';

                let newTaskImg = document.createElement('div');
                newTaskImg.classList = 'new-task_img';
                newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

                newTaskDate.innerHTML = elementLocal[index].date;
                newTaskText.innerHTML = elementLocal[index].text;

                newTaskBlock.appendChild(newCheckbox);
                newTaskBlock.appendChild(newTaskDate);
                newTaskBlock.appendChild(newTaskText);
                newTaskBlock.appendChild(newTaskImg);
                newTaskBlock.setAttribute('id', index);


                if (newCheckbox.checked === true) {
                    newTaskBlock.style.backgroundColor = '#90EE90';
                    newTaskText.style.textDecoration = 'line-through';
                } else {
                    newTaskBlock.style.backgroundColor = 'lightgray';
                    newTaskText.style.textDecoration = 'none';
                }
                todoList.appendChild(newTaskBlock);
            });

        }

        /* markerTodoList();*/

        /* basketTask();*/
    }
    deleteTask();
})();

btnAdd.addEventListener('click', function (evt) {
    let taskInputValue = document.body.querySelector('.task-input').value;
    let taskDateValue = document.body.querySelector('.task-date').value;


    let newTaskBlock = document.createElement('div');
    newTaskBlock.classList = 'newTaskBlock';

    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'checkTask';
    newCheckbox.classList = 'new-checkbox';

    window.newTaskDate = document.createElement('p');
    newTaskDate.classList = 'new-task_date';

    window.newTaskText = document.createElement('p');
    newTaskText.classList = 'new-task_text';

    let newTaskImg = document.createElement('div');
    newTaskImg.classList = 'new-task_img';
    newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";


    newTaskDate.innerHTML = taskDateValue;
    newTaskText.innerHTML = taskInputValue;

    newTaskBlock.appendChild(newCheckbox);
    newTaskBlock.appendChild(newTaskDate);
    newTaskBlock.appendChild(newTaskText);
    newTaskBlock.appendChild(newTaskImg);
    if(JSON.parse(localStorage.getItem('myTaskList')) === null){
        newTaskBlock.setAttribute('id', 0);
    } else{
        let allTask = document.body.querySelectorAll('.newTaskBlock');
        for(let k = 0; k < allTask.length; k++){
            newTaskBlock.setAttribute('id', allTask.length );
        }
    }

    const newTaskObject = {};
    if(JSON.parse(localStorage.getItem('myTaskList')) === null){
        newTaskObject.id = 0;
    } else {
        newTaskObject.id = JSON.parse(localStorage.getItem('myTaskList')).length;
    }
    newTaskObject.checkbox = newCheckbox.checked;
    newTaskObject.date = newTaskDate.innerHTML;
    newTaskObject.text = newTaskText.innerHTML;
    /*newTaskMass.push(JSON.parse(localStorage.getItem('myTaskList')));*/
    mas.push(newTaskObject);


    if (taskInputValue === '') {
        alert('Заполните пустое поле');
        taskInput.style.border = '2px solid red';

    } else {
        taskInput.style.border = '1px solid black';
        todoList.appendChild(newTaskBlock);
    }
/*markerTodoList();*/

/*basketTask();*/

    if (taskInput.value !== '') {
        localStorage.setItem('myTaskList', JSON.stringify(newTaskMass));
    }

    let data = JSON.parse(localStorage.getItem("myTaskList"));
    for(let j = 0; j < data.length; j++){
        data[j].id = j;
    }


});

function deleteTask(){
    todoList.addEventListener('click', function(event) {
        let newTaskImg = document.querySelectorAll('.new-task_img');
        let parentElement = event.target.parentElement.parentElement;
        for(let index = 0 ; index < newTaskImg.length; index++) {
            let data = JSON.parse(localStorage.getItem("myTaskList"));
            if(event.target.parentElement === newTaskImg[index]){
                data.splice(index, 1);
            }
            for(let j = 0; j < data.length; j++){
                data[j].id = j;
            }
            /*data[index].id = index;*/
            localStorage.setItem('myTaskList', JSON.stringify(data));

        }
        todoList.removeChild(parentElement);
        let allTask = document.body.querySelectorAll('.newTaskBlock');
        for(let k = 0; k < allTask.length; k++){
            allTask[k].id = k;
        }


    });
}



/*function basketTask() {
    let newTaskImg = document.querySelectorAll('.new-task_img');
    for (let index = 0; index < newTaskImg.length; index++) {
        newTaskImg[index].addEventListener('click', function (evt) {
            let parentDiv = evt.target.parentElement.parentElement;
                   let data = JSON.parse(localStorage.getItem("myTaskList"));
                    for (let indexTwo = 0; indexTwo < data.length; indexTwo++) {
                        if (index === indexTwo) {
                            data.splice(index, 1);
                            console.log(data);
                            data.forEach(function (item, index) {


                               data[index].id = index;
                            });
                        }
                        localStorage.setItem('myTaskList', JSON.stringify(data));
                    }
            todoList.removeChild(parentDiv);
            let ntb = document.body.querySelectorAll('.newTaskBlock');
            ntb.forEach(function (item, index) {
                item.setAttribute('id', index);
            });

        });
        break;
    }
}*/

function markerTodoList(){
    let allInput = document.body.querySelectorAll('.new-checkbox');
    let newTaskImg = document.querySelectorAll('.new-task_img');
    let allTaskText = document.body.querySelectorAll('.new-task_text');
    window.taskBlockAll = document.body.querySelectorAll('.newTaskBlock');
    for (let index = 0; index < allInput.length; index++) {
        allInput[index].addEventListener('click', function (evt) {
            if (evt.target.checked === true) {
                JSON.parse(localStorage.getItem(localStorage.key(index))).checkbox = true;
                let tempNewObject = {};
                tempNewObject.id = JSON.parse(localStorage.getItem(localStorage.key(index))).id;
                tempNewObject.checkbox = true;
                tempNewObject.date = JSON.parse(localStorage.getItem(localStorage.key(index))).date;
                tempNewObject.text = JSON.parse(localStorage.getItem(localStorage.key(index))).text;

                localStorage.setItem(localStorage.key(index), JSON.stringify(tempNewObject));
                evt.target.parentElement.style.backgroundColor = '#90EE90';
                evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
            } else {
                JSON.parse(localStorage.getItem(localStorage.key(index))).checkbox = false;
                let tempNewObject = {};
                tempNewObject.id = JSON.parse(localStorage.getItem(localStorage.key(index))).id;
                tempNewObject.checkbox = false;
                tempNewObject.date = JSON.parse(localStorage.getItem(localStorage.key(index))).date;
                tempNewObject.text = JSON.parse(localStorage.getItem(localStorage.key(index))).text;

                localStorage.setItem(localStorage.key(index), JSON.stringify(tempNewObject));
                evt.target.parentElement.style.backgroundColor = 'lightgray';
                evt.target.nextElementSibling.nextElementSibling.style.textDecoration = 'none';
            }
        });
    }
}


clearSortFilter.addEventListener('click', function () {
    todoList.innerHTML = '';

    for (let index = 0; index < localStorage.length; index++) {
        window.elementLocal = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let newTaskBlock = document.createElement('div');
        newTaskBlock.classList = 'newTaskBlock';

        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'checkTask';
        newCheckbox.classList = 'new-checkbox';
        newCheckbox.checked = elementLocal.checkbox;

        let newTaskDate = document.createElement('p');
        newTaskDate.classList = 'new-task_date';

        let newTaskText = document.createElement('p');
        newTaskText.classList = 'new-task_text';

        let newTaskImg = document.createElement('div');
        newTaskImg.classList = 'new-task_img';
        newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

        newTaskDate.innerHTML = elementLocal.date;
        newTaskText.innerHTML = elementLocal.text;

        newTaskBlock.appendChild(newCheckbox);
        newTaskBlock.appendChild(newTaskDate);
        newTaskBlock.appendChild(newTaskText);
        newTaskBlock.appendChild(newTaskImg);
        newTaskBlock.setAttribute('id', elementLocal.id);
        if (newCheckbox.checked === true) {
            console.log(newCheckbox.checked);
            newTaskBlock.style.backgroundColor = '#90EE90';
            newTaskText.style.textDecoration = 'line-through';
        } else {
            newTaskBlock.style.backgroundColor = 'lightgray';
            newTaskText.style.textDecoration = 'none';
        }



        todoList.appendChild(newTaskBlock);

    }
 /*   markerTodoList();*/

/*    basketTask();*/

});


function removeTaskBlocks() {
    localStorage.clear();
    todoList.innerHTML = "";
}

btnClear.addEventListener('click', removeTaskBlocks);




function repaintTodoList(mas, func) {
    let allTaskBlock = document.body.querySelectorAll('.newTaskBlock');
    taskMass = [];

    allTaskBlock.forEach(function (item, index) {
        let taskObject = {};
        taskObject.checkbox = todoList.childNodes[index].childNodes[0].checked;
        taskObject.date = todoList.childNodes[index].childNodes[1].innerHTML;
        taskObject.text = todoList.childNodes[index].childNodes[2].innerHTML;

        mas.push(taskObject);
    });

    mas.sort(func);

    todoList.innerHTML = '';

    mas.forEach(function (item, index) {
        let newTaskBlock = document.createElement('div');
        newTaskBlock.classList = 'newTaskBlock';

        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'checkTask';
        newCheckbox.classList = 'new-checkbox';
        newCheckbox.checked = mas[index].checkbox;

        let newTaskDate = document.createElement('p');
        newTaskDate.classList = 'new-task_date';

        let newTaskText = document.createElement('p');
        newTaskText.classList = 'new-task_text';

        let newTaskImg = document.createElement('div');
        newTaskImg.classList = 'new-task_img';
        newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

        newTaskDate.innerHTML = mas[index].date;
        newTaskText.innerHTML = mas[index].text;

        newTaskBlock.appendChild(newCheckbox);
        newTaskBlock.appendChild(newTaskDate);
        newTaskBlock.appendChild(newTaskText);
        newTaskBlock.appendChild(newTaskImg);
        if (newCheckbox.checked === true) {
            newTaskBlock.style.backgroundColor = '#90EE90';
            newTaskText.style.textDecoration = 'line-through';
        } else {
            newTaskBlock.style.backgroundColor = 'lightgray';
            newTaskText.style.textDecoration = 'none';
        }

        newCheckbox.addEventListener('change', function () {
            if (newCheckbox.checked === true) {
                newTaskBlock.style.backgroundColor = '#90EE90';
                newTaskText.style.textDecoration = 'line-through';
            } else {
                newTaskBlock.style.backgroundColor = 'lightgray';
                newTaskText.style.textDecoration = 'none';
            }
        });

        todoList.appendChild(newTaskBlock);
    });
};


sortList.addEventListener('click', ({target}) => {
    switch (target) {
        case sortDateUp:
            repaintTodoList(taskMass, dateSortUp);
            break;
        case sortDateDown:
            repaintTodoList(taskMass, dateSortDown);
            break;
        case sortTextUp:
            repaintTodoList(taskMass, sortTextu);
            break;
        case sortTextDown:
            repaintTodoList(taskMass, sortTextd);
            break;
    }
});
let filterMass = [];
btnFilter.addEventListener('click', function () {
    const dateFilterMin = document.body.querySelector('.date-filter_min').value;
    const dateFilterMax = document.body.querySelector('.date-filter_max').value;
    const textFilter = document.body.querySelector('.text-filter').value;

    const newTaskBlocks = document.body.querySelectorAll('.newTaskBlock');
    filterMass = [];

    newTaskBlocks.forEach(function (item, index) {
        let tempMassObj = new Object;
        tempMassObj.checkbox = todoList.childNodes[index].childNodes[0].checked;
        tempMassObj.date = todoList.childNodes[index].childNodes[1].innerHTML;
        tempMassObj.text = todoList.childNodes[index].childNodes[2].innerHTML;
        filterMass.push(tempMassObj);
    });
    todoList.innerHTML = '';
    filterMass.forEach(function (item, index) {

        if (+new Date(dateFilterMin) <= +new Date(filterMass[index].date) === true && +new Date(filterMass[index].date) <= +new Date(dateFilterMax)
            === true && filterMass[index].text.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1) {

            let newTaskBlock = document.createElement('div');
            newTaskBlock.classList = 'newTaskBlock';

            let newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.name = 'checkTask';
            newCheckbox.classList = 'new-checkbox';
            newCheckbox.checked = filterMass[index].checkbox;

            let newTaskDate = document.createElement('p');
            newTaskDate.classList = 'new-task_date';

            let newTaskText = document.createElement('p');
            newTaskText.classList = 'new-task_text';

            let newTaskImg = document.createElement('div');
            newTaskImg.classList = 'new-task_img';
            newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

            newTaskDate.innerHTML = filterMass[index].date;
            newTaskText.innerHTML = filterMass[index].text;

            newTaskBlock.appendChild(newCheckbox);
            newTaskBlock.appendChild(newTaskDate);
            newTaskBlock.appendChild(newTaskText);
            newTaskBlock.appendChild(newTaskImg);
            if (newCheckbox.checked === true) {
                newTaskBlock.style.backgroundColor = '#90EE90';
                newTaskText.style.textDecoration = 'line-through';
            } else {
                newTaskBlock.style.backgroundColor = 'lightgray';
                newTaskText.style.textDecoration = 'none';
            }

            newCheckbox.addEventListener('change', function () {
                if (newCheckbox.checked === true) {
                    newTaskBlock.style.backgroundColor = '#90EE90';
                    newTaskText.style.textDecoration = 'line-through';
                } else {
                    newTaskBlock.style.backgroundColor = 'lightgray';
                    newTaskText.style.textDecoration = 'none';
                }
            });

            todoList.appendChild(newTaskBlock);
        }
    });

});



