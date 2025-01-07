const functions = require("firebase-functions")
const express = require("express")
const nodemailer = require("nodemailer")
const busboy = require("busboy")
const cors = require("cors")
const os = require("os")
const path = require("path")
const fs = require("fs")

const app = express()
app.use(cors({ origin: "https://nami-tattoo.web.app" }))

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_TO,
    pass: process.env.GMAIL_PASS,
  },
})

app.post("/send", async (req, res) => {
  const bb = busboy({ headers: req.headers })

  const data = {}
  let fileBuffer = null
  let fileName = null

  bb.on("field", (fieldname, val) => {
    data[fieldname] = val
  })

  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const chunks = []
    const originalFileName = filename.filename
    const originalFileType = filename.mimetype
    file.on("data", (chunk) => {
      chunks.push(chunk)
    })
    file.on("end", () => {
      fileBuffer = Buffer.concat(chunks)

      // Preserve the file extension based on the mimetype
      const ext =
        path.extname(originalFileName) || `.${originalFileType.split("/")[1]}`
      fileName =
        typeof originalFileName === "string" && originalFileName.trim()
          ? `${path.basename(
              originalFileName,
              path.extname(originalFileName)
            )}${ext}`
          : `uploaded-file${ext}`
    })
  })

  bb.on("finish", async () => {
    try {
      const {
        name,
        pronouns,
        email,
        designType,
        size,
        date,
        designDetails,
        budget,
        age = "x (not provided)",
        medication,
        extraInfo,
      } = data
      const simplifiedDate = new Date(date).toDateString().split("00:00:00")[0]
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
            <p>DESIRED DATE: ${simplifiedDate}</p>
            <p>DESIGN DETAILS: ${designDetails}</p>
            <p>Budget: ${budget}€</p>
          <br/>
          <h4>Additional Info:</h4>
            <p>18+ YEARS OLD? ${age}</p>
            <p>ANY MEDICATION? ${medication}</p>
            <p>EXTRA INFO / QUESTION: ${extraInfo}</p>
        `,
        attachments: fileBuffer
          ? [
              {
                filename: fileName,
                content: fileBuffer,
              },
            ]
          : [],
      }

      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: "Email sent successfully!" })
    } catch (error) {
      console.error("Error in sending email:", error)
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  })

  bb.end(req.rawBody)
})

exports.api = functions.https.onRequest(app)
