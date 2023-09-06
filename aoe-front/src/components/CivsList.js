import { useState } from 'react'
import images from "../utils/imageloader"
import civService from "../services/civs"
import CivButton from "./CivButton"

const CivsList = (props) => { //{changePage}
  const {changePage, civ1, civ2, setCiv1, setCiv2} = props
  const imageNames = Object.keys(images.civImages)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0]
    console.log("buttFunc,", chosenCiv)
    const ids = {
      'mongols': 5,
      'britons': 1,
      'goths': 3,
      'franks': 2,
      'mayans':4
    }
    civService.getCiv(ids[chosenCiv]).then(civ => {
      if (isEmpty(civ1[0])){
        setCiv1([{ civ: chosenCiv, unit: civ.unit }])
        return
      }
      if (isEmpty(civ2[0])) {
        setCiv2([{ civ: chosenCiv, unit: civ.unit }])
      }
      changePage('civguide')
    })

    console.log("civ1", civ1)
  } 

  const isEmpty = (object) => {
    if ( object == null) {
      return true
    }
    return Object.keys(object).length===0
  }

  return (
    <div>
      {isEmpty(civ1[0]) &&
      <p>Choose your civ </p>
      }
      {!isEmpty(civ1) &&
      <p>Your civ: {civ1[0].civ}. Choose opponents civ!</p>
      }
      <div>
        {imageNames.map((n) => (
          <CivButton
            key={n}
            name={n}
            image={images.civImages[n]} //imageObj[n]
            buttFunc={buttFunc}
          />
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