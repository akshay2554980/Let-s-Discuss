import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";


function App() {
  const [{user}]=useStateValue();   // to access the data layer things and update them
   return (
    <div className="app">
    {(!user)?(
      <Login />
    ):(
      <div className="app__body">
        {/* inside app__body we have sidebar and chat. */}
        <Router>
        <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
        </Router>
      </div>
    )}
      
    </div>
  );
}

export default App;
