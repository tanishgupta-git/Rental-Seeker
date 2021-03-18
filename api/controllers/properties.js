const properties = [
    {     id : 1,
          imageUrl:"https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg", 
          title:"George House Norway",
          price:"4000",
          rating:"4.2"
    },
    {    id: 2,
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
