function LocationSection(props) {
  const { handleChange, locationData } = props

  const { address, city, postCode } = locationData

  return (
    <>
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
    </>
  )
}

export default LocationSection
