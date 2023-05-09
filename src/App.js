import React from "react";
import Die from "./components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";





export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    function allNewDice() {
        const newArray = []
        for (let i = 0; i < 10; i++) {
            newArray.push(generateNewDie())
        }
        return (newArray)
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }


    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld } :
                die
        }))


    }

    const [count, setCount] = React.useState(0);
    const [highScore, setHighScore] = React.useState(0);
    React.useEffect(() => {
        const storedCount = localStorage.getItem('clickCount');
        const storedHighScore = localStorage.getItem('highScore');
        if (storedCount) {
            setCount(parseInt(storedCount));
        }
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('clickCount', count);
        if (count < highScore) {
            localStorage.setItem('highScore', count);
            setHighScore(count);
        }
    }, [count, highScore]);




    function rollDice() {
        setDice(olddice => olddice.map(
            die => {
                return die.isHeld ?
                    die : generateNewDie()
            }
        ))
        setCount(() => count + 1)
    }

    const diceElements = dice.map(die =>

        <
        Die key = { die.id }
        value = { die.value }
        isHeld = { die.isHeld }
        holdDice = {
            () => holdDice(die.id) }
        />
    )



    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstvalue = dice[0].value
        const checkvalue = dice.every(die => die.value === firstvalue)
        if (allHeld && checkvalue) {
            setTenzies(true)

        }
    }, [dice])


    function renewGame() {
        setDice(allNewDice())
        setTenzies(false)
        setCount(0)
    }

   

    return (

        <>
        
        <main id = "appview">
        <div id = "textarea">
        <h1> Tenzies </h1> 
         <p> Roll until all dice are the same.Click each die to freeze it at its current value between rolls. </p> 
         </div>


        <div className = "dice" > { diceElements } </div>  


        <div className = "rollbtn-div">
        <button id = "rollbtn" onClick = { tenzies ? renewGame : rollDice } > { tenzies ? "Start again" : "Roll" } </button> { tenzies && < Confetti/> }

        </div>


        </main> 
        { tenzies && <p> It took { count } rolls to win the game </p> } 
      



            </> 
        )

        

    }