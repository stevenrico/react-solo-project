import { useState } from "react"

function CreateForm(props) {
  const { exhibitions, setExhibitions } = props

  const [exhibitionData, setExhibitionData] = useState({
    name: "",
    description: "",
  })

  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    postCode: "",
  })

  const [datesData, setDatesData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  })

  // console.log("Exhibitions Create Form State: ", {
  //   exhibitionData,
  //   locationData,
  //   datesData,
  // })

  const handleChange = event => {
    const input = event.target

    const category = input.dataset.category
    const name = input.name
    const value = input.value

    const data = { [name]: value }

    switch (category) {
      case "exhibition":
        setExhibitionData({ ...exhibitionData, ...data })
        break
      case "location":
        setLocationData({ ...locationData, ...data })
        break
      case "dates":
        setDatesData({ ...datesData, ...data })
        break

      default:
        break
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const exhibitionToCreate = {
      ...exhibitionData,
      paintings: [],
      location: {
        ...locationData,
      },
      dates: {
        ...datesData,
      },
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exhibitionToCreate),
    }

    // console.log("Inside handleSubmit: ", { exhibitionToCreate })

    const res = await fetch("http://localhost:3030/exhibitions", fetchOptions)

    const createdExhibition = await res.json()

    setExhibitions([...exhibitions, createdExhibition])
  }

  const { name, description } = exhibitionData
  const { address, city, postCode } = locationData
  const { startDate, endDate, startTime, endTime } = datesData

  const today = new Date().toISOString()
  const todayDateOnly = today.split("T")[0]

  return (
    <form className="form-stack pad-md" onSubmit={handleSubmit}>
      <h1>Create an Exhibition</h1>
      <label htmlFor="name">Exhibtion Name</label>
      <input
        type="text"
        id="name"
        name="name"
        data-category="exhibition"
        onChange={handleChange}
        value={name}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        data-category="exhibition"
        onChange={handleChange}
        value={description}
        rows="4"
      />
      <h2>Location</h2>
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        data-category="location"
        onChange={handleChange}
        value={address}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        data-category="location"
        onChange={handleChange}
        value={city}
      />
      <label htmlFor="postCode">Post Code</label>
      <input
        type="text"
        id="postCode"
        name="postCode"
        data-category="location"
        onChange={handleChange}
        value={postCode}
      />
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
      <button type="submit">Create Exhibition</button>
    </form>
  )
}

export default CreateForm
