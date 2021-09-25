import { useState } from "react"
import GeneralSection from "../../components/ExhibitionForm/GeneralSection"
import DatesSection from "../../components/ExhibitionForm/DatesSection"
import LocationSection from "../../components/ExhibitionForm/LocationSection"

function CreateExhibition(props) {
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

  return (
    <form className="form-stack pad-md" onSubmit={handleSubmit}>
      <h1>Create an Exhibition</h1>
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
        Create Exhibition
      </button>
    </form>
  )
}

export default CreateExhibition
