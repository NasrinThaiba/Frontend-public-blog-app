import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Register.css"

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username : "",
    email : "",
    password : "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
         const res = await fetch("https://backend-blog-app-hq13.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    

    if (res.ok) {
      alert(data.message);
      navigate("/login");
    } else {
      alert(data.message);
    }

    } catch(err) {
        alert("Something went wrong")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required />
     
      <input name="email"  type="text" placeholder="Email" value={form.email} onChange={handleChange} required />
   
      <input name="password" type="password" value={form.password} placeholder="Password" onChange={handleChange} required />

      <p>Already have account? <Link to="/login">Login</Link></p>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

