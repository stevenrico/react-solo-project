function ExhibitionDetails(props) {
  const { exhibition, hide } = props

  const { name, description, location, dates } = exhibition

  const { address, city, postCode } = location
  const { startDate, endDate, startTime, endTime } = dates

  const startDateDisplay = new Date(startDate).toDateString()
  const endDateDisplay = new Date(endDate).toDateString()
  const startTimeDisplay = startTime.substring(0, 5)
  const endTimeDisplay = endTime.substring(0, 5)

  let show = {
    address: true,
    dates: true,
    times: true,
  }

  if (hide) {
    for (const key in hide) {
      show = {
        ...show,
        [key]: !hide[key],
      }
    }
  }

  return (
    <>
      <section>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      {show.address && (
        <section>
          <h2>Address</h2>
          <p>{address}</p>
          <p>{city}</p>
          <p>{postCode}</p>
        </section>
      )}
      {show.dates && (
        <section>
          <h2>Dates</h2>
          <div className="two-column-grid__auto">
            <div>
              <h3>From:</h3>
              <p>{startDateDisplay}</p>
            </div>
            <div>
              <h3>To:</h3>
              <p>{endDateDisplay}</p>
            </div>
          </div>
        </section>
      )}
      {show.times && (
        <section>
          <h2>Opening Times</h2>
          <div className="two-column-grid__auto">
            <div>
              <h3>From:</h3>
              <p>{startTimeDisplay}</p>
            </div>
            <div>
              <h3>To:</h3>
              <p>{endTimeDisplay}</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ExhibitionDetails
