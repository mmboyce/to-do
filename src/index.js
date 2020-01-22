import ToDoList from './ToDo'

const content = document.querySelector("#content")

content.appendChild(ToDoList.loadSideBar())

if (ToDoList.storageAvailable('localStorage') && localStorage.length > 0) {
    const newProjects = []

    for (let i = 0; i < localStorage.length; i++) {
        let item = localStorage.getItem(i)
        let parsedItem = JSON.parse(item)

        for (let i = 0; i < parsedItem.stickies.length; i++) {
            if (parsedItem.stickies[i].dueDate !== "No Due Date") {
                parsedItem.stickies[i].dueDate = new Date(parsedItem.stickies[i].dueDate)
            }
        }

        console.log(parsedItem)

        newProjects.push(parsedItem)
    }

    content.appendChild(ToDoList.populateProjectsFromStorage(newProjects))
} else {
    content.appendChild(ToDoList.populateStickies())
}


