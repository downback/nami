import React from "react"
import SliderView from "../components/ui/ImageList"
import WhiteWrapper from "../components/ui/WhiteWrapper"

const FlashPage = () => {
  return (
    <div>
      <WhiteWrapper to="/">
        <SliderView folderName="flash/" title="Flashes" />
      </WhiteWrapper>
    </div>
  )
}

export default FlashPage
