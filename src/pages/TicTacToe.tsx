import { useState } from "react";

let isNextSquare = true;

interface Props {
  value: string,
  onSquareClick: () => void
}

function Square({ value, onSquareClick } : Props) {
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

export function Board() { 
  const [squares, setValue] = useState<string[]>(Array(9).fill(null))
  
  function handleClick(i: number) {
    if (squares[i])
      return

    const squaresCopy = squares.slice()
    
    if (isNextSquare) {
      squaresCopy[i] = "X"
    }
    else {
      squaresCopy[i] = "O"
    }

    isNextSquare = !isNextSquare
    setValue(squaresCopy);
  }

  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}