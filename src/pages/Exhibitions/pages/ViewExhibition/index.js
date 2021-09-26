import { useEffect, useState } from "react"
import { Link, useHistory, useLocation, useParams } from "react-router-dom"
import List from "../../../Tickets/components/List"
import ExhibitionDetails from "../../components/ExhibitionDetails"

function ViewExhibition(props) {
  const { exhibitions, setExhibitions } = props

  const [exhibition, setExhibition] = useState(null)

  const { exhibitionId } = useParams()

  const location = useLocation()

  const history = useHistory()

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
        try {
          const res = await fetch(
            `http://localhost:3030/exhibitions/${exhibitionId}`
          )

          if (!res.ok) throw Error(`ERROR [${res.status}] ${res.statusText}`)

          const exhibition = await res.json()

          setExhibition(exhibition)
        } catch (error) {
          console.error({ error, redirect: "/exhibitions" })

          history.push("/exhibitions")
        }
      }

      getOneExhibition()
    }
  }, [location, exhibitionId, history])

  const deleteById = async id => {
    const fetchOptions = {
      method: "DELETE",
    }

    const res = await fetch(
      `http://localhost:3030/exhibitions/${id}`,
      fetchOptions
    )

    if (res.ok) {
      const updatedExhibitions = exhibitions.filter(
        exhibition => exhibition.id !== id
      )

      setExhibitions(updatedExhibitions)

      history.push("/exhibitions")
    }
  }

  if (!exhibition) return <p>Loading...</p>

  const bookTicketsLocation = {
    pathname: `/exhibitions/${exhibition.id}/book`,
    state: { exhibition },
  }

  const editLocation = {
    pathname: `/exhibitions/${exhibition.id}/edit`,
    state: { exhibition },
  }

  return (
    <main className="exhibition-view pad-md">
      <ExhibitionDetails exhibition={exhibition} />
      <section>
        <h2 className="visually-hidden">Actions</h2>
        <ul className="nav-list grid-auto__column justify-content:start gap-sm">
          <li>
            <Link className="button contained blue" to={bookTicketsLocation}>
              Book Tickets
            </Link>
          </li>
          <li>
            <Link className="button outlined blue" to={editLocation}>
              Edit
            </Link>
          </li>
          <li>
            <button
              className="button outlined red"
              onClick={() => deleteById(exhibition.id)}
            >
              Delete
            </button>
          </li>
        </ul>
      </section>
      <section>
        <h2>Booked Tickets</h2>
        <List tickets={exhibition.tickets} />
      </section>
    </main>
  )
}

export default ViewExhibition
