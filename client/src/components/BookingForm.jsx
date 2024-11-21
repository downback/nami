import React from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styles from "./BookingForm.module.css"

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
})

function ContactForm() {
  const sendMail = (values, { resetForm }) => {
    axios
      .get("http://localhost:5000/", {
        params: {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      })
      .then(() => {
        // success
        console.log("Email sent successfully")
        resetForm()
      })
      .catch(() => {
        console.log("Failed to send email")
      })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ContactFormSchema}
        onSubmit={sendMail}
      >
        {() => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <Field
                name="name"
                type="text"
                placeholder="Your Name"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="email"
                type="email"
                placeholder="Your Email"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="message"
                as="textarea"
                placeholder="Your Message"
                className={styles.textarea}
              />
              <ErrorMessage
                name="message"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactForm
