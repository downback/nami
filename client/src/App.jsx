import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BookingPage from "./pages/BookingPage"
import FlashPage from "./pages/FlashPage"
import GalleryPage from "./pages/GalleryPage"
import AdminPage from "./pages/AdminPage"
import AdminForm from "./components/AdminForm"

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
        <Route
          path="/admin/gallery"
          element={<AdminForm folderName="gallery" title="Manage Gallery" />}
        />
        <Route
          path="/admin/flash"
          element={<AdminForm folderName="flash" title="Manage Flash" />}
        />
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

// [x] Admin page + two components
// [ ] Wrapper better styling
// [ ] sliderView error fix
// [ ] Gallery page + Slide
// [ ] Booking page calendar possibility research

// [ ] Booking page / budget 150-250 250-350 ... (no required)
// [ ] scroll moved -> go to page auto
// [ ] 확인 메일
// 매일 받을 이메일 주소 /  authentification
// 3D stl&glb file
// 상세 페이지 <- 버튼 / slider는 x
// imprint 주소 빼고 나머지는 그대로 가져오기
// side bar transparency / opacity 낮추고 필터 더 적용 / font apply & test 2 versions/ hover -> bold

// deploy->
