const express = require('express');
const fileUploader = require('express-fileupload');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const path = require('path');
const categories = require('./routes/categories');
const trees = require('./routes/trees');

const app = express();

process.env["NODE_CONFIG_DIR"] = __dirname + "/config";
const config = require('config');

//Load Data From Config File
const serverPort = config.get('port');
const connectionString = config.get('db.connectionString');
const shortsPrivateKey = config.get('shortsPrivateKey');
const publicUploadFolder = path.normalize(__dirname, "/../uploads")

//Check ENV are setup
if (!shortsPrivateKey) {
	console.error("FATEL ERROR: shortsPrivateKey is not set");
	process.exit(1);
}

//Connect to MongoDB
async function connect() {
	try {
		const connection = await mongoose.connect(connectionString)
		if (connection) console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Connection Failed", error)
	}
}
connect()

//Use Middleware
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader({ createParentPath: true }));
app.use('/uploads', express.static(publicUploadFolder));

//Routes
app.use('/api/categories', categories);
app.use('/api/trees', trees);

//Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Server started on port ${port}`); })