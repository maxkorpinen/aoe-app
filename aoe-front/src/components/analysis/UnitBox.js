

const UnitBox = ({text, unit, imgs, seenUnit}) => {
  return(
    <div>
      {unit &&
        <div>
          <h4>{text}{unit}</h4>
          {imgs.map((img) => (
            <img key={img} src={img} //vaihda avain!!!
            height="200"
            width="200"/>
            ))}
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

export default UnitBox
