import "./styles/reset.css"
import "./styles/index.css"
import { Route, Switch } from "react-router-dom"
import Exhibitions from "./pages/Exhibitions"

function App() {
  return (
    <Switch>
      <Route path="/exhibitions">
        <Exhibitions />
      </Route>
      <Route path="/">
        <h1>Home</h1>
      </Route>
    </Switch>
  )
}

export default App
