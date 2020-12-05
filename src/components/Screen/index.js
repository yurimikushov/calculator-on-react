import './index.css'
import DarkModeButton from './../DarkModeButton'

export default function Screen(props) {
  return (
    <div className='screen'>
      <DarkModeButton />
      <span>{props.previewResult}</span>
      <input type='text' value={props.result} placeholder='0' readOnly />
    </div>
  )
}
