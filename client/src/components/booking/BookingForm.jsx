import React, { useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Modal from "../ui/Modal"
import { IoCloseOutline } from "react-icons/io5"
import DatePickerForm from "./DatePickerForm"

import styles from "./BookingForm.module.css"

const BookingFormSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  pronouns: Yup.string().required("Pronouns are required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  designType: Yup.string().required("Design type is required"),
  size: Yup.string().required("Size is required"),
  date: Yup.date().nullable().required("Desired date is required"),
  alternativeDate: Yup.string(),
  designDetails: Yup.string(),
  budget: Yup.string().required("Budget is required"),
  age: Yup.string(),
  medication: Yup.string(),
  extraInfo: Yup.string(),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
})

function BookingForm() {
  const [modalVisible, setModalVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendMail = async (values, { resetForm }) => {
    const normalizedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        value || "x (not provided)",
      ])
    )

    const formData = new FormData()
    Object.keys(normalizedValues).forEach((key) => {
      formData.append(key, normalizedValues[key])
    })

    const fileInput = document.querySelector("#referenceImage")
    if (fileInput.files.length > 0) {
      formData.append("referenceImage", fileInput.files[0])
    }

    try {
      setLoading(true)
      setModalVisible(true)
      setErrorVisible(false)
      const apiUrl = `${import.meta.env.VITE_API_URL}/send`

      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
          alternativeDate: "",
          designDetails: "",
          budget: "",
          medication: "",
          extraInfo: "",
          consent: false,
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
              <div className={styles.inputWrapper}>
                <Field name="name" type="text" className={styles.input} />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="pronouns">
                Pronouns*
              </label>
              <div className={styles.inputWrapper}>
                <Field name="pronouns" type="text" className={styles.input} />
                <ErrorMessage
                  name="pronouns"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email*
              </label>
              <div className={styles.inputWrapper}>
                <Field name="email" type="email" className={styles.input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Design Type*</label>
              <div className={styles.inputWrapper}>
                <div role="group" className={styles.radioGroup}>
                  <label className={styles.radioWrapper}>
                    <Field
                      type="radio"
                      name="designType"
                      value="flash"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Flash</span>
                  </label>
                  <label className={styles.radioWrapper}>
                    <Field
                      type="radio"
                      name="designType"
                      value="custom"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Custom (+70eu)</span>
                  </label>
                </div>
                <ErrorMessage
                  name="designType"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="size">
                Placement on body and size (in cm)*
              </label>
              <div className={styles.inputWrapper}>
                <Field name="size" type="text" className={styles.input} />
                <ErrorMessage
                  name="size"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="date">
                Desired Date*
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.datePickerWrapper}>
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
              </div>
              <label className={styles.subLabel} htmlFor="date">
                In case your desired date doesn't meet with available dates,
                please write here.
              </label>

              <div className={styles.inputWrapper}>
                <Field
                  name="alternativeDate"
                  type="text"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="budget">
                What is your budget?*
              </label>
              <div className={styles.inputWrapper}>
                <Field name="budget" as="select" className={styles.input}>
                  <option value=" " label="Choose your budget" />
                  <option value="150-250" label="150-250" />
                  <option value="250-350" label="250-350" />
                  <option value="450-550" label="450-550" />
                  <option value="550-650" label="550-650" />
                  <option value="650-" label="650-" />
                  <option value="individual price" label="individual price" />
                </Field>
                <ErrorMessage
                  name="budget"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="designDetails">
                A detailed description of your idea or flashes piece you would
                like to get, you can upload an image / my previous work as a
                reference for custom design
              </label>
              <div className={styles.inputWrapper}>
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
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="age">
                Are you 18+?
              </label>
              <div className={styles.inputWrapper}>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className={styles.radioGroup}
                >
                  <label className={styles.radioWrapper}>
                    <Field
                      type="radio"
                      name="age"
                      value="yes"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Yes</span>
                  </label>
                  <label className={styles.radioWrapper}>
                    <Field
                      type="radio"
                      name="age"
                      value="no"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="medication">
                Medication
              </label>
              <div className={styles.inputWrapper}>
                <Field name="medication" type="text" className={styles.input} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="extraInfo">
                Any other info or questions about your booking?
              </label>
              <div className={styles.inputWrapper}>
                <Field name="extraInfo" type="text" className={styles.input} />
              </div>
            </div>

            <div>
              <label className={styles.label}>
                <Field
                  type="checkbox"
                  name="consent"
                  className={styles.consentCheckbox}
                />
                I agree to the privacy policy and consent to the processing of
                my personal data for the purpose of scheduling an appointment.
              </label>
              <ErrorMessage
                name="consent"
                component="div"
                className={styles.error}
              />
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
