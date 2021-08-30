import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import DemoSidebar from './demo/Sidebar'
import DemoContent from './demo/Content'

function App() {
  return (
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
