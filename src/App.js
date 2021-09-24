import "./styles/reset.css"
import "./styles/index.css"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <Switch>
      <Route path="/exhibitions">
        <h1>Exhibitions</h1>
      </Route>
      <Route path="/">
        <h1>Home</h1>
      </Route>
    </Switch>
  )
}

export default App
