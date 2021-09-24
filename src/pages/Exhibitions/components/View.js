import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

function View() {
  const { exhibitionId } = useParams()

  console.log("Inside View: ", { exhibitionId })

  return <h1>View</h1>
}

export default View
