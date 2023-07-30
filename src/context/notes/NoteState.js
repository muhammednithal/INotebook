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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNmQ4ZjYwODZiMDc0Yzk2OTFjMjM2In0sImlhdCI6MTY4OTczOTYwNn0.d_2iBD6BWGr6XIpY7-UlLu4aFVcgPKcTZ3YfH17ZVA0"
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNmQ4ZjYwODZiMDc0Yzk2OTFjMjM2In0sImlhdCI6MTY4OTczOTYwNn0.d_2iBD6BWGr6XIpY7-UlLu4aFVcgPKcTZ3YfH17ZVA0",
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNmQ4ZjYwODZiMDc0Yzk2OTFjMjM2In0sImlhdCI6MTY4OTczOTYwNn0.d_2iBD6BWGr6XIpY7-UlLu4aFVcgPKcTZ3YfH17ZVA0",
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNmQ4ZjYwODZiMDc0Yzk2OTFjMjM2In0sImlhdCI6MTY4OTczOTYwNn0.d_2iBD6BWGr6XIpY7-UlLu4aFVcgPKcTZ3YfH17ZVA0"
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
