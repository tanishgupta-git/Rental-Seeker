const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        imageUrl: {
          type: String,
          required: true
        },
        price:{
         type:Number,
         required:true
        },
        description: {
          type: String,
          required: true
        },
        location: {
          type : String,
          require:true
        },
        rating : {
           type : Number,
           default : 0
        },
        host : {
          type:Schema.Types.ObjectId,
          ref:'Host',
          required:true
        }
      },
      { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);