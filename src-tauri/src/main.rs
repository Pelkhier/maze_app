// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)]

mod maze;
use maze::Maze;

#[tauri::command]
fn generate_maze(
    rows: usize,
    columns: usize,
    start_row: usize,
    start_col: usize,
    target_row: usize,
    target_col: usize,
) -> Maze {
    let mut maze = Maze::new(rows, columns);
    maze.generate_maze(start_row, start_col, target_row, target_col);
    maze
}

#[tauri::command]
fn solve_maze(
    mut maze: Maze,
    start_row: usize,
    start_col: usize,
    target_row: usize,
    target_col: usize,
) -> Maze {
    maze.solve_maze(start_row, start_col, target_row, target_col);
    maze
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_maze, solve_maze])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
