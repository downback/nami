import React, { useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./BookingForm.module.css"
import Modal from "./ui/Modal"

const BookingFormSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  pronouns: Yup.string().required(),
  email: Yup.string().email("Invalid email").required(),
  designType: Yup.string().required(),
  size: Yup.string().required(),
  date: Yup.date().default(() => new Date()),
  designDetails: Yup.string(),
  age: Yup.string(),
  medication: Yup.string(),
  extraInfo: Yup.string(),
})

function BookingForm() {
  const [modalVisible, setModalVisible] = useState(false)

  const sendMail = async (values, { resetForm }) => {
    const normalizedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value || "x"])
    )

    const formData = new FormData()

    Object.keys(normalizedValues).forEach((key) => {
      formData.append(key, normalizedValues[key])
    })

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

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BOOKING</h1>
      <Formik
        initialValues={{
          name: "",
          pronouns: "",
          email: "",
          designType: "",
          size: "",
          date: "",
          designDetails: "",
          medication: "",
          extraInfo: "",
        }}
        validationSchema={BookingFormSchema}
        onSubmit={sendMail}
      >
        {() => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">
                Full Name
              </label>
              <Field name="name" type="text" className={styles.input} />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="pronouns">
                Pronouns
              </label>
              <Field name="pronouns" type="text" className={styles.input} />
              <ErrorMessage
                name="pronouns"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Field name="email" type="email" className={styles.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Design Type</label>
              <div role="group" className={styles.radioGroup}>
                <label className={styles.label}>
                  <Field type="radio" name="designType" value="flash" />
                  Flash
                </label>
                <label className={styles.label}>
                  <Field type="radio" name="designType" value="custom" />
                  Custom
                </label>
              </div>
              <ErrorMessage
                name="designType"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="size">
                Placement on body and size
              </label>
              <Field name="size" type="text" className={styles.input} />
              <ErrorMessage
                name="size"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="date">
                Desired Date
              </label>
              <Field name="date" type="date" className={styles.input} />
              <ErrorMessage
                name="datetime-local"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="designDetails">
                A detailed description of your idea or flashes piece you would
                like to get, you can upload an image / my previous work as a
                reference for custom design
              </label>
              <Field
                name="designDetails"
                as="textarea"
                className={styles.textarea}
              />
              <ErrorMessage
                name="designDetails"
                component="div"
                className={styles.error}
              />
              <input
                type="file"
                id="referenceImage"
                name="referenceImage"
                className={styles.imageUploader}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="age">
                Are you 18+?
              </label>
              <div role="group" aria-labelledby="my-radio-group">
                <label className={styles.label}>
                  <Field type="radio" name="age" value="yes" />
                  Yes
                </label>
                <label className={styles.label}>
                  <Field type="radio" name="age" value="no" />
                  No
                </label>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="medication">
                Medication
              </label>
              <Field name="medication" type="text" className={styles.input} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="extraInfo">
                Any other info or questions about your booking?
              </label>
              <Field name="extraInfo" type="text" className={styles.input} />
            </div>

            <button type="submit" className={styles.button}>
              Submit Booking
            </button>
          </Form>
        )}
      </Formik>
      <Modal
        isVisible={modalVisible}
        onClose={closeModal}
        message="Your booking request is sent to NAMI, and you can check the details in your email."
        buttonText="Go Back to Home"
      />
    </div>
  )
}

export default BookingForm
