import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BookingPage from "./pages/BookingPage"
import FlashPage from "./pages/FlashPage"
import GalleryPage from "./pages/GalleryPage"
import ContactPage from "./pages/ContactPage"
import AdminPage from "./pages/AdminPage"
import AdminForm from "./components/admin/AdminForm"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Imprint from "./pages/Imprint"
import AdminDateUpdate from "./components/admin/AdminDateUpdate"

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/flash" element={<FlashPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route
          path="/admin/gallery"
          element={
            <AdminForm
              folderName="gallery"
              title="Gallery Page"
              isCaption={true}
            />
          }
        />
        <Route
          path="/admin/flash"
          element={
            <AdminForm
              folderName="flash"
              title="Flash Page"
              isCaption={false}
            />
          }
        />
        <Route path="/admin/dates" element={<AdminDateUpdate />} />
      </Routes>
    </Router>
  )
}

export default App

// TODO

//[ ] Landing page section3 animation test

//ImageList
//[ ] gallery separated slider for each category
//[ ] ADMIN- gallery separated slider for each category
//[ ] admin image order change?
//[ ] images cache for faster loading
//[x] go up btn

//[x] Landing page animation loading zoom in Issue

//BookingPage
//[x] alternative desired date text input add
//[x] booking page loading on bottom side issue
//[x] checkbox align center
//[x] checkbox active black
//[x] Desired Date width check
//[x] leave Desired Date & add alternative date box
