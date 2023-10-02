import images from '../../utils/imageloader'

const CounterBox = ({civ, setSeenUnit, text}) => {
  //let unitname = civ[0].unit+'.png'
  let counters = civ[0].counters.map(unit => unit+'.png')
  console.log(counters)

  const seeUnit = (unitname) => {
    setSeenUnit(unitname)
  }
  return(
    <div>
      <p> {text} </p>
      {counters.map(unitname => 
        <button key={unitname}>
          <img key={unitname} 
            src={images.unitImages[unitname]} 
            height="200"
            width="200"
            onClick={() => seeUnit(unitname)}/>
        </button>
        )}
    </div>
  )
}

export default CounterBox