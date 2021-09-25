import { Link } from "react-router-dom"

function List(props) {
  const { exhibitions } = props

  return (
    <aside>
      <h2>Exhibitions</h2>
      <ul>
        {exhibitions &&
          exhibitions.map((exhibition, index) => {
            const { address, city } = exhibition.location

            const destination = {
              pathname: `/exhibitions/${exhibition.id}`,
              state: { exhibition },
            }

            return (
              <li key={index}>
                <h3>{exhibition.name}</h3>
                <p>
                  {address}, {city}
                </p>
                <Link to={destination}>View</Link>
              </li>
            )
          })}
      </ul>
    </aside>
  )
}

export default List
