import './index.css'

function Screen(props) {
  return (
    <div className="screen">
      <span>{props.result}</span>
      <input type="text" value={props.input.join('')} placeholder="0" readOnly />
    </div>
  )
}

export default Screen
