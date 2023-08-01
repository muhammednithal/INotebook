import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
 const [input, setinput] = useState({title:"",description:"",tag:""});
  const handleonclick = (e) => {
    e.preventDefault();
    addNote(input)
    setinput({title:"",description:"",tag:""})
    props.showalert("success","sucessfully added")
  };
  const handleonchange = (e) => {
    setinput({...input,[e.target.name]:e.target.value})
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
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
              onChange={handleonchange}
              value={input.description}
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
              onChange={handleonchange}
              value={input.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleonclick}
            disabled={input.title.length<3||input.description.length<5}
          >
            Add note
          </button>
        </form>
      </div>
      <div className="container my-5">
        <h2>Your Note</h2>
       
      </div>
    </div>
  );
};

export default Addnote;
