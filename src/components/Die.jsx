const Die = (props) => {

    let styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
        <>
        <div onClick={props.holdDice} className="die-container" style={styles}>
            <p className="die-num" value={props.value}>{props.value}</p>
        </div>
        </>
     );
}
 
export default Die;