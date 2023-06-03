import React from "react";

const Maze = ({ maze, targetIndex }) => {
  console.log(maze);
  const which_is_it = (cell, i, j) => {
    let style = "";
    if (
      cell == "Target" ||
      (targetIndex?.rowIndex == i && targetIndex?.colIndex == j)
    ) {
      console.log(targetIndex, j, i);
      style = "bg-yellow-500";
    } else if (cell == "Start") {
      style = "bg-green-500";
    } else if (cell === "Wall") {
      style = "bg-red-700 border-2 border-red-500";
    } else if (cell == "Path") {
      style = "bg-blue-500";
    }

    return (
      <div key={j} className={`w-6 h-6 inline-block m-0 ${style}`}>
        {/* {targetIndex?.rowIndex == i && targetIndex?.colIndex == j && "T"} */}
      </div>
    );
  };
  return (
    <div className={`border-2 border-white inline-block`}>
      {maze?.grid.length > 0 && (
        <>
          {maze?.grid.map((row, i) => (
            <div key={i} className="m-0 p-0 h-6">
              {row?.map((cell, j) => which_is_it(cell, i, j))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Maze;
