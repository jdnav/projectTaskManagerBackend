const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        console.log('Database connected!');

    } catch (error) {
        console.log('Could not connect to database');
        console.log(error);
        process.exit(1);    // In case of error, stop app
    }

}

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongoPTR:<password>@clusterptm-ja7bx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/

module.exports = connectDB;