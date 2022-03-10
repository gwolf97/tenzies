const Timer = (props) => {
    return ( 
        <div className="status-card">
        {props.tenzies ?<h3 className="status">Win Time: {props.winMin}:{props.winSec < 10 && 0}{props.winSec}</h3>: <h3 className="status">Timer: {props.minutes}:{props.seconds < 10 && 0}{props.seconds}</h3>}
    </div>
     );
}
 
export default Timer;