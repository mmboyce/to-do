import ToDoList from './ToDo'

const content = document.querySelector("#content")

content.appendChild(ToDoList.loadSideBar())
content.appendChild(ToDoList.populateStickies())