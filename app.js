const express = require('express');
const path = require('path');
const dao = require('./dao');
require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/viewBill', dao.viewBill);
app.post('/viewUsage', dao.viewUsage);
app.post('/payBill', dao.payBill);
app.post('/viewUserInfo', dao.viewUserInfo);
app.post('/register', dao.registerUser);
app.post('/deleteUser', dao.deleteUser);
app.get('/viewAllUsers', dao.viewAllUsers);
app.post('/upgrade', dao.upgrade);
app.post('/downgrade', dao.downgrade);
app.post('/parentalControls', dao.toggleParentalControls);
app.post('/setViewingPrefs', dao.setViewingPrefs);
app.post('/setInterests', dao.setInterests);
app.post('/viewInterests', dao.viewInterests);
app.post('/viewPrefs', dao.viewPrefs);
app.post('/viewOutage', dao.viewOutage);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Telecom' });
});

module.exports = app;
