import './index.css'

function Screen(props) {
  return (
    <div className="screen">
      <input type="text" readOnly value={props.inputValues.join('')} />
    </div>
  )
}

export default Screen
