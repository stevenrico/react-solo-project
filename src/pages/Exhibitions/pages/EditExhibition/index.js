import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"
import GeneralSection from "../../components/ExhibitionForm/GeneralSection"
import DatesSection from "../../components/ExhibitionForm/DatesSection"
import LocationSection from "../../components/ExhibitionForm/LocationSection"

function EditExhibition(props) {
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

  // Add state to prevent fetch request in View component

  const cancelLocation = {
    pathname: `/exhibitions/${exhibitionId}`,
    state: { ...location.state },
  }

  return (
    <form className="form-stack pad-md" onSubmit={handleSubmit}>
      <h1>Edit an Exhibition</h1>
      <GeneralSection
        handleChange={handleChange}
        exhibitionData={exhibitionData}
      />
      <LocationSection
        handleChange={handleChange}
        locationData={locationData}
      />
      <DatesSection handleChange={handleChange} datesData={datesData} />
      <button className="button contained blue" type="submit">
        Update Exhibition
      </button>
      <Link className="button outlined red" to={cancelLocation}>
        Cancel
      </Link>
    </form>
  )
}

export default EditExhibition
