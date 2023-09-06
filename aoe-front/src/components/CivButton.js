const CivButton = (props) => {
  const {image, name, buttFunc} = props
  return (
    <button key={name}>
      <img src={image}
      alt = {name}
      onClick={()=> buttFunc(name)}
      width={100}
      height={100}/>
    </button>
  )
}

export default CivButton