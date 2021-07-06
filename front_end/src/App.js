// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { Meet } from './pages/Meet/Meet';
import { Groups } from './pages/Groups/Groups';
import { Settings } from './pages/Settings/Settings';
import { User } from './pages/User/User';

// Logic

// Context

// Styles
import './styles/App.css';

// Assets


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/meet" component={Meet} />
          <Route exact path="/groups" component={Groups} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/user/:username" component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
