const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Route 1:get all the notes using :get /api/aut/fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//Route 2:Add a new notes using :psot /api/aut/addnotes login required
router.post('/addnotes', fetchuser, [
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','discription must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        
   
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes=new Notes({
          title,description,tag,user:req.user.id
    })
    const saveNote=await notes.save();
    res.json(saveNote);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//Route 3:Update a notes using :put /api/aut/update login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;
    try {
   
    //create newnote object
    const newnote={};
    if(title){
        newnote.title=title;
    }
    if(description){
        newnote.description=description;
    } 
    if(tag){
        newnote.tag=tag;
    }



    //find the note to be updated and update it
    let note= await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}
   
    if(note.user.toString()!==req.user.id){
        res.status(404).send("Not Allowed");
    }

    console.log("newnote : ", newnote)
    note =await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    console.log("note", note)
    res.send({note});
         
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//Route 4:Delete a notes using :Delete /api/aut/delete login required
router.delete('/delete/:id', fetchuser, async (req, res) => {
    const {title,discription,tag}=req.body;
    
    try {
        
   
    //find the note to be deleted and delete it
    let note= await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}
    
    //allow deletion only if user owens this notes
    if(note.user.toString()!==req.user.id){
        res.status(404).send("Not Allowed");
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.send({"Success": "Note has been deleted", note : note});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})
module.exports = router;