import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import DemoSidebar from './demo/Sidebar'
import DemoContent from './demo/Content'

function App() {
  return (
    /* go to localhost:3000/demo for an example of what it will look like */
    /* components have the templates that will be used for javascript do not touch /demo folder */
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
          </Route>
          <Route path="/demo">
            <DemoSidebar />
            <DemoContent />
          </Route>
          <Route path="/">
            <Sidebar />
            <Content />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
