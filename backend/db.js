const mongoose=require('mongoose');



const  connectToMongo=async() =>{
  await mongoose.connect('mongodb://127.0.0.1:27017/inotebookDB');
  console.log("connected to mongodb")
  
}

module.exports = connectToMongo;