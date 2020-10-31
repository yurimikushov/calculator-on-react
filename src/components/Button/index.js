function Button(props) {
  const width = props.width ? props.width : '100px'
  const height = props.height ? props.height : '100px'

  return (
    <button onClick={props.onClick} style={{ width: width, height: height }}>
      {props.title}
    </button>
  )
}

export default Button
