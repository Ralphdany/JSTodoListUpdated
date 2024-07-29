const bg = document.querySelector('[data-background]');
const toggle_theme_button = document.querySelector('[data-toggle-theme]')
const checkbox = document.querySelector('[data-check]')
const input = document.querySelector('[data-input]')
const total_todos = document.querySelector('[data-items]')
const complete_todos = document.querySelector('[data-completed]')
const all_todos = document.querySelector('[data-all]')
const wrapper = document.querySelector('.wrapper')
const active_todos = document.querySelector('[data-active]')
const clear_todos = document.querySelector('[data-clear]')
const body = document.getElementById('body')
const main_content = document.querySelector(".main-section")
const todos = document.querySelector('[data-todos]')
toggle_theme_button.addEventListener('click', () => {
    let source = toggle_theme_button.getAttribute('src')
      const todos = document.querySelector('[data-todos]')
    if (source === "images/icon-moon.svg") {
          bg.style.backgroundImage = "url('images/bg-desktop-dark.jpg')"
          toggle_theme_button.setAttribute('src', "images/icon-sun.svg")
          body.style.backgroundColor = 'black'
          todos.classList.add('dark')
          input.classList.add('dark')
          Array.from(todos.children).forEach(element => {
            element.classList.add('dark')
          })
          document.querySelector('.todo').classList.add('dark')
          document.querySelector('.filter-content').classList.add('dark')    
    }
 
    else if (source === 'images/icon-sun.svg'){
        bg.style.background = "url('images/bg-desktop-light.jpg')"
        toggle_theme_button.setAttribute('src', 'images/icon-moon.svg')
        document.body.style.backgroundColor = 'white'
        todos.classList.remove('dark')
        input.classList.remove('dark')
        document.querySelector('.todo').classList.remove('dark')
        document.querySelector('.filter-content').classList.remove('dark')
        Array.from(todos.children).forEach(element => {
            element.classList.remove('dark')
          })
        
    }
})


checkbox.addEventListener('click', () => {
    let value = input.value
    const todos = document.querySelector('[data-todos]')
    if (value === "" && checkbox.checked) {
        alert('Enter something first')
    }
    else if (checkbox.checked) {
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.setAttribute('src', 'images/icon-cross.svg')
        li.classList.add('todo')
        li.innerHTML = value
        todos.appendChild(li)
        li.appendChild(img)
    }
    
    updateItemsNumber()
    input.value = ""
})

todos.addEventListener("click", function(e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        
    }
    else if (e.target.tagName === "IMG") {
        e.target.parentElement.remove()
    }

    updateItemsNumber()
})
 
 function updateItemsNumber () {

    const todo = document.querySelectorAll('.todo')
    const todos = document.querySelector('[data-todos]')
    let itemsNumber = Array.from(todos.children).filter(li => li.classList.contains('checked')).length
    total_todos.innerHTML = `${todo.length - itemsNumber} items left` 
 }



clear_todos.addEventListener('click', () => {
    const todos = document.querySelector('[data-todos]')
    let itemsNumber = Array.from(todos.children).filter(li => li.classList.contains('checked'))
    itemsNumber.forEach(item => {
        todos.removeChild(item)
    })
    updateItemsNumber()
})

complete_todos.addEventListener('click', () => {
    let itemsNumber = Array.from(todos.children).filter(li => (li.classList.contains('checked')))
    if (itemsNumber.length > 0) {
        const newContent = document.createElement('ul')
        newContent.classList.add('todos')
        itemsNumber.forEach(element => {
            newContent.appendChild(element)
        })
        wrapper.replaceChildren(newContent)
    }
    else {
        return
    }
  
    updateItemsNumber()
})

active_todos.addEventListener('click', () => {
    let itemsNumber = Array.from(todos.children).filter(li => !(li.classList.contains('checked')))
    if(itemsNumber.length > 0) {

        const newContent = document.createElement('ul')
        newContent.classList.add('todos')
        itemsNumber.forEach(element => {
            newContent.appendChild(element)
        })
        wrapper.replaceChildren(newContent)
    }
    else {
        return
    }
    updateItemsNumber()
})

all_todos.addEventListener('click', () => {
    wrapper.firstChild.replaceChildren(todos)
})

updateItemsNumber()

//  function saveData () {
//     localStorage.setItem('data', todos.innerHTML)
//  }
//  function showTask () {
//    todos.innerHTML = localStorage.getItem('data')  
//  }
//  showTask()