const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const multer = require("multer")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(cors())

// Configure Multer
const upload = multer({ storage: multer.memoryStorage() })

function sendEmail(
  {
    name,
    pronouns,
    email,
    designType,
    size,
    date,
    designDetails,
    budget,
    age,
    medication,
    extraInfo,
  },
  file
) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_TO,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      to: `${process.env.GMAIL_TO}, ${email}`,
      from: email,
      subject: `Nami Tattoo Booking Request from ${name}!`,
      html: `
      <h1>NEW TATTOO REQUEST</h1>
      <br/>
      <h4>Personal Info:</h4>
        <p>FULL NAME: ${name}</p>
        <p>PRONOUNS: ${pronouns}</p>
        <p>EMAIL: ${email}</p>
        <br/>
        <h4>Tattoo Design Request:</h4>
        <p>Design Type: ${designType}</p>
        <p>PLACEMENT & SIZE: ${size}</p>
        <p>DESIRED DATE: ${date}</p>
        <p>DESIGN DETAILS: ${designDetails}</p>
        <p>Budget: ${budget}€</p>
      <br/>
      <h4>Additional Info:</h4>
        <p>18+ YEARS OLD? ${age}</p>
        <p>ANY MEDICATION? ${medication}</p>
        <p>EXTRA INFO / QUESTION: ${extraInfo}</p>
      `,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return reject({ message: "An error occurred" })
      }
      resolve({ message: "Email sent successfully" })
    })
  })
}

app.post("/send", upload.single("referenceImage"), async (req, res) => {
  try {
    const response = await sendEmail(req.body, req.file)
    res.send(response.message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = 5000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
