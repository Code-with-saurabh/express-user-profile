const mongoose = require('mongoose');

const MongooseURL="mongodb+srv://gpgazhmrj:NiIAmKaqmT6CxKrz@cluster0.rdhlq.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MongooseURL);

const schema = mongoose.Schema({
	email:String,
	name:String,
	imgurl:String,
});

module.exports = mongoose.model("Form",schema);