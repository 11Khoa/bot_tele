var mongoose=require('mongoose');
const addkeySchema= new mongoose.Schema({
    key:String,
})

module.exports = mongoose.model("addkey", addkeySchema);