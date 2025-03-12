import React from "react"
import WhiteWrapper from "../components/ui/WhiteWrapper"
import ImageList from "../components/ui/ImageList"

const GalleryPage = () => {
  return (
    <>
      <ImageList folderName="gallery/" title="Work" isCaption={true} />
    </>
  )
}

export default GalleryPage
