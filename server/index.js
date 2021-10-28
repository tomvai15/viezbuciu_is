const express = require('express');
const app = express();

const userRoute = require('./routes/admin')
app.use('/admin',userRoute)

app.listen(3001,()=>{
    console.log("running  on port 3001");
})