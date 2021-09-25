import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"

function EditForm(props) {
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

  // console.log("Exhibitions Edit Form State: ", {
  //   exhibitionData,
  //   locationData,
  //   datesData,
  // })

  const { exhibitionId } = useParams()

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    const setEditFormState = exhibition => {
      const { name, description, location: locationData, dates } = exhibition

      setExhibitionData({ name, description })
      setLocationData({ ...locationData })
      setDatesData({ ...dates })
    }

    if (location.state) {
      const { exhibition } = location.state

      setEditFormState(exhibition)
    } else {
      // When a user
      // - is on the route "/exhibition/1/edit"
      // - AND does a browser refresh
      // - fetch the exhibition from the server
      // - AND update state

      const getOneExhibition = async () => {
        const res = await fetch(
          `http://localhost:3030/exhibitions/${exhibitionId}`
        )

        const exhibition = await res.json()

        setEditFormState(exhibition)
      }

      getOneExhibition()
    }
  }, [location, exhibitionId])

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

    const exhibitionToUpdate = {
      ...exhibitionData,
      // paintings: [],
      location: {
        ...locationData,
      },
      dates: {
        ...datesData,
      },
    }

    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exhibitionToUpdate),
    }

    // console.log("Inside handleSubmit: ", { exhibitionToUpdate })

    const res = await fetch(
      `http://localhost:3030/exhibitions/${exhibitionId}`,
      fetchOptions
    )

    const updatedExhibition = await res.json()

    const updatedExhibitions = exhibitions.map(exhibition => {
      if (exhibition.id === parseInt(exhibitionId)) {
        return {
          ...updatedExhibition,
        }
      } else {
        return exhibition
      }
    })

    // When a user
    // - submits a form with updates
    // - AND is on the route "/exhibition/1/edit"
    // - AND does a browser refresh
    // - replace state in the location object
    // - AND update state

    history.replace(location.pathname, { exhibition: updatedExhibition })

    setExhibitions(updatedExhibitions)
  }

  const { name, description } = exhibitionData
  const { address, city, postCode } = locationData
  const { startDate, endDate, startTime, endTime } = datesData

  const today = new Date().toISOString()
  const todayDateOnly = today.split("T")[0]

  // Add state to prevent fetch request in View component

  const cancelLocation = {
    pathname: `/exhibitions/${exhibitionId}`,
    state: { ...location.state },
  }

  return (
    <form className="form-stack pad-md" onSubmit={handleSubmit}>
      <h1>Edit an Exhibition</h1>
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
      <button type="submit">Update Exhibition</button>
      <Link to={cancelLocation}>Cancel</Link>
    </form>
  )
}

export default EditForm
