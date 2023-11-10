import images from "../utils/imageloader"
import CivButton from "./CivButton"

const CivButtonHolder = ({ f }) => {
  const imageNames = Object.keys(images.civImages)

  return(
    <div>
      {imageNames.map((n) => (
        <CivButton
          key={n}
          name={n}
          image={images.civImages[n]}
          buttFunc={f}
        />
      ))}
    </div>
  )
}

export default CivButtonHolder