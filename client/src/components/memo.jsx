const sendMail = async (values, { resetForm }) => {
  // Normalize values: Replace empty strings with '-'
  const normalizedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value || "-"])
  )

  const formData = new FormData()

  // Append normalized values
  Object.keys(normalizedValues).forEach((key) => {
    formData.append(key, normalizedValues[key])
  })

  // Append the file separately
  const fileInput = document.querySelector("#referenceImage")
  if (fileInput?.files[0]) {
    formData.append("referenceImage", fileInput.files[0])
  }

  try {
    await axios.post("http://localhost:5000/send", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("Email sent successfully")
    setModalVisible(true)
    resetForm()
  } catch (error) {
    console.log("Failed to send email", error)
  }
}
