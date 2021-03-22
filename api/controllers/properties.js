const Property = require('../models/property');
const properties = [
    {     id : 1,
          imageUrl:"https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg", 
          title:"George House Norway",
          price:"4000",
          rating:"4.2"
    },
    {     id: 2,
          imageUrl:"https://cdn.pixabay.com/photo/2016/01/19/17/08/vintage-1149558_1280.jpg",
          title:"Mac Sweet Home",
          price:"3500",
          rating:"4.0"
    }
]
exports.getProperties = (req,res,next) => {
    res.status(200).json({
        message : 'Fetched Succesfully',
        properties:properties
    })
}
exports.getProperty = (req,res,next) => {
    const propertyId = req.params.propertyId;
    const property = properties.filter( property => property.id === Number(propertyId));
    res.status(200).json({
        message : 'fetched Successfully',
        property : property
    })
}

exports.addProperty = async (req,res,next) => {
    console.log(req.body);
    const property = new Property({
        title : req.body.title,
        imageUrl : req.body.imageUrl,
        description : req.body.description,
        price : req.body.price
    });
   try {
   await property.save();
   res.status(200).json({
       message : 'Added Property'
   }) }
   catch (err) {
       console.log(err);
   }
}