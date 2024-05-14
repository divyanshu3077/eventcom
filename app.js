const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyparser =require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/eventcontacts');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });

  const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 // ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('index.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
    res.send("this item is saved to database")
}).catch(()=>{
  res.status(400).send("item was not saved to datatbase")

});
    
    // res.status(200).render('contact.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});