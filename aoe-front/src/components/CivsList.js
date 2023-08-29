import goths from "../images/goths.webp"
import imageObj from "../utils/imageloader"

const CivsList = () => {
  const imageNames = Object.keys(imageObj)
  const buttFunc = (stuff) => {
    console.log("stuff:", stuff)
  } 

  return (
    <div>
      <p>Choose your civ</p>
      <div>
        {imageNames.map((n) => (
          <button key={n}>
            <img src={imageObj[n]}
              alt = {n}
              onClick={() => buttFunc(n)}
            />
          </button>
        ))}
      </div>

    </div>
  )
}

/*
<button><img src={goths}
        alt="gothciv" 
        onClick={() => buttFunc("gothciv")} 
      /></button>
*/

export default CivsList