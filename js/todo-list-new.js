const taskBtnAdd = document.querySelector('.task-btn_add');
const taskBtnClear = document.body.querySelector('.task-btn_clear');
const todoList = document.body.querySelector('.todo-list');
const sortList = document.body.querySelector('.sort-list');
const sortDateUp = document.body.querySelector('.sort-list .sort-list_date .sort-list_up');
const sortDateDown = document.body.querySelector('.sort-list .sort-list_date .sort-list_down');
const sortTextUp = document.body.querySelector('.sort-list .sort-list_text .sort-list_up');
const sortTextDown = document.body.querySelector('.sort-list .sort-list_text .sort-list_down');
const arrayLocalStorage = JSON.parse(localStorage.getItem('myTaskList'));
const btnClear = document.body.querySelector('.clear-sort-filter');
const btnFilter = document.body.querySelector('.btn-filter');
const arrayTasks = [];
let arrayFilter = [];

(function () {
    if (localStorage.getItem('myTaskList')) {
        arrayLocalStorage.forEach(function (item, index) {
            createTask(arrayLocalStorage[index].date, arrayLocalStorage[index].text, arrayLocalStorage[index].checkbox);
        });

        todoList.addEventListener('click', deleteTask);

        todoList.addEventListener('click', taskComplete);
    }

})();

taskBtnAdd.addEventListener('click', function () {
    const taskDate = document.querySelector('.task-date').value;
    const taskText = document.querySelector('.task-input').value;

    if (taskText !== '' && taskDate !== '') {
        document.body.querySelector('.task-input').style.border = '1px solid black';
        createTask(taskDate, taskText);
    } else {
        document.body.querySelector('.task-input').style.border = '2px solid red';
        document.body.querySelector('.task-date').style.border = '2px solid red'
    }
    console.log(taskDate);
    todoList.addEventListener('click', deleteTask);

    todoList.addEventListener('click', taskComplete);

    localStorage.setItem('myTaskList', JSON.stringify(arrayTasks));
});

taskBtnClear.addEventListener('click', clearTodoList);

sortList.addEventListener('click', ({target}) => {
    switch (target) {
        case sortDateUp:
            sortTodoList(dateSortUp);
            break;
        case sortDateDown:
            sortTodoList(dateSortDown);
            break;
        case sortTextUp:
            sortTodoList(textSortUp);
            break;
        case sortTextDown:
            sortTodoList(textSortDown);
            break;
    }
});

btnClear.addEventListener('click', clearSortFilter);

btnFilter.addEventListener('click', filterTodoList);

function createTask(taskDate, taskText, taskCheckbox = false) {
    const newTaskBlock = document.createElement('div');
    newTaskBlock.classList = 'newTaskBlock';

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'checkTask';
    newCheckbox.classList = 'new-checkbox';

    const newTaskDate = document.createElement('p');
    newTaskDate.classList = 'new-task_date';

    const newTaskText = document.createElement('p');
    newTaskText.classList = 'new-task_text';

    const newTaskImg = document.createElement('div');
    newTaskImg.classList = 'new-task_img';
    newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

    newTaskDate.innerHTML = taskDate;
    newTaskText.innerHTML = taskText;
    newCheckbox.checked = taskCheckbox;

    newTaskBlock.appendChild(newCheckbox);
    newTaskBlock.appendChild(newTaskDate);
    newTaskBlock.appendChild(newTaskText);
    newTaskBlock.appendChild(newTaskImg);

    const tempObject = {};
    tempObject.checkbox = taskCheckbox;
    tempObject.date = newTaskDate.innerHTML;
    tempObject.text = newTaskText.innerHTML;

    arrayTasks.push(tempObject);


    if (newCheckbox.checked === true) {
        newTaskBlock.style.backgroundColor = '#90EE90';
        newTaskText.style.textDecoration = 'line-through';
    } else {
        newTaskBlock.style.backgroundColor = 'lightgray';
        newTaskText.style.textDecoration = 'none';
    }
    todoList.appendChild(newTaskBlock);
}

