const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3002;
app.set('views', './views');
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded and JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.set()

// Serve static files
app.use(express.static('public'))
app.use(express.static('scripts'));

// MongoDB database connection
const url = 'mongodb://localhost:27017';
const dbName = 'sih';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        console.log('Connected to MongoDB database.');
        db = client.db(dbName);
    })
    .catch((err) => {
        console.error('Database connection failed:', err.stack);
    });

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.render( 'desktop');
});

// Routes for serving HTML files
app.get('/signin', (req, res) => {
    res.render( 'new_file');
});

app.get('/dashboard', (req, res) => {
    res.render( 'Dashboard');
});

app.get('/events', (req, res) => {
    res.render( 'events');
});

app.get('/donationportal', (req, res) => {
    res.render( 'donationportal');
});

app.get('/signup', (req, res) => {
    res.render( 'sign_up');
});

app.get('/feedback', (req, res) => {
    res.render( 'feedback');
});

app.get('/alumnidirectory', (req, res) => {
    res.render( 'directory');
});

app.get('/networking', (req, res) => {
    res.render( 'networking');
});

app.get('/profile', (req, res) => {
    res.render( 'profile');
});

app.get('/logout', (req, res) => {
    res.render( 'desktop');
});

app.get('/complete-profile', (req, res) => {
    res.render( 'complete-profile');
});

app.get('/successstory', (req, res) => {
    res.render( 'success_story');
});

app.get('/jobportal', (req, res) => {
    res.render( 'job_portal');
});

// Handle form submission from the contact page
app.post('/contact', async (req, res) => {
    const { full_name, email, message } = req.body;

    try {
        const result = await db.collection('contactus').insertOne({ name: full_name, email, message });
        res.send('Thank you for contacting us!');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal server error. Please try again later.');
    }
});

// Handle event creation form submission
app.post('/Event', async (req, res) => {
    const { full_name, date, time, venue, description } = req.body;

    try {
        const result = await db.collection('events').insertOne({
            event_name: full_name,
            event_date: new Date(date), // Convert to a Date object
            event_time: time,
            venue,
            description,
        });
        res.json({ success: true, event_date: date });
    } catch (err) {
        console.error('Error inserting event data:', err);
        res.json({ success: false, message: 'Failed to create event' });
    }
});

// Handle login request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection('AlumniUsers').findOne({ Username: username, Pass: password });

        if (user) {
            res.render( 'Dashboard');
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal server error. Please try again later.');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
