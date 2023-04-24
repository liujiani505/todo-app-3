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
    })
})