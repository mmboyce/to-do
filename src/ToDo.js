import { format } from 'date-fns'

const ToDoList = (function () {

    class ToDo {
        constructor(title, description, dueDate, priority, notes, isChecked) {
            this.title = title
            this.description = description
            this.dueDate = dueDate //date-fns
            this.priority = priority // 0-3 stars
            this.notes = notes
            this.isChecked = isChecked // Boolean Value
        }

        toggleIsChecked() {
            this.isChecked = !this.isChecked
        }

        get title() {
            return this._title
        }

        get description() {
            return this._description
        }

        get dueDate() {
            return this._dueDate
        }

        get priority() {
            return this._priority
        }

        get notes() {
            return this._notes
        }

        get isChecked() {
            return this._isChecked
        }

        set title(value) {
            this._title = value
        }

        set description(value) {
            this._description = value
        }

        set dueDate(value) {
            this._dueDate = value
        }

        set priority(value) {
            this._priority = value
        }

        set notes(value) {
            this._notes = value
        }

        set isChecked(value) {
            this._isChecked = value
        }

    }

    let stickyNotes = []
    const _stickyContainer = document.createElement("div")
    _stickyContainer.id = "container"

    const _defaultSticky = new ToDo(
        "To-Do List!",
        "Check out my notes to see how to make a sticky note!",
        new Date(),
        3,
        "Click the plus button to create a new sticky note to log your to-dos!",
        false)

    const _createPriority = priority => {
        const priorityElement = document.createElement("div")
        priorityElement.className = "priority"
        priorityElement.textContent = priority

        return priorityElement
    }

    const _createNotes = notes => {
        const notesElement = document.createElement("div")
        notesElement.className = "notes"
        notesElement.textContent = notes

        return notesElement
    }

    const _formatDueDate = dueDate => {
        // 21-Jan-2020 for example
        return format(dueDate, 'dd-MMM-yyyy')
    }

    const _createIsChecked = isChecked => {
        const isCheckedElement = document.createElement("div")
        isCheckedElement.className = "isChecked"
        isCheckedElement.textContent = isChecked

        return isCheckedElement
    }

    const _createSticky = stickyObject => {
        const sticky = document.createElement("div")
        sticky.className = "sticky"

        const title = document.createElement("div")
        title.className = "title"
        title.textContent = stickyObject.title

        const description = document.createElement("div")
        description.className = "description"
        description.textContent = stickyObject.description

        const dueDate = document.createElement("div")
        dueDate.className = "dueDate"
        dueDate.textContent = _formatDueDate(stickyObject.dueDate)

        const priority = _createPriority(stickyObject.priority)

        const notes = _createNotes(stickyObject.notes)

        const isChecked = _createIsChecked(stickyObject.isChecked)

        const remove = document.createElement("div")
        remove.className = "remove"
        remove.textContent = "X"

        isChecked.addEventListener("click", () => {
            stickyObject.toggleIsChecked()
            populateStickies(stickyNotes)
        })

        remove.addEventListener("click", () => {
            _removeSticky(stickyObject)
            populateStickies(stickyNotes)
        })

        sticky.appendChild(title)
        sticky.appendChild(description)
        sticky.appendChild(dueDate)
        sticky.appendChild(priority)
        sticky.appendChild(notes)
        sticky.appendChild(isChecked)
        sticky.appendChild(remove)

        return sticky
    }

    const addSticky = (title, description, dueDate, priority, notes, isChecked) => {
        const newSticky = new ToDo(title, description, dueDate, priority, notes, isChecked)
        stickyNotes.push(newSticky)

        populateStickies(stickyNotes)
    }

    const _removeSticky = sticky => {
        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i] === sticky) {
                stickyNotes.splice(i, 1)
                return
            }
        }
    }

    const _removeChecks = () => {
        let newSticky = []

        for(let i = 0; i < stickyNotes.length; i++) {
            let curr = stickyNotes[i]

            if(!curr.isChecked){
                newSticky.push(curr)
            }
        }

        if(newSticky.length < stickyNotes.length){
            stickyNotes = newSticky
            populateStickies(stickyNotes)
        }
    }

    const _removeAllStickies = () => {
        while(_stickyContainer.hasChildNodes()){
            _stickyContainer.removeChild(_stickyContainer.firstChild)
        }
    }

    const populateStickies = (stickies) => {
        _removeAllStickies()

        if (stickies === undefined) {
            stickyNotes = [_defaultSticky]
            stickies = stickyNotes
        }

        for (let i = 0; i < stickies.length; i++) {
            const sticky = _createSticky(stickies[i])
            _stickyContainer.appendChild(sticky)
        }

        return _stickyContainer
    }

    const loadSideBar = () =>{
        const side = document.createElement("div")
        side.id = "sideBar"

        const addStickyButton = document.createElement("div")
        addStickyButton.id = "addSticky"
        addStickyButton.textContent = "+"

        const clearChecks = document.createElement("div")
        clearChecks.id = "clearChecks"
        clearChecks.textContent ="Clear Checked"

        addStickyButton.addEventListener("click", () => {
            addSticky("Title", "Description", new Date(), 0, "Notes", false)
            populateStickies(stickyNotes)
        })

        clearChecks.addEventListener("click", () => {
            _removeChecks()
        })

        side.appendChild(addStickyButton)
        side.appendChild(clearChecks)

        return side
    }

    return { populateStickies, loadSideBar, addSticky, stickyNotes }

})()

export default ToDoList