const RollTracker = (props) => {
    return ( 
        <div className="status-card">
            <h3 className="status">Rolls: {props.rolls}</h3>
        </div>
     );
}
 
export default RollTracker;