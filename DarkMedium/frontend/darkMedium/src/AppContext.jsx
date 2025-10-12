import { createContext } from "react";
import { useState } from "react";



export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    blogs: [],
    collection: [],
    favourites: [],
    liked: [],
    tags: [],
    id: '',
    token: ''
  })
  const [deleted, setDeleted] = useState(false);
  const value = { isLoggedIn, setLoggedIn, user, setUser, deleted, setDeleted }


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

