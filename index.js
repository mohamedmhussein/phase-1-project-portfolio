

// Clicking "about" subsection content (Skills, Experience, Education)
const tabLink = document.querySelectorAll(".tabLink")
tabLink.forEach(link => link.addEventListener("click",selectAboutSubSection))

// Fetching the services from the json server
fetch("http://localhost:3000/services")
.then(res => res.json())
.then(services => services.forEach(service =>{
    let serviceElement = document.createElement('div')
    serviceElement.className = "service"
    serviceElement.innerHTML = `
        <i class="${service.logo}"></i>
        <h2>${service.serviceName}</h2>
        <p>${service.summary}</p>
        <a href="#">${service.learn}</a>`
    document.querySelector('.servicesList').append(serviceElement)

} 
    
    ))


// ----------Functoins--------------
function selectAboutSubSection(event){
    //remove active class of all subsection
    tabLink.forEach(link => link.classList.remove("active"))

    //add active class only to the clicked subsection 
    event.target.classList.add("active")

    //remove active class from tabContent
    document.querySelectorAll('.tabContent').forEach(content => content.classList.remove("active"))
    
    //add active class to only the content that is tied to the clicked subsection
    document.querySelector(`#${event.target.textContent}`).classList.add("active")
}

