import mongoose from "mongoose";

//1--Create a schema
//2---Create a model based on schema

const noteSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true,

    },
},
    {timestamps:true} // created at or updated at timestamps automatically
)

const Note=mongoose.model("Note",noteSchema)

export default Note





