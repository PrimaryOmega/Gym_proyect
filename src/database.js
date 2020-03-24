const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/GYM_DB', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('Conexion sastifactoria'))
.catch(err => console.error(err));