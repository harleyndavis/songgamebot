const mongoose = require('mongoose');
const { mongoURI } = require('./config.json');

const connectDB = () => {
    try {
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Failed To Connect ...');
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
