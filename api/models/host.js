const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema({
    username:{
     type:String,
     require:true
    },
    fullname : {
        type:String,
        default:""
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        default:""
    },
    properties : [
        {
            type:Schema.Types.ObjectId,
            ref:'Property'
        }
    ]
})

module.exports = mongoose.model('Host', hostSchema);
