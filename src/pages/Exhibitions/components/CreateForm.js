function CreateForm() {
  return (
    <form className="pad-md">
      <h1>Create an Exhibition</h1>
      <label htmlFor="name">Exhibtion Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" rows="4" />
      <h2>Location</h2>
      <label htmlFor="address">Address</label>
      <input type="text" id="address" name="address" />
      <label htmlFor="city">City</label>
      <input type="text" id="city" name="city" />
      <label htmlFor="postCode">Post Code</label>
      <input type="text" id="postCode" name="postCode" />
      <h2>Dates & Opening Times</h2>
      <label htmlFor="startDate">Start Date</label>
      <input type="date" id="startDate" name="startDate" />
      <label htmlFor="endDate">End Date</label>
      <input type="date" id="endDate" name="endDate" />
      <label htmlFor="startTime">Start Time</label>
      <input type="time" id="startTime" name="startTime" />
      <label htmlFor="endTime">End Time</label>
      <input type="time" id="endTime" name="endTime" />
    </form>
  )
}

export default CreateForm
