
import { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigation=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigation("/");
      
    } else {

      alert('Invalid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
