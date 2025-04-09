function Difficulty({handleDifficulty}){
    return(
        <div className="difficulty row gap">
            <button value="easy" onClick={handleDifficulty}>Easy</button>
            <button value="medium" onClick={handleDifficulty}>Medium</button>
            <button value="hard" onClick={handleDifficulty}>Hard</button>
        </div>
    )
}
export default Difficulty