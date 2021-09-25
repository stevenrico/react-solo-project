import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import CreateForm from "./components/CreateForm"
import EditForm from "./components/EditForm"
import List from "./components/List"
import View from "./components/View"

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
          <CreateForm
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
          />
        </Route>
        <Route path="/exhibitions/:exhibitionId/edit">
          <EditForm exhibitions={exhibitions} setExhibitions={setExhibitions} />
        </Route>
        <Route path="/exhibitions/:exhibitionId">
          <View />
        </Route>
      </Switch>
    </>
  )
}

export default Exhibitions
