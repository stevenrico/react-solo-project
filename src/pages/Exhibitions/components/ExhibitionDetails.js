function ExhibitionDetails(props) {
  const { exhibition } = props

  const { name, description, location, dates } = exhibition

  const { address, city, postCode } = location
  const { startDate, endDate, startTime, endTime } = dates

  const startDateDisplay = new Date(startDate).toDateString()
  const endDateDisplay = new Date(endDate).toDateString()
  const startTimeDisplay = startTime.substring(0, 5)
  const endTimeDisplay = endTime.substring(0, 5)

  return (
    <>
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
    </>
  )
}

export default ExhibitionDetails
