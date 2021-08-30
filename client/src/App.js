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
          <Route path="/">
            <Sidebar />
            <Content />
          </Route>
          <Route path="/login">
          </Route>
          <Route path="/template">
            <DemoSidebar />
            <DemoContent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
