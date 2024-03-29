import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

function ProfilePage() {
  const [redirect, setRedirect] = useState(false);
  // Get user from the userContext
  const { ready, user, setUser } = useContext(UserContext);
  // Destructure the parameter
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("users/logout");
    setUser(null);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="">
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} @ {user.email} <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "bookings" && (
        <div className="text-center max-w-lg mx-auto"></div>
      )}
    </div>
  );
}

export default ProfilePage;
