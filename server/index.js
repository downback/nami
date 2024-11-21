const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

app.use(cors())
app.use(express.json({ limit: "25mb" }))
app.use(express.urlencoded({ limit: "25mb" }))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})

function sendEmail({ name, email, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_TO,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mail_configs = {
      to: process.env.GMAIL_TO,
      from: email,
      subject: name,
      html: `
      <p>${message}</p>
      <p>Best Regards</p>
      `,
    }
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error)
        return reject({ message: `An error has occurred` })
      }
      return resolve({ message: "Email sent successfully" })
    })

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
      } else {
        console.log("Server is ready to take our messages")
      }
    })
  })
}

app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})

// const PORT = process.env.PORT || 5000
const PORT = 5000
app.listen(PORT, () => {
  console.log(`nodemailerProject is listening at http://localhost:${PORT}`)
})
