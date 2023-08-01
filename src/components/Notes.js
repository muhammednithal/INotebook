import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
  const [input, setinput] = useState({
    title: "",
    description: "",
    tag: "default",
    id:null
  });
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }else
    {
      navigate("/login")
    }
      
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);  
  const refclose = useRef(null);
  const updateNote = (currentNote) => {
    console.log(currentNote._id);
    ref.current.click();
    setinput({
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
      id:currentNote._id
  });
  };
  const handleonclick = (e) => {
  refclose.current.click()
     editNote(input)
     props.showalert("success","updated successfully")
  };
  const handleonchange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showalert={props.showalert} />

      <button
        type="button"
        className="btn btn-primary d-none "
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        t
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* add the add note boilerplate */}
              <div>
                <div className="container my-3">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        onChange={handleonchange}
                        value={input.title}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={input.tag}
                        onChange={handleonchange}
                      />
                    </div>
              
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button disabled={input.title.length<3||input.description.length<5} type="button" onClick={handleonclick} className="btn btn-primary">
                Edit note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 ">
        {notes.length===0 && <div className="container mx-3">no notes to display</div>}
        {notes.map((note) => {
          return (
            <NoteItem note={note} key={note._id} updateNote={updateNote} showalert={props.showalert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
