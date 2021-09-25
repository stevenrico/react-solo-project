import { useState } from "react"

function CreateTicket(props) {
  const [ticketData, setTicketData] = useState({
    firstName: "",
    lastName: "",
    quantity: "",
  })

  const [enableCustomQuantity, setEnableCustomQuantity] = useState(false)

  console.log("Ticket Create Form State: ", { ticketData })

  const handleChange = event => {
    const input = event.target

    const name = input.name
    const value = input.value

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

    const data = { [name]: value }

    setTicketData({ ...ticketData, ...data })
  }

  const { firstName, lastName, quantity } = ticketData

  return (
    <form className="form-stack">
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
    </form>
  )
}

export default CreateTicket