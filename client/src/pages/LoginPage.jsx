import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    if (!email || !password) {
      console.log("Email or Password entered is not correct");
    }
    try {
      const { data } = await axios.post("users/login", {
        email,
        password,
      });
      setUser(data);
      console.log("Login Successful");
      setNavigate(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login </h1>
        <form className="max-w-xl mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Enter  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            {" "}
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
