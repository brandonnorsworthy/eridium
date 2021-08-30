import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from './model_ui/Sidebar'
import Content from './model_ui/Content'

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
