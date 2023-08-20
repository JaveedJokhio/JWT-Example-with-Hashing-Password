const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require('./middleware/authMiddleware');

const app = express();



// Middleware for parsing JSON data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser())
// Static files middleware
app.use(express.static('public'));


 

// View engine
app.set('view engine', 'ejs');

// Database connection

mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database!');
    app.listen(3000);
}).catch((err) => {
    console.error('Error connecting to database:', err);
});

// Routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies

