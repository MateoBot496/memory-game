export default function Card({text, handleNumerosSeleccionados}){

    //console.log(text);
    return(
        <div className="objectCard" onClick = {handleNumerosSeleccionados}>{text}</div>
    )
}