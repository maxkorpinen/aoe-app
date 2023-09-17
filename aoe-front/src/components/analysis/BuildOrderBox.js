const BuildOrderBox = ({unit, img, seenUnit}) => {

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
        {seenUnit &&
        <div>
          <p>{seenUnit}</p>
        </div>
        }
      </div>
  )
}

export default BuildOrderBox