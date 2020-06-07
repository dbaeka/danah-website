import React from "react"
import {Router} from "@reach/router"
import AdminLayout from "../layout/admin"
// import Profile from "../components/Profile"
// import Details from "../components/Details"
import Login from "../components/Login"
import Hub from "../components/Hub"
import {isLoggedIn} from "../services/auth"
import PrivateRoute from "../components/PrivateRoute";

const App = () => {

    const layout = (children) => {
        if (isLoggedIn()) {
            return (
                <AdminLayout>
                    {children}
                </AdminLayout>
            )
        } else {
            return (
                <>
                    {children}
                </>
            )
        }
    }

    return (
        <>
            {
                layout(
                    <Router basepath="/admin">
                        {/*<Profile path="/profile" />*/}
                        {/*<Details path="/details" />*/}
                        <Login path="/login"/>
                        <PrivateRoute path="/" component={Hub}/>
                    </Router>
                )
            }
        </>
    )
}

export default App