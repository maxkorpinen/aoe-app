import images from '../../utils/imageloader'

const CounterBox = ({civ}) => {
  //let unitname = civ[0].unit+'.png'
  let counters = civ[0].counters.map(unit => unit+'.png')
  console.log(counters)
  return(
    <div>
      <p> Counterbox</p>
      {counters.map(unitname => 
      <img src={images.unitImages[unitname]} 
            height="200"
            width="200"/> 
        )}
    </div>
  )
}

export default CounterBox