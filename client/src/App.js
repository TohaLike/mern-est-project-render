import React from "react"
import { AuthContext } from "./context/AuthContext"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { Navbar } from "./components/Navbar"
import { Loader } from "./components/Loader"
import "materialize-css"

function App() {
   const { token, login, logout, userId, ready } = useAuth()
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)

   if (!ready) {
      return <Loader />
   }

   if (routes) {
      return (
         <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
         }}>
            <Router>
               {isAuthenticated && <Navbar />}
               <div className="container">
                  {routes}
               </div>
            </Router>
         </AuthContext.Provider>
      )
   } else {
      return (
         <div className="container">
            <h1>Ничего нету...</h1>
         </div>
      )
   }
}

export default App;
