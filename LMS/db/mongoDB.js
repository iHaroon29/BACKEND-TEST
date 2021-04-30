const mongoose=require("mongoose");


mongoose.connect('mongodb://localhost:/digital_aided_school_lms', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((data)=>{
        console.log("connected");

    })
    .catch((err)=>{
        console.error('===============================================================');
        console.error('DB Not Connected');
        console.error('===============================================================');

    });


module.exports=mongoose;

