const express = require('express');
//const path = require('path');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');
//const databaseURL = 'mongodb+srv://prat:root@cluster0.97zl4br.mongodb.net/userinfo?retryWrites=true&w=majority';
const userRouter = require('./routes/Users');

// mongoose.connect(databaseURL)
//     .then(() => console.log("Success."))
//     .catch((err) => console.error(err));

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(userRouter);

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});

