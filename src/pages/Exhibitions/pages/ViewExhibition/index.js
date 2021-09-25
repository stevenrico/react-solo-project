import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

function ViewExhibition() {
  const [exhibition, setExhibition] = useState(null)

  const { exhibitionId } = useParams()

  const location = useLocation()

  console.log("Inside View: ", { exhibitionId, exhibition, location })

  useEffect(() => {
    if (location.state) {
      const { exhibition } = location.state

      setExhibition(exhibition)
    } else {
      // When a user
      // - is on the route "/exhibition/1"
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
  }, [location, exhibitionId])

  if (!exhibition) return <p>Loading...</p>

  const { name, description, location: exhibitionLocation, dates } = exhibition

  const { address, city, postCode } = exhibitionLocation
  const { startDate, endDate, startTime, endTime } = dates

  const startDateDisplay = new Date(startDate).toDateString()
  const endDateDisplay = new Date(endDate).toDateString()
  const startTimeDisplay = startTime.substring(0, 5)
  const endTimeDisplay = endTime.substring(0, 5)

  const editLocation = {
    pathname: `/exhibitions/${exhibition.id}/edit`,
    state: { exhibition },
  }

  return (
    <main className="exhibition-view pad-md">
      <section>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
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
      <section>
        <h2 className="visually-hidden">Actions</h2>
        <ul className="nav-list grid-auto__column justify-content:start gap-sm">
          <li>
            <Link className="button outlined blue" to={editLocation}>
              Edit
            </Link>
          </li>
          <li>
            <button className="button outlined red">Delete</button>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default ViewExhibition
