import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setcredential] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleonchange = (e) => {
        setcredential({...credential,[e.target.name]:e.target.value})
      };
      //post request to login   
const onclick=async(e)=>{
    e.preventDefault()
    const {email,password}=credential
    const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password })
      })
      const json=await response.json()
      if(json.success){
        localStorage.setItem('token' , json.authtoken);
        navigate("/")
        props.showalert("success","sucessfully login")
      }else{
        props.showalert("danger","invalid credential")
      }

console.log(json);
}
  return (
    <div>
     <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" onChange={handleonchange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={handleonchange} name="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={onclick}>Submit</button>
</form>
    </div>
  )
}

export default Login
