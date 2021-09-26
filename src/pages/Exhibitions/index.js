import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import List from "./components/List"
import BookTickets from "../Tickets/pages/BookTickets"
import CreateExhibition from "./pages/CreateExhibition"
import EditExhibition from "./pages/EditExhibition"
import ViewExhibition from "./pages/ViewExhibition"

import "./styles/index.css"

function Exhibitions() {
  const [exhibitions, setExhibitions] = useState(null)

  console.log("Exhibitions State: ", { exhibitions })

  useEffect(() => {
    const getExhibitions = async () => {
      const res = await fetch("http://localhost:3030/exhibitions")

      const exhibitionsData = await res.json()

      setExhibitions(exhibitionsData)
    }

    getExhibitions()
  }, [])

  return (
    <>
      <List exhibitions={exhibitions} />
      <Switch>
        <Route path="/exhibitions/create">
          <CreateExhibition
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
          />
        </Route>
        <Route path="/exhibitions/:exhibitionId/edit">
          <EditExhibition
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
          />
        </Route>
        <Route path="/exhibitions/:exhibitionId/book">
          <BookTickets
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
          />
        </Route>
        <Route path="/exhibitions/:exhibitionId">
          <ViewExhibition
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
          />
        </Route>
      </Switch>
    </>
  )
}

export default Exhibitions
