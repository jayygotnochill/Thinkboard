import express from "express";
import { createNote,getAllnotes,updateNote,deleteNote,getNotebyId } from "../controller/notesController.js";


const router=express.Router();

router.get("/",getAllnotes)

router.post("/",createNote)

router.get("/:id",getNotebyId)

router.put("/:id",updateNote)

router.delete("/:id",deleteNote)


export default router