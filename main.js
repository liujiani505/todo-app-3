window.addEventListener('load', ()=> {

    // todos variable is not explicitly declared with the let or const keyword, but it is implicitly declared as a global variable because it is assigned a value without being previously defined.

    // However, it's generally not a good idea to use implicit global variable declarations, as it can lead to unexpected behavior and make your code harder to maintain. It's recommended to always use the let or const

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    newTodoForm.addEventListener("submit", e => {
        e.preventDefault();
        // console.log(e.target.elements)
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo);
        // local storage only allows you to store primitive values
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();
        DisplayTodos();
    })
    DisplayTodos();
})


function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

        if (todo.done) {
			todoItem.classList.add('done');
		}

        input.addEventListener('change', (e) => {
            // console.log(e.target.checked) returns ture if click on the checkbox 
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done')
            } 
            DisplayTodos()       
		})

        edit.addEventListener('click', e=> {
            const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
            // if we click outside of input field, it'll stop editing
            input.addEventListener('blur', e=>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })

        })

        deleteButton.addEventListener('click', e=>{
            todos = todos.filter(t => t !=todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
        

	})
}


