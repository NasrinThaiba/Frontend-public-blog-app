import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import "../style/Login.css"

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://backend-blog-app-hq13.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);
      navigate("/");

    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input name="email" type="text" placeholder="Email" value={form.email} onChange={handleChange} required />

      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      
      <p>Do you not have a Account? <Link to="/register">Register</Link></p>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;