import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      });
      alert("Registration successful, now you can login");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration failed, please try again");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register </h1>
        <form className="max-w-xl mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            {" "}
            Already a member?{" "}
            <Link to={"/login"} className="underline text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
