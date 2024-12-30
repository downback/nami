import React, { useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./BookingForm.module.css"
import Modal from "../ui/Modal"
import { IoCloseOutline } from "react-icons/io5"

import DatePickerForm from "./DatePickerForm"

const BookingFormSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  pronouns: Yup.string().required("Pronouns are required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  designType: Yup.string().required("Design type is required"),
  size: Yup.string().required("Size is required"),
  date: Yup.date().nullable().required("Desired date is required"),
  designDetails: Yup.string(),
  budget: Yup.string().required("Budget is required"),
  age: Yup.string(),
  medication: Yup.string(),
  extraInfo: Yup.string(),
})

function BookingForm() {
  const [modalVisible, setModalVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [loading, setLoading] = useState(false)

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

    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      setLoading(true)
      setModalVisible(true)
      setErrorVisible(false)
      await axios.post("http://localhost:5000/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Email sent successfully")
      resetForm()
    } catch (error) {
      console.log("Failed to send email", error)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Booking</div>
      <Formik
        initialValues={{
          name: "",
          pronouns: "",
          email: "",
          designType: "",
          size: "",
          date: null,
          designDetails: "",
          budget: "",
          medication: "",
          extraInfo: "",
        }}
        validationSchema={BookingFormSchema}
        onSubmit={sendMail}
      >
        {({ isValidating, setFieldValue, values }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">
                Full Name*
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
                Pronouns*
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
                Email*
              </label>
              <Field name="email" type="email" className={styles.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Design Type*</label>
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
                Placement on body and size*
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
                Desired Date*
              </label>
              <DatePickerForm
                selectedDate={values.date}
                setFieldValue={setFieldValue}
              />
              <ErrorMessage
                name="date"
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
              <label className={styles.label} htmlFor="budget">
                What is your budget?*
              </label>
              <Field name="budget" as="select" className={styles.input}>
                <option value=" " label="Choose your budget" />
                <option value="150-250" label="150-250" />
                <option value="250-350" label="250-350" />
                <option value="450-550" label="450-550" />
                <option value="550-650" label="550-650" />
                <option value="650- " label="650- " />
              </Field>
              <ErrorMessage
                name="budget"
                component="div"
                className={styles.error}
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

            <div className={styles.required}>* required</div>
            {errorVisible && (
              <div className={styles.submitError}>
                Please fill all required fields before submitting your booking.
              </div>
            )}

            {loading && (
              <div className={styles.loadingMessage}>
                Submitting your booking, please wait...
              </div>
            )}

            <button
              type="submit"
              className={styles.button}
              onClick={() => {
                if (!isValidating) {
                  setErrorVisible(true)
                } else {
                  setErrorVisible(false)
                }
              }}
            >
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>
      <Modal
        isVisible={modalVisible}
        onClose={closeModal}
        title={
          loading ? (
            "Submitting your booking, please wait..."
          ) : (
            <p>Your booking request has been sent to NAMI!</p>
          )
        }
        message={
          loading ? (
            <div className={styles.loadingDots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : (
            <p className={styles.test}>
              You can check the details in your email
            </p>
          )
        }
        buttonText={
          <button onClick={closeModal} className={styles.modalCloseButton}>
            <IoCloseOutline />
          </button>
        }
      />
    </div>
  )
}

export default BookingForm
