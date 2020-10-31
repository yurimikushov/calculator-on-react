import './index.css'

function Tablo(props) {
  return (
    <div className="tablo">
      <input type="text" readOnly value={props.tabloValues.join('')} />
    </div>
  )
}

export default Tablo
