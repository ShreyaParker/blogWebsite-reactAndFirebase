import "./App.css"
import {BrowserRouter as Router,Routes , Route ,Link} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";

import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {signOut} from "firebase/auth"
import {auth} from "./firebase-config";
import {Button, Nav} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";

const App = () => {
    const [user] = useAuthState(auth)

    const signUserOut=async ()=>{
        await signOut(auth)
    }
    return (
        <Router>
            <Nav className="d-flex justify-content-center bg-black ">
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : (
                    <>
                        <Link to="/createpost">Create Post</Link>
                        <Button variant="outline-danger" onClick={signUserOut}>Log Out</Button>
                        <Button variant="outline-primary">
                            {user?.displayName}
                            <span className="visually-hidden">unread messages</span>
                        </Button>
                    </>
                    )}
            </Nav>
            <Routes>
                <Route path ="/" element={<Home user={user}/>} />
                <Route path ="/createpost" element={<CreatePost user={user}/>} />
                <Route path ="/login" element={<Login/>} />

            </Routes>
        </Router>
    );
};

export default App;