function repaintTodoList(taskDate, taskText, taskCheckbox = false) {
    const newTaskBlock = document.createElement('div');
    newTaskBlock.classList = 'newTaskBlock';

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'checkTask';
    newCheckbox.classList = 'new-checkbox';

    const newTaskDate = document.createElement('p');
    newTaskDate.classList = 'new-task_date';

    const newTaskText = document.createElement('p');
    newTaskText.classList = 'new-task_text';

    const newTaskImg = document.createElement('div');
    newTaskImg.classList = 'new-task_img';
    newTaskImg.innerHTML = "<img src='img/basket.png' width='20px' height='25px'>";

    newTaskDate.innerHTML = taskDate;
    newTaskText.innerHTML = taskText;
    newCheckbox.checked = taskCheckbox;

    newTaskBlock.appendChild(newCheckbox);
    newTaskBlock.appendChild(newTaskDate);
    newTaskBlock.appendChild(newTaskText);
    newTaskBlock.appendChild(newTaskImg);

    const tempObject = {};
    tempObject.checkbox = taskCheckbox;
    tempObject.date = newTaskDate.innerHTML;
    tempObject.text = newTaskText.innerHTML;

    if (newCheckbox.checked === true) {
        newTaskBlock.style.backgroundColor = '#90EE90';
        newTaskText.style.textDecoration = 'line-through';
    } else {
        newTaskBlock.style.backgroundColor = 'lightgray';
        newTaskText.style.textDecoration = 'none';
    }
    todoList.appendChild(newTaskBlock);
}

function taskComplete() {
    const allTaskInput = document.body.querySelectorAll('.new-checkbox');

    allTaskInput.forEach(function (item, index) {
        if (allTaskInput[index].checked === true) {
            allTaskInput[index].parentElement.style.backgroundColor = '#90EE90';
            allTaskInput[index].nextSibling.nextSibling.style.textDecoration = 'line-through';
            arrayTasks[index].checkbox = true;
        } else {
            allTaskInput[index].parentElement.style.backgroundColor = 'lightgray';
            allTaskInput[index].nextSibling.nextSibling.style.textDecoration = 'none';
            arrayTasks[index].checkbox = false;
        }
        localStorage.setItem('myTaskList', JSON.stringify(arrayTasks));
    });
}


function deleteTask({target}) {
    const allBasketImg = document.body.querySelectorAll('.new-task_img');

    allBasketImg.forEach(function (item, index) {
        if (target.parentElement === allBasketImg[index]) {
            todoList.removeChild(target.parentElement.parentElement);
            arrayTasks.splice(index, 1);
            localStorage.setItem('myTaskList', JSON.stringify(arrayTasks));
        }
    });
}

function clearTodoList() {
    localStorage.clear();
    todoList.innerHTML = "";
    arrayTasks.splice(0, arrayTasks.length);
}


function sortTodoList(sortFunction) {
    todoList.innerHTML = '';
    arrayTasks.sort(sortFunction);
    arrayTasks.forEach(function (item, index) {
        repaintTodoList(arrayTasks[index].date, arrayTasks[index].text, arrayTasks[index].checkbox);
    });
}

function sortTodoListInFilter(sortFunction) {
    todoList.innerHTML = '';
    arrayFilter.sort(sortFunction);
    arrayFilter.forEach(function (item, index) {
        repaintTodoList(arrayFilter[index].date, arrayFilter[index].text, arrayFilter[index].checkbox);
    });
}


let dateSortUp = (taskBlockA, taskBlockB) => {
    return new Date(taskBlockA.date) - new Date(taskBlockB.date);
};

let dateSortDown = (taskBlockA, taskBlockB) => {
    return new Date(taskBlockB.date) - new Date(taskBlockA.date);
};

let textSortUp = (taskBlockA, taskBlockB) => {
    if (taskBlockA.text < taskBlockB.text) return -1;
};

let textSortDown = (taskBlockA, taskBlockB) => {
    if (taskBlockA.text > taskBlockB.text) return -1;
};

function clearSortFilter() {
    todoList.innerHTML = '';
    let tempLocalStorage = JSON.parse(localStorage.getItem('myTaskList'));
    tempLocalStorage.forEach(function ({date, text, checkbox}) {
        repaintTodoList(date, text, checkbox);
    });
}

function filterTodoList() {
    const dateFilterMin = document.body.querySelector('.date-filter_min').value;
    const dateFilterMax = document.body.querySelector('.date-filter_max').value;
    const textFilter = document.body.querySelector('.text-filter').value;

    todoList.innerHTML = '';

    arrayTasks.forEach(function ({date, text, checkbox}, index) {
        if (+new Date(dateFilterMin) <= +new Date(date) && +new Date(date) <= +new Date(dateFilterMax) && text.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1) {
            repaintTodoList(date, text, checkbox);
            arrayFilter.push(arrayTasks[index]);
        }
    });

    sortList.addEventListener('click', ({target}) => {
        switch (target) {
            case sortDateUp:
                sortTodoListInFilter(dateSortUp);
                break;
            case sortDateDown:
                sortTodoListInFilter(dateSortDown);
                break;
            case sortTextUp:
                sortTodoListInFilter(textSortUp);
                break;
            case sortTextDown:
                sortTodoListInFilter(textSortDown);
                break;
        }
    });

}
