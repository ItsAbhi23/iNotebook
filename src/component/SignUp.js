// import React, { useState } from 'react'
// import {useHistory} from 'react-router-dom'

// const SignUp = () => {
//   const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
//   let history=useHistory();
//     const handleSubmit=async(e)=>{
//       const {name,email,password}=credentials;
//       const response=await fetch('https://localhost:4000/api/auth/createuser',
//       {
      
//         method:'POST',headers:{'Content-Type':'aplication/json'},body:JSON.stringify({name,email,password})});
//       const json=await response.json();
//       console.log(json);

//         localStorage.setItem('token',json.authtoken);
//         history.push("/");
 
//    e.preventDefault();
//     }
//     const onChange=(e)=>{
//       setCredentials({...credentials,[e.target.name]:e.target.value})
//     }
//   return (
//     <div className='container'>
// <form onSubmit={handleSubmit}>
// <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name</label>
//     <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="Password" className="form-label">Password</label>
//     <input type="password" className="form-control" id="Password" name='password' onChange={onChange}/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="cPassword" className="form-label">Confirm Password</label>
//     <input type="password" className="form-control" id="cPassword" name='cpassword' onChange={onChange} />
//   </div>

//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>    </div>
//   )
// }

// export default SignUp
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
// import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  // const history = useHistory();
let navigation=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:4000/api/auth/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
    localStorage.setItem('token', json.authtoken);
    navigation("/");
    // history.push('/');
    }else{
      alert("user already exist");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input type='text' className='form-control' id='name' name='name' onChange={onChange} aria-describedby='emailHelp' required/>
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input type='email' className='form-control' id='email' name='email' onChange={onChange} aria-describedby='emailHelp' required />
        </div>
        <div className='mb-3'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='Password' name='password' onChange={onChange} required />
        </div>
        <div className='mb-3'>
          <label htmlFor='cPassword' className='form-label'>
            Confirm Password
          </label>
          <input type='password' className='form-control' id='cPassword' name='cpassword' onChange={onChange} required />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
