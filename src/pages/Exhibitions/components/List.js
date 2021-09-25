import { Link } from "react-router-dom"

function List(props) {
  const { exhibitions } = props

  return (
    <aside className="pad-md">
      <h2>Exhibitions</h2>
      <ul>
        <li>
          <Link to="/exhibitions/create">Create Exhibition</Link>
        </li>
      </ul>
      <ul className="data-list with-borders with-item-borders">
        {exhibitions &&
          exhibitions.map((exhibition, index) => {
            const { address, city } = exhibition.location

            const viewLocation = {
              pathname: `/exhibitions/${exhibition.id}`,
              state: { exhibition },
            }

            return (
              <li key={index}>
                <h3>{exhibition.name}</h3>
                <p>
                  {address}, {city}
                </p>
                <Link to={viewLocation}>View</Link>
              </li>
            )
          })}
      </ul>
    </aside>
  )
}

export default List
