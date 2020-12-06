import './index.css'
import DarkModeButton from './../DarkModeButton'

export default function Screen(props) {
  return (
    <div className='screen'>
      <DarkModeButton />
      <span className='screen__preview-result'>{props.previewResult}</span>
      <input
        className='screen__result'
        type='text'
        value={props.result}
        placeholder='0'
        readOnly
      />
    </div>
  )
}
