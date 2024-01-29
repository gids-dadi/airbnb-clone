import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchUser = async () => {
      await axios.get("users/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    };

    // call the function
    fetchUser()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
