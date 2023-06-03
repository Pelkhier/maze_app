use rand::seq::SliceRandom;
use rand::thread_rng;
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Debug, PartialEq, Copy, Clone, Serialize, Deserialize)]
pub enum Cell {
    Wall,
    Passage,
    Start,
    Target,
    Path,
}

impl fmt::Display for Cell {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let symbol = match self {
            Cell::Wall => "#",
            Cell::Passage => " ",
            Cell::Start => "S",
            Cell::Target => "T",
            Cell::Path => "*",
        };
        write!(f, "{}", symbol)
    }
}
#[derive(Serialize, Deserialize)]
pub struct Maze {
    pub grid: Vec<Vec<Cell>>,
    pub rows: usize,
    pub cols: usize,
}

impl Maze {
    pub fn new(rows: usize, cols: usize) -> Self {
        let grid = vec![vec![Cell::Wall; cols]; rows];
        Maze { grid, rows, cols }
    }

    pub fn generate_maze(
        &mut self,
        start_row: usize,
        start_col: usize,
        target_row: usize,
        target_col: usize,
    ) {
        self.grid[start_row][start_col] = Cell::Start;
        self.grid[target_row][target_col] = Cell::Target;
        self.dfs(start_row, start_col);
    }

    fn dfs(&mut self, row: usize, col: usize) {
        let directions = vec![(0, -1), (0, 1), (-1, 0), (1, 0)];
        let mut rng = thread_rng();
        let mut directions = directions.choose_multiple(&mut rng, 4);

        for (dx, dy) in directions {
            let new_row = row as isize + 2 * dx;
            let new_col = col as isize + 2 * dy;
            let wall_row = row as isize + dx;
            let wall_col = col as isize + dy;

            if self.is_valid_cell(new_row as usize, new_col as usize)
                && self.grid[new_row as usize][new_col as usize] == Cell::Wall
            {
                self.grid[new_row as usize][new_col as usize] = Cell::Passage;
                self.grid[wall_row as usize][wall_col as usize] = Cell::Passage;
                self.dfs(new_row as usize, new_col as usize);
            }
        }
    }

    fn is_valid_cell(&self, row: usize, col: usize) -> bool {
        row < self.rows && col < self.cols
    }

    pub fn solve_maze(
        &mut self,
        start_row: usize,
        start_col: usize,
        target_row: usize,
        target_col: usize,
    ) -> bool {
        let mut visited = vec![vec![false; self.cols]; self.rows];
        self.find_path(start_row, start_col, target_row, target_col, &mut visited)
    }

    fn find_path(
        &mut self,
        row: usize,
        col: usize,
        target_row: usize,
        target_col: usize,
        visited: &mut Vec<Vec<bool>>,
    ) -> bool {
        if row == target_row && col == target_col {
            return true;
        }

        visited[row][col] = true;

        let directions = vec![(0, -1), (0, 1), (-1, 0), (1, 0)];

        for (dx, dy) in directions {
            let new_row = row as isize + dx;
            let new_col = col as isize + dy;

            if self.is_valid_cell(new_row as usize, new_col as usize)
                && !visited[new_row as usize][new_col as usize]
                && self.grid[new_row as usize][new_col as usize] != Cell::Wall
            {
                if self.find_path(
                    new_row as usize,
                    new_col as usize,
                    target_row,
                    target_col,
                    visited,
                ) {
                    self.grid[new_row as usize][new_col as usize] = Cell::Path;
                    return true;
                }
            }
        }

        false
    }

    pub fn print(&self) {
        for row in &self.grid {
            for cell in row {
                print!("{}", cell);
            }
            println!();
        }
    }
}
