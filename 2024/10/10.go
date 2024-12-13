package main

import (
	"bufio"
	"fmt"
	"image"
	"log"
	"os"
)

func main() {
	grid := format("input.txt")
	var solution1, solution2 int
	for point := range grid {
		if grid[point] == '0' {
			solution1 += dfs(grid, point, map[image.Point]bool{})
			solution2 += dfs(grid, point, nil)
		}
	}
	fmt.Println("Solution 1:", solution1)
	fmt.Println("Solution 2:", solution2)
}

func dfs(grid map[image.Point]rune, point image.Point, visited map[image.Point]bool) (score int) {
	if grid[point] == '9' {
		if visited[point] {
			return 0
		}
		if visited != nil {
			visited[point] = true
		}
		return 1
	}

	dirs := []image.Point{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	for _, dir := range dirs {
		adj := point.Add(dir)
		if grid[adj] == grid[point]+1 {
			score += dfs(grid, adj, visited)
		}
	}
	return score
}

func format(filename string) map[image.Point]rune {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer file.Close()

	grid := map[image.Point]rune{}
	var row int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		for col, r := range line {
			grid[image.Point{col, row}] = r
		}
		row += 1
	}
	return grid
}
