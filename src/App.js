import "./App.css";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  const [alert,setalert]=useState(null)
  const showalert=(typeofalert,messsage)=>{
    setalert({
      type:typeofalert,
      msg:messsage
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home  showalert={showalert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showalert={showalert}/>} />
              <Route exact path="/signup" element={<SignUp showalert={showalert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
