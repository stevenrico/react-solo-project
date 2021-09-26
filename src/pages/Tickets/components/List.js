import "../styles/ticket-list.css"

function List(props) {
  const { tickets } = props

  return (
    <ul className="data-list tickets-list">
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketItem key={index} ticket={ticket} />
        ))
      ) : (
        <EmptyTicketItem />
      )}
    </ul>
  )
}

function EmptyTicketItem() {
  return (
    <li className="grid_center">
      <h3>No booked tickets.</h3>
    </li>
  )
}

function TicketItem(props) {
  const { ticket } = props

  const { firstName, lastName, date, quantity, membership } = ticket

  return (
    <li className="two-column-grid__expand-one gap-sm shadow-sm">
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div className={membership ? "membership-box active" : "membership-box"}>
        {membership && <span>Member</span>}
      </div>
      <div>
        <p>
          <strong>Date:</strong> {date}
        </p>
      </div>
      <div>
        <p>
          <strong>Qty:</strong> {quantity}
        </p>
      </div>
    </li>
  )
}

export default List
