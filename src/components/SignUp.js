import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credential, setcredential] = useState({
   name:"",
    email:"",
    password:""
});
const navigate = useNavigate();
const handleonchange = (e) => {
    setcredential({...credential,[e.target.name]:e.target.value})
  };
  //post request to sigup   
const onSubmit=async(e)=>{
e.preventDefault()
const {name,email,password}=credential
const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password })
  })
  const json=await response.json()
  if(json.success)
    localStorage.setItem('token' , json.authtoken);
    navigate("/")
    props.showalert("success","sucessfully created")

console.log(json);
}
  return (
    <div className='container'>
       
     <form onSubmit={onSubmit}>
     <div className="mb-3">
    <label htmlFor="name" className="form-label" >Name</label>
    <input type="text" onChange={handleonchange} name="name" className="form-control" id="name" aria-describedby="emailHelp" minLength={5} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" onChange={handleonchange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={handleonchange} name="password" className="form-control" id="exampleInputPassword1"  minLength={5} required/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default SignUp
