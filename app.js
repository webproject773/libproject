const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

// Parse body request before use 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./public/index.html');
});

// Get data from json file
app.get('/data', (req, res) => {
    const file = fs.readFileSync('./data.json', 'UTF-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

// Add selected data to json file
app.post('/add', (req, res) =>{
    res.setHeader('Content-type', 'text/plain');
    
    const title = req.body.title;
    const description = req.body.description;
    const hours = req.body.hours;
    const name = req.body.name;
    const persons = req.body.persons;

    // Read json file
    let file = fs.readFileSync('./data.json', 'UTF-8');

    // Convert json into an object
    const json = JSON.parse(file);

    // Add selected data
    json.selected.push({"title": title, "description": description, "hours": parseInt(hours), "name": name, "persons": parseInt(persons)});
    json.reserved.push({"title": title, "description": description, "hours": parseInt(hours), "name": name, "persons": parseInt(persons)});

    var reservedHours = 0;
    
    for (const element of json.reserved) {
        if (element.title == json.selected[0].title) {        
            reservedHours += element.hours; 
        } 
    }
        
    if (reservedHours >= 14) {
        var newList = json.list.filter(el => el.title != json.selected[0].title); 
        json.list = newList;
    }

    // Save json file
    file = fs.writeFileSync('./data.json', JSON.stringify(json));

});

// Remove data
app.post('/delete', (req, res) =>{
    
    res.setHeader('Content-type', 'text/plain');
    
    let file = fs.readFileSync('./data.json', 'UTF-8');
    const json = JSON.parse(file);

    // Empty selected data
    while (json.selected.length > 0) {
        json.selected.pop();
    }
      
    // Save json file
    file = fs.writeFileSync('./data.json', JSON.stringify(json));
    
});

app.post('/deleteReservation', (req, res) =>{
    
    res.setHeader('Content-type', 'text/plain');
    
    let file = fs.readFileSync('./data.json', 'UTF-8');
    const json = JSON.parse(file);

    // Delete last reservation
    json.reserved.pop();
      
    // Save json file
    file = fs.writeFileSync('./data.json', JSON.stringify(json));
    
});

app.listen(3000, () => {
    console.log('App listenig on port 3000');
});