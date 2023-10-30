import images from '../../utils/imageloader'

const CounterBox = ({pu, setSeenUnit, text, suppUnits}) => {
  if (typeof pu === typeof [] && pu.length === 0) {
    return
  }
  let counters = suppUnits.map(unit => unit+'.png')
  const seeUnit = (unitname) => {
    setSeenUnit(unitname)
  }
  return(
    <div>
      <p> {text} </p>
      {counters.map(unitname => 
        <button key={unitname}>
          <img key={unitname+""} 
            src={images.unitImages[unitname]} 
            height="200"
            width="200"
            alt=""
            onClick={() => seeUnit(unitname)}/>
        </button>
        )}
    </div>
  )
}

export default CounterBox