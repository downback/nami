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
          element={<AdminForm folderName="gallery" title="Gallery Page" />}
        />
        <Route
          path="/admin/flash"
          element={<AdminForm folderName="flash" title="Flash Page" />}
        />
        <Route path="/admin/dates" element={<AdminDateUpdate />} />
      </Routes>
    </Router>
  )
}

export default App

// TODO

//[ ] MODEL BLENDER
//[ ] MENU BAR UI TEST
//[ ] Loader styling
//[x] firebase auth check
//[x] LANDING PAGE TEXT TYPING ANIMATION
//[x] SLIDER
//[x] VALIDATION

// Admin page
// [x]  - firebase auth change check
// [x]  - styling
// [x]  - mobile responsive design
// 매일 받을 이메일 주소 /  authentication

// Landing page
// [-]  - environment color
// [x]  -  3d model loading animation
// [x]  -  mobile responsive design
// [x]  - font
// [x]  - menu bar opacity change (opacity 낮추고 필터 더 적용 / hover -> bold)
// [x]  - menu bar click timeout
// [x]  - footer copyright and so on (imprint 주소 빼고 나머지는 그대로 가져오기)
// [x]  - typing animation
// [x]  - privacy policy width change

// gallery page & flash page
// [ ]  - mobile responsive design
// [x]  - 상세 페이지 Slider <- 버튼 / slider는 x
// [x]  - wrapper styling adjust

// Booking page
// [ ]  - mobile responsive design
// [x]  - 확인 메일
// [x]  - submit validation
// [x]  - Booking page calendar possibility research
// [x]  - Booking page / budget 150-250 ... 650-  (required)
// [x]  - reservation form update
