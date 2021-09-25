import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

function View() {
  const [exhibition, setExhibition] = useState(null)

  const { exhibitionId } = useParams()

  const location = useLocation()

  console.log("Inside View: ", { exhibitionId, exhibition })

  useEffect(() => {
    if (location.state) {
      const { exhibition } = location.state

      setExhibition(exhibition)
    } else {
      // When a user
      // - is on the a route with "/exhibition/1"
      // - AND does a browser refresh
      // - fetch the exhibition from the server
      // - AND update state

      const getOneExhibition = async () => {
        const res = await fetch(
          `http://localhost:3030/exhibitions/${exhibitionId}`
        )

        const exhibition = await res.json()

        setExhibition(exhibition)
      }

      getOneExhibition()
    }
  }, [])

  if (!exhibition) return <p>Loading...</p>

  const { name, description, location: exhibitionLocation, dates } = exhibition

  const { address, city, postCode } = exhibitionLocation
  const { startDate, endDate, startTime, endTime } = dates

  const startDateDisplay = new Date(startDate).toDateString()
  const endDateDisplay = new Date(endDate).toDateString()
  const startTimeDisplay = startTime.substring(0, 5)
  const endTimeDisplay = endTime.substring(0, 5)

  return (
    <main className="pad-md">
      <h1>{name}</h1>
      <p>{description}</p>
      <section>
        <h2>Address</h2>
        <p>{address}</p>
        <p>{city}</p>
        <p>{postCode}</p>
      </section>
      <div className="two-column-grid__auto">
        <section>
          <h2>Dates</h2>
          <h3>From:</h3>
          <p>{startDateDisplay}</p>
          <h3>To:</h3>
          <p>{endDateDisplay}</p>
        </section>
        <section>
          <h2>Opening Times</h2>
          <h3>From:</h3>
          <p>{startTimeDisplay}</p>
          <h3>To:</h3>
          <p>{endTimeDisplay}</p>
        </section>
      </div>
    </main>
  )
}

export default View
