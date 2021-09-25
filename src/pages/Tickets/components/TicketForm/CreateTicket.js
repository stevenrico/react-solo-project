import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CreateTicket(props) {
  const { exhibition } = props

  const [ticketData, setTicketData] = useState({
    firstName: "",
    lastName: "",
    quantity: "",
    date: "",
    membership: false,
    terms: false,
  })

  const [enableCustomQuantity, setEnableCustomQuantity] = useState(false)

  console.log("Ticket Create Form State: ", { ticketData, exhibition })

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
        setEnableCustomQuantity(true)
        setTicketData({ ...ticketData, quantity: "" })

        return
      }

      if (value !== "" && typeof value === "string") {
        setTicketData({ ...ticketData, quantity: parseInt(value) })

        return
      }
    }

    if (name === "membership") {
      setTicketData({ ...ticketData, membership: value === "yes" })

      return
    }

    const data = { [name]: value }

    setTicketData({ ...ticketData, ...data })
  }

  const { firstName, lastName, quantity, date, membership, terms } = ticketData

  const { dates: exhibitionDates } = exhibition

  return (
    <form className="form-stack">
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
          value={quantity > 5 || enableCustomQuantity ? "custom" : quantity}
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
          name="quantity"
          onChange={handleChange}
          min="6"
          value={enableCustomQuantity ? quantity : ""}
          disabled={!enableCustomQuantity}
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
