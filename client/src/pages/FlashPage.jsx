import React from "react"
import ImageList from "../components/ui/ImageList"
import WhiteWrapper from "../components/ui/WhiteWrapper"

const FlashPage = () => {
  return (
    <div>
      <WhiteWrapper to="/">
        <ImageList folderName="flash/" title="Flashes" isCaption={false} />
      </WhiteWrapper>
    </div>
  )
}

export default FlashPage
