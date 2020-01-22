import { format } from 'date-fns'

const ToDoList = (function () {

    class ToDo {
        constructor(title, description, dueDate, isPriority, notes, isChecked) {
            this.title = title
            this.description = description
            this.dueDate = dueDate //date-fns
            this.isPriority = isPriority // Boolean Value
            this.notes = notes
            this.isChecked = isChecked // Boolean Value
        }

        toggleIsChecked() {
            this.isChecked = !this.isChecked
        }

        toggleIsPriority() {
            this.isPriority = !this.isPriority
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

        get isPriority() {
            return this._isPriority
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

        set isPriority(value) {
            this._isPriority = value
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

    const _NO_DUE_DATE = "No Due Date"

    const _defaultSticky = new ToDo(
        "To-Do List!",
        "Check out my notes to see how to make a sticky note!",
        new Date(),
        true,
        "You can click on any part of a post it to edit it! Just hit enter to save :)",
        false)

    const _createTitle = title => {
        const titleElement = document.createElement("div")
        titleElement.className = "title"
        titleElement.textContent = title

        return titleElement
    }

    const _createDescription = description => {
        const descriptionElement = document.createElement("div")
        descriptionElement.className = "description"
        descriptionElement.textContent = description

        return descriptionElement
    }

    const _createDueDate = dueDate => {
        const dueDateElement = document.createElement("div")
        dueDateElement.className = "dueDate"

        if (dueDate === _NO_DUE_DATE) {
            dueDateElement.textContent = dueDate
        } else {
            dueDateElement.textContent = "Due: " + _formatDueDate(dueDate)
        }

        return dueDateElement
    }

    const _createIsPriority = isPriority => {
        const isPriorityElement = document.createElement("div")
        isPriorityElement.className = "isPriority"
        isPriorityElement.textContent = "!"

        if (!isPriority) {
            isPriorityElement.classList.toggle("isNotPriority")
        }

        return isPriorityElement
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

    const _isoFormat = dueDate => {
        return format(dueDate, 'yyyy-MM-dd')
    }

    const _parseDate = isoDate => {
        const [year, month, day] = isoDate.split("-")

        // subtract 1 from month because js months are 0-11 :/
        return new Date(year, month - 1, day)
    }

    const _createIsChecked = isChecked => {
        const isCheckedElement = document.createElement("i")

        const classList = isCheckedElement.classList
        const solidSquare = "fas fa-check-square"
        const regularSquare = "far fa-check-square"

        const reg = "far"
        const sol = "fas"
        
        if(isChecked){
            isCheckedElement.className = solidSquare
            classList.add("checked")

        } else {
            isCheckedElement.className = regularSquare
        }

        isCheckedElement.addEventListener("mouseenter", () => {
            classList.toggle(reg)
            classList.toggle(sol)
        })

        isCheckedElement.addEventListener("mouseleave", () => {
            classList.toggle(reg)
            classList.toggle(sol)
        })


        // <i class="fas fa-check-square"></i>
        // <i class="far fa-check-square"></i>

        isCheckedElement.classList.add("isChecked")

        return isCheckedElement
    }

    const _checkInput = event => {
        return event.keyCode == 13 || event.which == 13
    }

    const _isEmpty = input => {
        console.log(input.value)
        return input.value == ""
    }

    // this is just a helper function for similarities amongst other edit functions
    const _editElement = (element, property) => {
        const parent = element.parentNode

        const input = document.createElement("input")
        input.className = property

        return [parent, input]
    }

    const _editText = (element, stickyObject, property) => {
        const [parent, input] = _editElement(element, property)
        const id = `${element.textContent} ${property}`.split(' ').join('-')

        input.value = element.textContent
        input.type = "text"
        input.id = id

        input.onkeypress = function (e) {
            // if user hits enter
            if (_checkInput(e) && !_isEmpty(input)) {
                element.textContent = input.value
                parent.replaceChild(element, input)

                stickyObject[property] = element.textContent
            } else if (_checkInput(e) && _isEmpty(input)) {
                element.textContent = `No ${property}`
                parent.replaceChild(element, input)

                stickyObject[property] = element.textContent
            }
        }

        parent.replaceChild(input, element)

        // focus on element, places cursor right into the input 
        document.getElementById(id).focus()
    }

    const _editDueDate = (element, stickyObject, property) => {
        const [parent, input] = _editElement(element, property)

        input.type = "date"

        if (stickyObject[property] === _NO_DUE_DATE) {
            input.value = _isoFormat(new Date())
        } else {
            input.value = _isoFormat(stickyObject[property])
        }

        const id = `${input.value} ${property}`.split(' ').join('-')
        input.id = id

        input.onkeypress = function (e) {
            // if user hits enter
            if (_checkInput(e) && !_isEmpty(input)) {
                const newDate = _parseDate(input.value)
                element.textContent = "Due: " + _formatDueDate(newDate)
                parent.replaceChild(element, input)

                stickyObject[property] = newDate
            } else if (_checkInput(e) && _isEmpty(input)) {
                element.textContent = _NO_DUE_DATE
                parent.replaceChild(element, input)

                stickyObject[property] = _NO_DUE_DATE
            }
        }

        parent.replaceChild(input, element)

        // focus on element, places cursor right into the input 
        document.getElementById(id).focus()
    }

    const _createSticky = stickyObject => {
        const sticky = document.createElement("div")
        sticky.className = "sticky"

        const title = _createTitle(stickyObject.title)

        const description = _createDescription(stickyObject.description)

        const dueDate = _createDueDate(stickyObject.dueDate)

        const isPriority = _createIsPriority(stickyObject.isPriority)

        const notes = _createNotes(stickyObject.notes)

        const isChecked = _createIsChecked(stickyObject.isChecked)

        const remove = document.createElement("div")
        remove.className = "remove"
        remove.textContent = "X"

        title.addEventListener("click", () => {
            _editText(title, stickyObject, "title")
        })

        description.addEventListener("click", () => {
            _editText(description, stickyObject, "description")
        })

        dueDate.addEventListener("click", () => {
            _editDueDate(dueDate, stickyObject, "dueDate")
        })

        notes.addEventListener("click", () => {
            _editText(notes, stickyObject, "notes")
        })

        isChecked.addEventListener("click", () => {
            stickyObject.toggleIsChecked()
            populateStickies(stickyNotes)
        })

        isPriority.addEventListener("click", () => {
            isPriority.classList.toggle("isNotPriority")
            stickyObject.toggleIsPriority()
        })

        remove.addEventListener("click", () => {
            _removeSticky(stickyObject)
            populateStickies(stickyNotes)
        })

        sticky.appendChild(title)
        sticky.appendChild(description)
        sticky.appendChild(dueDate)
        sticky.appendChild(isPriority)
        sticky.appendChild(notes)
        sticky.appendChild(isChecked)
        sticky.appendChild(remove)

        return sticky
    }

    const _addSticky = (title, description, dueDate, isPriority, notes, isChecked) => {
        const newSticky = new ToDo(title, description, dueDate, isPriority, notes, isChecked)
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

        for (let i = 0; i < stickyNotes.length; i++) {
            let curr = stickyNotes[i]

            if (!curr.isChecked) {
                newSticky.push(curr)
            }
        }

        if (newSticky.length < stickyNotes.length) {
            stickyNotes = newSticky
            populateStickies(stickyNotes)
        }
    }

    const _removeAllStickies = () => {
        while (_stickyContainer.hasChildNodes()) {
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

    const _createSideBarItem = (id, title, icon) => {
        const element = document.createElement("div")
        let faIcon = undefined;

        if(icon !== undefined){
            faIcon = document.createElement("i")
            faIcon.className = icon
            faIcon.id = id + "Icon"
        }

        const text = document.createElement("span")
        text.textContent = title
        text.id = id + "Text"

        if(faIcon !== undefined){
            element.appendChild(faIcon)
        }

        element.appendChild(text)
        element.className = "sideItem"

        return element
    }

    const _createSideBarDivider = title => {
        const element = document.createElement("div")

        element.id = "divider" + title
        element.className = "divier"

        return element
    }

    const _createSideBarCredit = () => {
        const credit = document.createElement("div")
        credit.id = "credit"
        credit.textContent = "Created by "
        const link = document.createElement("a")
        link.href = "http://mmboyce.github.io"
        link.textContent = "W Mathieu Mimms-Boyce"
        credit.appendChild(document.createElement("br"))
        credit.appendChild(link)
        credit.className = "sideItem"

        return credit
    }

    const loadSideBar = () => {
        const side = document.createElement("div")
        side.id = "sideBar"

        const addStickyButton = _createSideBarItem("addStickyButton", "Add To-Do", "fas fa-plus-circle")

        const  projects = _createSideBarItem("projects", "Projects", "fas fa-folder")

        const dividerClear = _createSideBarDivider("Clear")

        const clearChecks = _createSideBarItem("clearChecks", "Clear Checks", "fas fa-times-circle")

        const dividerSort = _createSideBarDivider("Sort")

        const sortPriority = _createSideBarItem("sortPriority", "Sort Priority", "fas fa-exclamation-circle")

        const sortChecked = _createSideBarItem("sortChecked", "Sort Checked", "fas fa-check-square")

        const dividerCredit = _createSideBarDivider("Credit")

        const credit = _createSideBarCredit()

        addStickyButton.addEventListener("click", () => {
            _addSticky("Title", "Description", new Date(), false, "Notes", false)
            populateStickies(stickyNotes)
        })

        clearChecks.addEventListener("click", () => {
            _removeChecks()
        })

        side.appendChild(addStickyButton)
        side.appendChild(projects)
        side.appendChild(dividerClear)
        side.appendChild(clearChecks)
        side.appendChild(dividerSort)
        side.appendChild(sortPriority)
        side.appendChild(sortChecked)
        side.appendChild(dividerCredit)
        side.appendChild(credit)

        return side
    }

    return { populateStickies, loadSideBar, stickyNotes }

})()

export default ToDoList