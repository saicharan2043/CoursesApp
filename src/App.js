import {Switch, Route} from 'react-router-dom'

import CartItem from './components/CartItem'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CartItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
