const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

// Set Handlebars as the template engine
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    // Render the 'home' Handlebars template
    res.render('home', { title: 'Home' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
