import { useState } from "react"

function CreateForm() {
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

  console.log("Exhibitions Create Form State: ", {
    exhibitionData,
    locationData,
    datesData,
  })

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

  const { name, description } = exhibitionData
  const { address, city, postCode } = locationData
  const { startDate, endDate, startTime, endTime } = datesData

  return (
    <form className="form-stack pad-md">
      <h1>Create an Exhibition</h1>
      <label htmlFor="name">Exhibtion Name</label>
      <input
        type="text"
        id="name"
        name="name"
        data-category="exhibition"
        onChange={handleChange}
        value={name}
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
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        data-category="dates"
        onChange={handleChange}
        value={startDate}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        data-category="dates"
        onChange={handleChange}
        value={endDate}
      />
      <label htmlFor="startTime">Start Time</label>
      <input
        type="time"
        id="startTime"
        name="startTime"
        data-category="dates"
        onChange={handleChange}
        value={startTime}
      />
      <label htmlFor="endTime">End Time</label>
      <input
        type="time"
        id="endTime"
        name="endTime"
        data-category="dates"
        onChange={handleChange}
        value={endTime}
      />
    </form>
  )
}

export default CreateForm
