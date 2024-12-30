import React from "react"
import WhiteWrapper from "../components/ui/WhiteWrapper"
import SliderView from "../components/ui/ImageList"

const GalleryPage = () => {
  return (
    <WhiteWrapper to="/">
      <SliderView folderName="gallery/" title="Gallery" />
    </WhiteWrapper>
  )
}

export default GalleryPage
