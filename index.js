require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// --------------env ----------------------------
const port = process.env.PORT;
// ----------------Module import-----------------
const { databaseConnection } = require('./src/database/connection.database');
const userRoute = require('./src/routes/user.routes');
const errorMiddleware = require('./src/middlewares/error.middleware');


// -----------------initializer------------------
app.use(express.json());
app.use(cors());


//-----------------Module route------------------
app.use('/auth', userRoute, errorMiddleware);
//------------------server------------------------
app.listen(port, () => {
    console.log(`=================================`);
    databaseConnection();
    console.log(`Database on Running`);
    console.log(`=================================`);
    console.log(`🚀 App listening on the port ${port} Link : http://localhost:${port}`);
    console.log(`=================================`);
})