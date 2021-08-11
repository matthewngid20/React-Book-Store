import '../styles/spinner.css'
export function Spinner( props ) {
  return(
  <div 
    className="spinner-body" 
    style={{minHeight:'100%',display:"grid",placeItems:"center",fontSize: props.size + "px",color:"#cccccc"}}
  >
    <i className="fas fa-circle-notch spinner"></i>
  </div>
  )
}