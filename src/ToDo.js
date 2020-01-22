import { format } from 'date-fns'

const ToDoList = (function () {

    // Storage Function
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

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
    }

    let projects = []
    let _stickyNotes = []
    const _stickyContainer = document.createElement("div")
    _stickyContainer.id = "container"

    const _NO_DUE_DATE = "No Due Date"

    const _defaultSticky = new ToDo(
        "To-Do List!",
        "Check out my notes to see how to make a sticky note!",
        new Date(),
        true,
        "You can click on any part of a post it to edit it! Just hit enter to save :)",
        false
    )


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

        const isPriorityIcon = document.createElement("i")
        isPriorityIcon.className = "fas fa-exclamation-circle"

        if (!isPriority) {
            isPriorityElement.classList.add("isNotPriority")
        }

        isPriorityElement.appendChild(isPriorityIcon)

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

        if (isChecked) {
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
            if (_checkInput(e)) {
                if (!_isEmpty(input)) {
                    element.textContent = input.value
                    parent.replaceChild(element, input)

                    stickyObject[property] = element.textContent
                } else {
                    element.textContent = `No ${property}`
                    parent.replaceChild(element, input)

                    stickyObject[property] = element.textContent
                }

                populateStickies(_stickyNotes)
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
            if (_checkInput(e)) {
                if (!_isEmpty(input)) {
                    const newDate = _parseDate(input.value)
                    element.textContent = "Due: " + _formatDueDate(newDate)
                    parent.replaceChild(element, input)

                    stickyObject[property] = newDate
                } else {
                    element.textContent = _NO_DUE_DATE
                    parent.replaceChild(element, input)

                    stickyObject[property] = _NO_DUE_DATE
                }

                populateStickies(_stickyNotes)
            }
        }

        parent.replaceChild(input, element)

        // focus on element, places cursor right into the input 
        document.getElementById(id).focus()
    }

    const _createRemove = () => {
        const remove = document.createElement("div")

        remove.className = "remove"
        const icon = document.createElement("i")
        icon.className = "fas fa-window-close"

        remove.appendChild(icon)

        return remove
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

        const remove = _createRemove()

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
            populateStickies(_stickyNotes)
        })

        isPriority.addEventListener("click", () => {
            isPriority.classList.toggle("isNotPriority")
            stickyObject.toggleIsPriority()
            populateStickies(_stickyNotes)
        })

        remove.addEventListener("click", () => {
            _removeSticky(stickyObject)
            populateStickies(_stickyNotes)
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
        _stickyNotes.push(newSticky)

        populateStickies(_stickyNotes)
    }

    const _removeSticky = sticky => {
        for (let i = 0; i < _stickyNotes.length; i++) {
            if (_stickyNotes[i] === sticky) {
                _stickyNotes.splice(i, 1)
                return
            }
        }
    }

    const _removeChecks = () => {
        let newSticky = []

        for (let i = 0; i < _stickyNotes.length; i++) {
            let curr = _stickyNotes[i]

            if (!curr.isChecked) {
                newSticky.push(curr)
            }
        }

        if (newSticky.length < _stickyNotes.length) {
            _stickyNotes = newSticky
            populateStickies(_stickyNotes)
        }
    }

    const _removeAllStickies = () => {
        while (_stickyContainer.hasChildNodes()) {
            _stickyContainer.removeChild(_stickyContainer.firstChild)
        }
    }

    const _populateStorage = () => {
        localStorage.clear()

        for (let i = 0; i < projects.length; i++) {
            localStorage.setItem(i, JSON.stringify(projects[i]))
            console.log('stored' + JSON.stringify(projects[i]))
        }
    }

    const populateStickies = (stickies) => {
        _removeAllStickies()

        if (stickies === undefined) {
            _stickyNotes = [_defaultSticky]
            stickies = _stickyNotes
            _addProject("Default", stickies)
        } else {
            _stickyNotes = stickies
        }

        for (let i = 0; i < stickies.length; i++) {
            const sticky = _createSticky(stickies[i])
            _stickyContainer.appendChild(sticky)
        }

        if (storageAvailable('localStorage')) {
            _populateStorage()
        }

        return _stickyContainer
    }

    const populateProjectsFromStorage = (storedProjects) => {
        projects = storedProjects;

        // Create all stored stickies as new Todo objects to maintain the
        // methods.
        for (let i = 0; i < projects.length; i++) {
            let stickyNotes = projects[i].stickies
            console.log('i')
            for (let j = 0; j < stickyNotes.length; j++) {
                let currSticky = stickyNotes[j]
                console.log('j')
                stickyNotes[j] = new ToDo(
                    currSticky.title,
                    currSticky.description,
                    currSticky.dueDate,
                    currSticky.isPriority,
                    currSticky.notes,
                    currSticky.isChecked
                )
            }
        }

        return populateStickies(projects[0].stickies)
    }

    const _createSideBarItem = (id, title, icon) => {
        const element = document.createElement("div")
        let faIcon = undefined;

        if (icon !== undefined) {
            faIcon = document.createElement("i")
            faIcon.className = icon
            faIcon.id = id + "Icon"
        }

        const text = document.createElement("span")
        text.textContent = title
        text.id = id + "Text"

        if (faIcon !== undefined) {
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

    const _addProject = (title, stickies) => {
        projects.push({ title: title, stickies: stickies })
    }

    const _removeProject = (project) => {
        let newProjects = []

        for (let i = 0; i < projects.length; i++) {
            if (project !== projects[i]) {
                newProjects.push(projects[i])
            }
        }

        projects = newProjects
    }

    const _loadInProjects = window => {
        const parent = window.parentNode

        const close = document.createElement("i")
        close.className = "fas fa-window-close"
        close.id = "closeProjects"

        const projectsContainer = document.createElement("div")
        projectsContainer.id = "projectsContainer"

        for (let i = 0; i < projects.length; i++) {
            const projectElement = document.createElement("div")
            const projectElementText = document.createElement("span")
            projectElement.className = "project"

            const title = projects[i].title
            const truncTitle = title.length > 25 ? title.substring(0, 20) + "..." : title

            projectElementText.textContent = truncTitle

            const projectElementIcon = document.createElement("i")
            projectElementIcon.className = "fas fa-trash"

            projectElement.addEventListener("click", () => {
                populateStickies(projects[i].stickies)
                _stickyNotes = projects[i].stickies
            })

            projectElementIcon.addEventListener("click", () => {
                _removeProject(projects[i])
                document.body.removeChild(parent)
                _openProjectsWindow()
            })

            projectElement.appendChild(projectElementText)
            projectElement.appendChild(projectElementIcon)
            projectsContainer.appendChild(projectElement)
        }

        if (projects.length == 0) {
            _addProject("Default", [_defaultSticky])
        }

        const newProjectElement = document.createElement("div")
        newProjectElement.className = "newProject"
        const newProjectIcon = document.createElement("i")
        newProjectIcon.className = "fas fa-plus"
        const newProjectText = document.createElement("span")
        newProjectText.textContent = "New Project"

        close.addEventListener("click", () => {
            document.body.removeChild(parent)
        })

        newProjectElement.addEventListener("click", () => {
            const input = document.createElement("input")
            input.type = "text"
            input.placeholder = "Enter your title!"
            input.id = "newProjectId"

            input.onkeypress = function (e) {
                // if user hits enter
                if (_checkInput(e) && !_isEmpty(input)) {
                    _addProject(input.value, [])

                    let newProject = projects[projects.length - 1]
                    _stickyNotes = newProject.stickies

                    document.body.removeChild(parent)
                    populateStickies(_stickyNotes)
                }

                // do nothing if it's empty :/
            }

            projectsContainer.replaceChild(input, newProjectElement)

            document.getElementById(input.id).focus()
        })

        newProjectElement.appendChild(newProjectIcon)
        newProjectElement.appendChild(newProjectText)
        projectsContainer.appendChild(newProjectElement)

        window.appendChild(close)
        window.appendChild(projectsContainer)
    }

    const _openProjectsWindow = () => {
        const projectsOverlay = document.createElement("div")
        projectsOverlay.id = "projectsOverlay"

        const projectsWindow = document.createElement("div")
        projectsWindow.id = "projectsWindow"

        projectsOverlay.appendChild(projectsWindow)

        _loadInProjects(projectsWindow)

        document.body.appendChild(projectsOverlay)
    }

    const _sortPriority = (stickies) => {
        return stickies.sort((a, b) => {
            // sooner and priority gets higher placement
            if (a.isPriority && !b.isPriority) {
                return -1
            } else if (!a.isPriority && b.isPriority) {
                return 1
            }

            // if both are priority, or neither, sort by sooner date
            return a.dueDate.getTime() > b.dueDate.getTime()
        })
    }

    const _sortChecked = (stickies) => {
        const now = new Date()

        return stickies.sort((a, b) => {
            // further and checked gets higher placement
            if (a.isChecked && !b.isChecked) {
                return -1
            } else if (!a.isChecked && b.isChecked) {
                return 1
            }

            // if both are done, or neither, sort by furthes date from now
            return (now.getTime() - a.dueDate.getTime()) < (
                now.getTime() - b.dueDate.getTime())
        })
    }

    const loadSideBar = () => {
        const side = document.createElement("div")
        side.id = "sideBar"

        const addStickyButton = _createSideBarItem("addStickyButton", "Add To-Do", "fas fa-plus-circle")

        const projects = _createSideBarItem("projects", "Projects", "fas fa-folder")

        const dividerClear = _createSideBarDivider("Clear")

        const clearChecks = _createSideBarItem("clearChecks", "Clear Checked", "fas fa-times-circle")

        const dividerSort = _createSideBarDivider("Sort")

        const sortPriority = _createSideBarItem("sortPriority", "Sort Priority", "fas fa-exclamation-circle")

        const sortChecked = _createSideBarItem("sortChecked", "Sort Checked", "fas fa-check-square")

        const dividerCredit = _createSideBarDivider("Credit")

        const credit = _createSideBarCredit()

        addStickyButton.addEventListener("click", () => {
            _addSticky("Title", "Description", new Date(), false, "Notes", false)
            populateStickies(_stickyNotes)
        })

        clearChecks.addEventListener("click", () => {
            _removeChecks()
        })

        projects.addEventListener("click", () => {
            _openProjectsWindow()
        })

        sortPriority.addEventListener("click", () => {
            const sorted = _sortPriority(_stickyNotes)
            populateStickies(sorted)
        })

        sortChecked.addEventListener("click", () => {
            const sorted = _sortChecked(_stickyNotes)
            populateStickies(sorted)
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

    return { populateProjectsFromStorage, populateStickies, loadSideBar, projects, storageAvailable }

})()

export default ToDoList