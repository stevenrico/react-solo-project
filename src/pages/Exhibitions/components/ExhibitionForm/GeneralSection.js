function GeneralSection(props) {
  const { handleChange, exhibitionData } = props

  const { name, description } = exhibitionData

  return (
    <>
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
    </>
  )
}

export default GeneralSection
