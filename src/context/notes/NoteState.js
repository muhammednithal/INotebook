import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000/api"
  
  const [notes, setnotes] = useState([]);


  //Fetch all notes
  const getNotes = async () => {
    
    //API call
   const response=await fetch (`${host}/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      "auth-token":localStorage.getItem('token')
    }
   })
   const json=await response.json()
 
  setnotes(json)

  };


  //add a note
  const addNote = async({ title, description, tag }) => {
    const response = await fetch(`${host}/notes/addnote`,{
      method:"POST",
      headers:{
        "auth-token":localStorage.getItem('token'),
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title, description, tag })
    })
    const json=await response.json()
   
    
    
    setnotes(notes.concat(json));
  };


  //edit a note
  const editNote =async (note) => {
    const {title,description, tag,id}=note
  // eslint-disable-next-line 
    const response = await fetch(`${host}/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "auth-token":localStorage.getItem('token'),
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,description, tag })
    })
   
    

    
  getNotes()
   
  };




  //delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    })
    // eslint-disable-next-line 
    const json=await response.json()
   
    const newarr = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newarr);
  };
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
