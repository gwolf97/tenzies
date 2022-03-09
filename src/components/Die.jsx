import { render } from '@testing-library/react'


const Die = (props) => {

    let styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    function renderDie(){
        if(props.value === 1){
            return <div className="pip"></div>
        }else if(props.value === 2){
            return (
               <> 
                <div className="pip"></div><div className="pip"></div>
                </>
            )
        }else if(props.value === 3){
            return (
               <> 
                <div className="pip"></div><div className="pip"></div><div className="pip"></div>
                </>
            )
        }else if(props.value === 4){
            return (
               <> 
                <div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div>
                </>
            )
        }else if(props.value === 5){
            return (
               <> 
                <div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div>
                </>
            )
        }else if(props.value === 6){
            return (
               <> 
                <div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div><div className="pip"></div>
                </>
            )
        }
    }

    return (
        <>
        <div onClick={props.holdDice} className="real-die" style={styles}>
        {renderDie()}
        </div>
        </>
     );
}
 
export default Die;