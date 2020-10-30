import express from 'express';
import router from './routes/api.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express();

app.use(bodyParser.json());
app.use(router);

mongoose.connect('mongodb+srv://abc1234:abc1234@cluster0.1og4m.mongodb.net/net-ninja?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(8080, () => {
    console.log('Running on port 8080');
});