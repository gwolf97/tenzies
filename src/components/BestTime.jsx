const BestTime = (props) => {
    return ( 
        <div className="status-card">
            <h3 className="status">Best Time: {props.bestMin}:{props.bestSec < 10 && 0}{props.bestSec}</h3>
        </div>
     );
}
 
export default BestTime;