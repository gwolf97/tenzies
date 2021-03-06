import React from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import RollTracker from './components/RollTracker';
import Timer from './components/Timer';
import BestTime from './components/BestTime';

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  const [winTime, setWinTime] = React.useState({
    minutes: seconds,
    seconds: minutes
  })
  const [bestTime, setBestTime] = React.useState({
      minutes: 99,
      seconds: 99
    })

  React.useEffect(() => {
    const data = localStorage.getItem("best-time")
    if (data){
      setBestTime(JSON.parse(data))
    }
  }, [])

  React.useEffect(() => {
  localStorage.setItem("best-time", JSON.stringify(bestTime));
  }, [bestTime]);

  React.useEffect(() => {
   const allHeld = dice.every(die => die.isHeld)
   const firstValue = dice[0].value 
   const allSameValue = dice.every(die => die.value === firstValue)
   if(allHeld && allSameValue){
     setTenzies(true)
     console.log("you won!")
    if(winTime.minutes <= bestTime.minutes && winTime.seconds < bestTime.seconds){
      setTimeout(() => setBestTime({
        minutes: winTime.minutes,
        seconds: winTime.seconds + 1
      }), 1000)
    }
   }
  }, [dice])


  React.useEffect(() => {
    const timer = seconds > -1 && setTimeout(() => setSeconds(seconds + 1), 1000);
    tenzies && clearTimeout(timer)
    if(seconds === 60){
      setMinutes(prevMin => prevMin + 1)
      setSeconds(0)
    }
    
    setWinTime({
      minutes: minutes,
      seconds: seconds
    })
  }, [seconds]);



  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie(){
    return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
         }
  }

  function holdDice(id) {
    setDice(prevDie => prevDie.map(die => {
      return die.id === id ? {...die, isHeld:!die.isHeld} : die
    }))
  }

  
  const diceElements = dice.map(die => <Die id={die.id} holdDice={() => holdDice(die.id)} isHeld={die.isHeld} value={die.value}/>)

  function rollDice(){
    setRolls(prevRoll => prevRoll + 1)
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie() 
    }))
  }

  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
    setRolls(0)
    setSeconds(0)
    setMinutes(0)
  }

  return (
    <>
     <main>
       {tenzies && <Confetti/>}
       <h1 className="title">Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
       <div className="dice-container">
       {diceElements}
       </div>
       {tenzies ? <button onClick={newGame} className="roll-btn">New Game</button> : <button className="roll-btn" onClick={rollDice}>Roll</button>}
     </main>
     <div className="status-container">
       <RollTracker rolls={rolls}/>
       <Timer minutes={minutes} seconds={seconds} winMin={winTime.minutes} winSec={winTime.seconds} tenzies={tenzies}/>
       <BestTime bestMin={bestTime.minutes} bestSec={bestTime.seconds}/>
     </div>
     </>
  );
}

export default App;
