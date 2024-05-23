
window.addEventListener("load", function() {
    
    // Get selected data from server
    fetch('/data', {method: 'GET'})
        .then(res => res.json())
        .then(data =>{
            for (const element of data.reserved) {
                addCardElement(element);
                console.log(element);
            }
        }
    );

    // Add HTML card element to card list
    function addCardElement(element) {
        
        // Create HTML element
        const newElement = document.createElement("div");
        newElement.classList = "card";

        const title = document.createElement("p");
        title.innerHTML = element.title;

        const description = document.createElement("p");
        description.innerHTML = element.description;

        const hours = document.createElement("p");
        hours.innerHTML = "Hours: " + element.hours;

        const name = document.createElement("p");
        name.innerHTML = "Name: " + element.name;

        const persons = document.createElement("p");
        persons.innerHTML = "Persons: " + element.persons;

        // Add created HTML element to the parent div element 
        newElement.appendChild(title);
        newElement.appendChild(description);
        newElement.appendChild(hours);
        newElement.appendChild(name);
        newElement.appendChild(persons);

        // Add new element to card list
        document.getElementById("card-list").appendChild(newElement);

    }


    
});
