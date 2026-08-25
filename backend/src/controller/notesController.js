import Note from "../../models/note.js";

export const getAllnotes=async(req,res)=>{
    try {
        const notes=await Note.find().sort({createdAt:-1}); // createdAt:-1 means show the latest one
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

export const createNote=async(req,res)=>{
    try {
        const {title,content}=req.body
        const newNote = new Note({title,content})

        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

export const getNotebyId=async(req,res)=>{
    try {
        const note=await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found"})

        res.status(200).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

export const updateNote=async(req,res)=>{
    try {
        const {title,content}=req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content})
        if(!updatedNote) return req.status(404).json({message:"Note couldnt found"})

        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

export const deleteNote=async(req,res)=>{
   try {
    const deletedNote=await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note not found"})

    res.status(200).json({message : "Note deleted succesfully"})    
   } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
   }
}