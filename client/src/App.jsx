import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BookingPage from "./pages/BookingPage"
import FlashPage from "./pages/FlashPage"
import GalleryPage from "./pages/GalleryPage"
import AdminPage from "./pages/AdminPage"

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
      </Routes>
    </Router>
  )
}

export default App

// TODO
// [x] Landing Page scroll animation done
// [x] Booking page image upload + all form set
// [x] flash & gallery page slider
// [x] flash & gallery page connecting with firebase storage

// [ ] Admin page + two components
// [ ] Wrapper better styling
// [ ] sliderView error fix
// [ ] Booking page calendar possibility research
