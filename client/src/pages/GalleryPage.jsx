import React from "react"
import Wrapper from "../components/ui/WhiteWrapper"
import SliderView from "../components/ui/ImageList"

const GalleryPage = () => {
  return (
    <Wrapper>
      <SliderView folderName="gallery/" title="Gallery" />
    </Wrapper>
  )
}

export default GalleryPage
