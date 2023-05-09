import React from "react";

export default function Die(props){


return(
    <>
<button id= { props.isHeld ? "die-clicked" : "die"} onClick={props.holdDice}>{props.value}</button>
</>


)

}