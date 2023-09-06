const BuildOrderBox = ({unit, img}) => {

  return (
    <div>
      {unit &&
        <div>
          <h4>Core unit: {unit}</h4>
          <img src={img} 
          height="200"
          width="200"/>          
        </div>
        }
      </div>
  )
}

export default BuildOrderBox