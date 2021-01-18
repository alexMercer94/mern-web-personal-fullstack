const mongoose = require('mongoose');
const app = require('./app');
const SERVER_PORT = process.env.PORT || 3000;
const { API_VERSION, IP_SERVER, PORT_DB } = require('./config');

mongoose.set('useFindAndModify', false);
mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/personalweb`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('DB is connected');
            app.listen(SERVER_PORT, () => {
                console.log('Server started');
                console.log(`http://${IP_SERVER}:${SERVER_PORT}/api/${API_VERSION}/`);
            });
        }
    }
);
