const Host = require('../models/host');
module.exports =async (req,res,next) => {
    let host;
    try {
    host = await Host.findById(req.userId);
    }catch (err){
        err.statusCode = 500;
        throw err;
       }
   if(!host) {
    const error = new Error('Not Host Account Find');
    error.statusCode = 401;
    throw error       
   }
   next();
}