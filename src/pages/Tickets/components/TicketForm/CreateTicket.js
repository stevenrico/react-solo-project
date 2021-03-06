import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

const initialTicketData = {
  firstName: "",
  lastName: "",
  quantity: "",
  date: "",
  membership: false,
  terms: false,
}

function CreateTicket(props) {
  const { exhibition, exhibitions, setExhibitions } = props

  const [ticketData, setTicketData] = useState({ ...initialTicketData })

  const [customQuantity, setCustomQuantity] = useState("")

  console.log("Ticket Create Form State: ", { ticketData, customQuantity })

  const history = useHistory()

  useEffect(() => {
    if (exhibition && ticketData.date === "") {
      setTicketData({ ...ticketData, date: exhibition.dates.startDate })
    }
  }, [exhibition, ticketData])

  const handleChange = event => {
    const input = event.target

    const type = input.type

    const name = input.name
    const value = input.value

    if (type === "checkbox") {
      const checked = input.checked

      const data = { [name]: checked }

      setTicketData({ ...ticketData, ...data })

      return
    }

    if (name === "quantity") {
      if (value === "custom") {
        setTicketData({ ...ticketData, quantity: "custom" })

        return
      }

      setTicketData({ ...ticketData, quantity: parseInt(value) })
      setCustomQuantity("")

      return
    }

    if (name === "customQuantity") {
      if (value !== "") {
        setCustomQuantity(parseInt(value))

        return
      }

      setCustomQuantity("")

      return
    }

    if (name === "membership") {
      setTicketData({ ...ticketData, membership: value === "yes" })

      return
    }

    const data = { [name]: value }

    setTicketData({ ...ticketData, ...data })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    let ticketToCreate = null

    if (ticketData.quantity === "custom") {
      ticketToCreate = {
        ...ticketData,
        quantity: customQuantity,
      }
    } else {
      ticketToCreate = {
        ...ticketData,
      }
    }

    ticketToCreate = {
      ...ticketToCreate,
      exhibitionId: exhibition.id,
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketToCreate),
    }

    const res = await fetch("http://localhost:3030/tickets", fetchOptions)

    const createdTicket = await res.json()

    let updatedExhibition = null

    const updatedExhibitions = exhibitions.map(exhibition => {
      if (exhibition.id === createdTicket.exhibitionId) {
        updatedExhibition = {
          ...exhibition,
          tickets: [...exhibition.tickets, createdTicket],
        }

        return {
          ...updatedExhibition,
        }
      } else {
        return exhibition
      }
    })

    setExhibitions(updatedExhibitions)
    setTicketData({ ...initialTicketData })
    setCustomQuantity("")

    // When a user
    // - submits a form
    // - AND is sent to "/exhibition/1"
    // - add updated exhibition to location.state via history
    // - IN ORDER TO prevent an unnecessary fetch request

    history.push(`/exhibitions/${exhibition.id}`, {
      exhibition: updatedExhibition,
    })
  }

  const { firstName, lastName, quantity, date, membership, terms } = ticketData

  const { dates: exhibitionDates } = exhibition

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <div className="section">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={firstName}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={lastName}
          required
        />
        <label htmlFor="quantity">Quantity</label>
        <select
          id="quatity"
          name="quantity"
          onChange={handleChange}
          value={customQuantity ? "custom" : quantity}
        >
          <option value="">Please select...</option>
          {[1, 2, 3, 4, 5, "custom"].map((quantityOption, index) => {
            if (quantityOption === "custom") {
              return (
                <option key={index} value={quantityOption}>
                  More than 5 tickets
                </option>
              )
            }
            if (quantityOption === 1) {
              return (
                <option key={index} value={quantityOption}>
                  {quantityOption} ticket
                </option>
              )
            }

            return (
              <option key={index} value={quantityOption}>
                {quantityOption} tickets
              </option>
            )
          })}
        </select>
        <label htmlFor="customQuantity">Custom Quantity</label>
        <input
          type="number"
          id="customQuantity"
          name="customQuantity"
          onChange={handleChange}
          min="6"
          value={customQuantity}
          disabled={quantity !== "custom"}
        />
        <label htmlFor="date">Date of Visit</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          min={exhibitionDates.startDate}
          max={exhibitionDates.endDate}
          value={date}
        />
      </div>
      <section>
        <h3>Do you have a membership with us?</h3>
        <div>
          <input
            type="radio"
            id="membership-yes"
            name="membership"
            value="yes"
            onChange={handleChange}
            checked={membership}
          />
          <label htmlFor="membership-yes">Yes, I am a member.</label>
        </div>
        <div>
          <input
            type="radio"
            id="membership-no"
            name="membership"
            value="no"
            onChange={handleChange}
            checked={!membership}
          />
          <label htmlFor="membership-no">No, I am not a member.</label>
        </div>
      </section>
      <section>
        <h3>Thank you for booking with us, one last step!</h3>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          onChange={handleChange}
          checked={terms}
          required
        />
        <label htmlFor="terms">
          Please accept our{" "}
          <a
            href="https://termly.io/products/terms-and-conditions-generator/"
            target="_blank"
            rel="noreferrer"
          >
            Terms and Conditions
          </a>
          .
        </label>
      </section>
      <button className="button contained blue" type="submit">
        Book
      </button>
      <Link
        to={`/exhibitions/${exhibition.id}`}
        className="button outlined red"
      >
        Cancel
      </Link>
    </form>
  )
}

export default CreateTicket
