import React from "react"
import SliderView from "../components/ui/ImageList"
import Wrapper from "../components/ui/WhiteWrapper"

const FlashPage = () => {
  return (
    <div>
      <Wrapper>
        <SliderView folderName="flash/" title="Flashes" />
      </Wrapper>
    </div>
  )
}

export default FlashPage
