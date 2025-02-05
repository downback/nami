import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BookingPage from "./pages/BookingPage"
import FlashPage from "./pages/FlashPage"
import GalleryPage from "./pages/GalleryPage"
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
