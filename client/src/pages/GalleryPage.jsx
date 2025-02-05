import React from "react"
import WhiteWrapper from "../components/ui/WhiteWrapper"
import ImageList from "../components/ui/ImageList"

const GalleryPage = () => {
  return (
    <WhiteWrapper to="/">
      <ImageList folderName="gallery/" title="Gallery" isCaption={true} />
    </WhiteWrapper>
  )
}

export default GalleryPage
