import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import ExhibitionDetails from "../../../Exhibitions/components/ExhibitionDetails"

function BookTickets() {
  const [exhibition, setExhibition] = useState(null)

  const { exhibitionId } = useParams()

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    if (location.state) {
      const { exhibition } = location.state

      setExhibition(exhibition)
    } else {
      // When a user
      // - is on the route "/exhibition/1/book"
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

  return (
    <main className="pad-md">
      {exhibition && <ExhibitionDetails exhibition={exhibition} />}
      <h2>Book Tickets</h2>
    </main>
  )
}

export default BookTickets
