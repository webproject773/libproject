// This is the object where we keep the selected data
var selectedData = {};

// Functions

// Search
function search() {
    
    // Empty HTML card list 
    var cardList = document.getElementById("card-list");
    empty(cardList);

    // Get persons input value
    var getPersons = document.getElementById("persons-number").value;

    // Get data from server
    fetch('/data', {method: 'GET'})
        .then(res => res.json())
        .then(data =>{
            for (const element of data.list) {
                // If persons equals input number  
                if ((getPersons != "") && (getPersons == element.persons)) {
                    addCardElement(element);
                }
            }
        }
    );

}


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

    // Add click event
    newElement.addEventListener("click", function () {
        selectedData = element;
        addSelectedElement(selectedData);
    });

    // Add new element to card list
    document.getElementById("card-list").appendChild(newElement);

}

// Add Selected Element
function addSelectedElement(el) {
    
    // Reset HTML selected card
    var selectedCard = document.getElementById("selected-card");
    empty(selectedCard);

    // Create HTML card elements
    const title = document.createElement("p");
    title.innerHTML = el.title;

    const description = document.createElement("p");
    description.innerHTML = el.description;

    const hours = document.createElement("p");
    hours.innerHTML = "Hours: " + '<span id="hours" >' + el.hours + "</span>";

    const name = document.createElement("p");
    name.innerHTML = "Name: " + '<span id="name" >' + el.name + "</span>";

    const persons = document.createElement("p");
    persons.innerHTML = "Persons: " + el.persons;

    const editHoursButton = document.createElement("p");
    editHoursButton.classList = "editHoursBtn";
    editHoursButton.innerHTML = "Edit hours.";
    
    const editNameButton = document.createElement("p");
    editNameButton.classList = "editNameBtn";
    editNameButton.innerHTML = "Edit name.";

    const confirmButton = document.createElement("p");
    confirmButton.classList = "confirmBtn";
    confirmButton.innerHTML = "Confirm.";

    const deleteButton = document.createElement("p");
    deleteButton.classList = "deleteBtn";
    deleteButton.innerHTML = "Delete.";

    // Edit Hours Button
    editHoursButton.addEventListener("click", function () {
        document.getElementById("hours").innerHTML = '<input type="text" id="changeHoursValue" /> <span id="changeHoursBtn">Ok</span>';
        
        const changeHoursBtn = document.getElementById("changeHoursBtn"); 
        
        changeHoursBtn.addEventListener("click", function () {
            const hoursValue = document.getElementById("changeHoursValue").value;
            
            selectedData["hours"] = hoursValue;
            document.getElementById("hours").innerHTML = hoursValue;
            
        }); 
    });

    // Edit Name Button
    editNameButton.addEventListener("click", function () {
        document.getElementById("name").innerHTML = '<input type="text" id="changeNameValue" /> <span id="changeNameBtn">Ok</span>';
        const changeNameBtn = document.getElementById("changeNameBtn"); 

        changeNameBtn.addEventListener("click", function () {
            const name = document.getElementById("changeNameValue").value;
            
            selectedData["name"] = name;
            document.getElementById("name").innerHTML = name;
            
        }); 
    });

    // Delete Button
    deleteButton.addEventListener("click", function () {
        deleteSelectedElement();
    });

    // Confirm Button
    confirmButton.addEventListener("click", function() {
        
        // Add seleced data on server
        fetch('/add', {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(selectedData)
        })

        // Page redirect to confirm.html
        window.location.href = "./confirm.html";
        
    });

    // Add HTML created elements to selected card 
    selectedCard.appendChild(title);
    selectedCard.appendChild(description);
    selectedCard.appendChild(hours);
    selectedCard.appendChild(name);
    selectedCard.appendChild(persons);
    selectedCard.appendChild(deleteButton);
    selectedCard.appendChild(editHoursButton);
    selectedCard.appendChild(editNameButton);
    selectedCard.appendChild(confirmButton);
    
}

// Delete Selected Element
function deleteSelectedElement() {
    // Reset data
    selectedData = {};
    
    // Reset data on server
    fetch('/delete', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
    });

    // Empty HTML selected card
    var selectedCard = document.getElementById("selected-card");
    empty(selectedCard);
    
    // Add HTML message when the card is not selected 
    const title = document.createElement("p");
    title.innerHTML = "Select your card.";
    selectedCard.appendChild(title);
}

// Empty HTML element
function empty(element) {
    while (element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

