import React from "react"
import {Router} from "@reach/router"
import AdminLayout from "../layout/admin"
// import Profile from "../components/Profile"
// import Details from "../components/Details"
import Login from "../views/login"
import Hub from "../views/hub"
import {isLoggedIn} from "../services/auth"
import PrivateRoute from "../components/PrivateRoute";
import BlogPosts from "../views/posts";
import Videos from "../views/videos";
import Schedule from "../views/schedule";

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
                        <PrivateRoute path="/blog-posts" component={BlogPosts}/>
                        <PrivateRoute path="/videos" component={Videos}/>
                        <PrivateRoute path="/schedule" component={Schedule}/>
                    </Router>
                )
            }
        </>
    )
}

export default App