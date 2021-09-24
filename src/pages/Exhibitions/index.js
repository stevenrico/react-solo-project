import { useEffect, useState } from "react"

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

  return <h1>Exhibitions</h1>
}

export default Exhibitions
