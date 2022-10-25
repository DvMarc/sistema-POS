const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000

mongoose.connect(
    "mongodb+srv://admin:"+process.env.DB_PASSWORD+"@pos.ocxe5lt.mongodb.net/?retryWrites=true&w=majority"
).then( () => {
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
).catch( (err) => {
        console.log("No se conecto con exito");
    }
);

