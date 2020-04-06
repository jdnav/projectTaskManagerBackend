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
        console.log('database connected.');

    } catch (error) {
        console.log('Could not connect to database');
        console.log(error);
        process.exit(1);    // In case of error, stop app
    }

}

module.exports = connectDB;