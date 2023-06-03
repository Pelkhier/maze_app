import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Maze from "./components/Maze";

function App() {
  const [maze, setMaze] = useState({
    grid: [],
    cols: 0,
    rows: 0,
  });
  const [pathMaze, setPathMaze] = useState({
    grid: [],
    cols: 0,
    rows: 0,
  });
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [startRow, setStartRow] = useState(1);
  const [startCol, setStartCol] = useState(1);
  const [targetRow, setTargetRow] = useState(1);
  const [targetCol, setTargetCol] = useState(1);

  async function generate_maze() {
    let result = await invoke("generate_maze", {
      rows,
      columns,
      startRow: startRow - 1,
      startCol: startCol - 1,
      targetRow: targetRow - 1,
      targetCol: targetCol - 1,
    });
    setMaze(result);
  }

  async function solve_maze() {
    let result = await invoke("solve_maze", {
      maze,
      rows,
      columns,
      startRow: startRow - 1,
      startCol: startCol - 1,
      targetRow: targetRow - 1,
      targetCol: targetCol - 1,
    });
    setPathMaze(result);
  }

  function setAll() {
    setMaze({
      grid: [],
      cols: 0,
      rows: 0,
    });
    setPathMaze({
      grid: [],
      cols: 0,
      rows: 0,
    });
  }

  return (
    <div className="container my-12">
      <h1 className="text-3xl font-bold underline mt-12">Maze Solver</h1>
      <div className="flex flex-1 flex-col justify-center items-center my-12">
        <div className="flex gap-8">
          <div>
            <label>Rows: </label>
            <input
              type="number"
              min={3}
              max={20}
              value={rows}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 3 || val > 20 || isNaN(val)) return;
                setAll();
                setStartRow(1);
                setTargetRow(1);
                setRows(val);
              }}
            />
          </div>
          <div>
            <label>Columns: </label>
            <input
              type="number"
              min={3}
              max={20}
              value={columns}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 3 || val > 20 || isNaN(val)) return;
                setAll();
                setStartCol(1);
                setTargetCol(1);
                setColumns(val);
              }}
            />
          </div>
          <div>
            <label>Start Row: </label>
            <input
              type="number"
              min={1}
              max={rows}
              value={startRow}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 1 || val > rows || isNaN(val)) return;
                setAll();
                setStartRow(val);
              }}
            />
          </div>
          <div>
            <label>Start Column: </label>
            <input
              type="number"
              min={1}
              max={columns}
              value={startCol}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 1 || val > columns || isNaN(val)) return;
                setAll();
                setStartCol(val);
              }}
            />
          </div>
          <div>
            <label>Target Row: </label>
            <input
              type="number"
              min={1}
              max={rows}
              value={targetRow}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 1 || val > rows || isNaN(val)) return;
                setAll();
                setTargetRow(val);
              }}
            />
          </div>
          <div>
            <label>Target Column: </label>
            <input
              type="number"
              min={1}
              max={columns}
              value={targetCol}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (val < 1 || val > columns || isNaN(val)) return;
                setAll();
                setTargetCol(val);
              }}
            />
          </div>
        </div>

        <div className="flex gap-8 my-12">
          <button onClick={generate_maze}>Generate</button>
          <button onClick={solve_maze}>Solve</button>
        </div>
      </div>
      <div className="flex flex-row gap-8 flex-1 justify-center items-center">
        <div>
          <h2 className="text-2xl text-center mb-2">Generated Maze</h2>
          <Maze
            maze={maze}
            targetIndex={{ rowIndex: targetRow - 1, colIndex: targetCol - 1 }}
          />
        </div>
        <div>
          <h2 className="text-2xl text-center mb-2">Solved Maze</h2>
          <Maze
            maze={pathMaze}
            targetIndex={{ rowIndex: targetRow - 1, colIndex: targetCol - 1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
