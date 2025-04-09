import Card from './card'
import { useEffect, useState } from 'react'
export default function Game({difficulty}){
    const [numeros, setNumeros] = useState([])
    const [roundNumbers, setRoundNumbers] = useState([])
    const [rondaActual, setRondaActual] = useState(1)
    const [numerosSeleccionados, setNumerosSeleccionados] = useState([])
    const [estado, setEstado] = useState("inicio")
    const [mensajeFinal, setMensajeFinal] = useState("Has ganado!")

    const handleNumeros = (array) => {
        setNumeros(array)
    }
    
    const handleNumerosSeleccionados = (e) => {
        let numero = Number(e.target.innerText);
        
        
        if (!numerosSeleccionados.includes(numero)){

            setNumerosSeleccionados((prevSeleccionados) => [...prevSeleccionados, numero]);
            let x = rondaActual + 1;
            setRondaActual(x)
        }
        else{
            setBase(); // ESTA FUNCION ES PARA CUANDO HAS PERDIDO
            setMensajeFinal("Has perdido! :( ");
            setEstado("final");
            
        }  
    }   

    const setBase = () => {
        
        setNumeros([]);
        setRoundNumbers([]);
        setRondaActual(1);
        setNumerosSeleccionados([])
        setMensajeFinal("Has ganado!");
    }
    

    let num = 0
    let rondas = 0  

    if (difficulty == "easy"){
        num = 3
        rondas = 6
    }
    if (difficulty == "medium"){
        num = 5
        rondas = 8
    }
    if (difficulty == "hard"){
        num = 7
        rondas = 10
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateNumbers(min,max,rondas){//esta funcion genera x numeros aleatorios distintos igual a las rondas
        let unique = new Set();

        while(unique.size < rondas){
            let random = randomNumber(min, max)
            unique.add(random)
        }

        return [...unique];  // Convertimos el Set en un Array
    } 

    
    function cogerNumerosAleatorios(num, rondas){ //ESTA FUNCION COGE NUMEROS ALEATORIOS DE "NUMEROS" Y SE ASEGURA DE QUE NO AL MENOS 1 NO HAYA SIDO COGIDOS
        
        
            let x = generateNumbers(0, rondas-1, num)
            for(let i = 0; i < x.length; i++){
                if(!numerosSeleccionados.includes(numeros[x[i]])){
                    return x;
                }
            }
            return [];
        
    }

    function iniciarJuego() { // ESTA FUNCION INIA EL JUEGO
        setEstado("juego");
        setRondaActual(1);
        // Aquí puedes añadir más resets si hacen falta
    }

    function restart(){
        setBase();
        setEstado("inicio");
    }
    
    useEffect(() => { // ESTA FUNCION COGE NUMEROS ALEATORIOS 1 - RONDAS PARA CADA NUEVA RONDA
        if (numeros.length === 0) return
        let nuevaRonda = [];
        while(nuevaRonda.length == 0){
            nuevaRonda = cogerNumerosAleatorios(num, rondas);
            if (rondaActual > rondas){
                break;
            }
        }
        
        setRoundNumbers(nuevaRonda)
    },[numeros,numerosSeleccionados])

    useEffect(() => { //ESTA FUNCION METE NUMEROS ALEATORIO EN "NUMEROS"
        let numerosAleatorios = generateNumbers(10,99,rondas);
        handleNumeros(numerosAleatorios); // con esto ya tenemos los numeros de la ronda
    }, [rondas])

    useEffect(() => { // INICIA EL JUEGO AL ELEGIR UNA DIFICULTAD
        if (difficulty) {
            iniciarJuego();
        }
        
    }, [difficulty]);

    useEffect(() => {   // ESTA FUNCION OCULTA EL MENU DIFICULTAD CUANDO EL ESTADO NO ES "INICIO"
        if(estado != "inicio"){
            let div_dificultad = document.querySelector(".difficulty");
            div_dificultad.classList.add("hidden");
        }else{
            let div_dificultad = document.querySelector(".difficulty");
            div_dificultad.classList.remove("hidden");
        }
    }, [estado])
    

    useEffect(() => { //GANA EL JUEGO 
        if(rondaActual > rondas && rondas > 0){
            setBase();
            setEstado("final");
            setMensajeFinal("Has ganado!");
        }
    }, [rondaActual])

    //PRUEBAS VARIAS

    /*useEffect(() => {
        console.log(estado);
        console.log(rondaActual);
    })*/

    if(estado == "inicio"){
        return(
            <>
            <div className='column gap'>
                    <div style={{marginTop: "2vh"}}> Choose a difficulty </div>
                        <p className='descripcion'>
                        The goal of the game is to remember and select a sequence of numbers shown in each round. As you progress, the number of rounds and difficulty increase. You must avoid selecting a repeated number to win!
                        </p>
            </div>
                
            </>
            

        )
    }



    if(estado == "juego"){
        return(
            <div className="game column" >
                <div>Ronda {rondaActual} / {rondas}</div>
                <div className='row'>
                    {            
                    roundNumbers.map((rng,i) => {
                        return <Card key = {i} text={numeros[rng]} handleNumerosSeleccionados={handleNumerosSeleccionados}/>
                    })}
                </div>

            </div>
        )
    }

    if(estado == "final"){
        return(
            <div className='column gap'>
                <p className={`mensajefinal ${mensajeFinal.includes("ganado") ? 'win' : 'lose'}`}>{mensajeFinal}</p>
                <button onClick={restart}>Restart</button>
            </div>
        )
    }
    
}