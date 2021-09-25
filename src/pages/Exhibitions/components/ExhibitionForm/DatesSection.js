function DatesSection(props) {
  const { handleChange, datesData } = props

  const { startDate, endDate, startTime, endTime } = datesData

  const today = new Date().toISOString()
  const todayDateOnly = today.split("T")[0]

  return (
    <>
      <h2>Dates & Opening Times</h2>
      <div className="section two-column-grid__auto gap-md">
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            data-category="dates"
            onChange={handleChange}
            min={todayDateOnly}
            value={startDate || todayDateOnly}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            data-category="dates"
            onChange={handleChange}
            min={todayDateOnly}
            value={endDate || todayDateOnly}
          />
        </div>
      </div>
      <div className="section two-column-grid__auto gap-md">
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            data-category="dates"
            onChange={handleChange}
            min="06:00"
            max="20:00"
            value={startTime || "06:00"}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            data-category="dates"
            onChange={handleChange}
            min="08:00"
            max="22:00"
            value={endTime || "22:00"}
          />
        </div>
      </div>
    </>
  )
}

export default DatesSection
