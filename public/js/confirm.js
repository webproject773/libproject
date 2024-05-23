
window.addEventListener("load", function() {
    
    // Get selected data from server
    fetch('/data', {method: 'GET'})
        .then(res => res.json())
        .then(data =>{
            for (const element of data.selected) {
                addConfirmCard(element);
            }
        });


        
    
});

function addConfirmCard(el) {
    
    var confirmCard = document.getElementById("confirm-card");
    empty(confirmCard);

    const title = document.createElement("p");
    title.innerHTML = el.title;

    const description = document.createElement("p");
    description.innerHTML = el.description;

    const hours = document.createElement("p");
    hours.innerHTML = "Hours: " + el.hours;

    const name = document.createElement("p");
    name.innerHTML = "Name: " + el.name;

    const persons = document.createElement("p");
    persons.innerHTML = "Persons: " + el.persons;

    const deleteButton = document.createElement("p");
    deleteButton.classList = "deleteBtn";
    deleteButton.innerHTML = "Delete";

    // Delete button
    deleteButton.addEventListener("click", function() {
        
        // Delete confirm card on server
        deleteConfirmCard();
        
        // Empty HTML confirm card
        empty(confirmCard);
        
        // Create delete message
        const deleteCardMessage = document.createElement("p");
        deleteCardMessage.innerHTML = "Your reservation has been deleted";
        
        // Show delete message
        confirmCard.appendChild(deleteCardMessage);

    });

    confirmCard.appendChild(title);
    confirmCard.appendChild(description);
    confirmCard.appendChild(hours);
    confirmCard.appendChild(name);
    confirmCard.appendChild(persons);
    confirmCard.appendChild(deleteButton);


    fetch('/delete', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
    });

}

// Empty element
function empty(element) {
    while (element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

// Delete confirm card on server
function deleteConfirmCard() {
    fetch('/deleteReservation', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
    });

}