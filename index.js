

// Clicking "about" subsection content (Skills, Experience, Education)
const tabLink = document.querySelectorAll(".tabLink")
tabLink.forEach(link => link.addEventListener("click", selectAboutSubSection))

// Fetching the services from the json server
getAllServices()

//Submit form into db.json file
document.querySelector('form').addEventListener('submit', handleSubmit)

// ----------Functoins--------------

function selectAboutSubSection(event) {
    //remove active class of all subsection
    tabLink.forEach(link => link.classList.remove("active"))

    //add active class only to the clicked subsection 
    event.target.classList.add("active")

    //remove active class from tabContent
    document.querySelectorAll('.tabContent').forEach(content => content.classList.remove("active"))

    //add active class to only the content that is tied to the clicked subsection
    document.querySelector(`#${event.target.textContent}`).classList.add("active")

}

function getAllServices() {
    fetch("http://localhost:3000/services")
        .then(res => res.json())
        .then(services => services.forEach(service => getOneService(service)))
}

function getOneService(service) {
    let serviceElement = document.createElement('div')
    serviceElement.className = "service"
    serviceElement.innerHTML = `
        <i class="${service.logo}"></i>
        <h2>${service.serviceName}</h2>
        <p>${service.summary}</p>
        <a href="#">${service.learn}</a>`
    document.querySelector('.servicesList').append(serviceElement)
}

function handleSubmit(event) {
    event.preventDefault()
    let feedback = {
        name: event.target.name.value,
        email: event.target.email.value,
        message: event.target.message.value
    }
    postFeedback(feedback)
}

function postFeedback(feedback) {
    fetch("http://localhost:3000/feedback", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(feedback)
    })
        //showing "Message sent successfully" for few seconds after submitting the form
        .then(res => {
            let sent = document.querySelector('#sent')
            sent.textContent = "Message sent successully"
            setTimeout(function () {
                sent.textContent = ""
            }, 3000) // remove message after 3 seconds
            document.querySelector('form').reset() //resetting the form
        })
}