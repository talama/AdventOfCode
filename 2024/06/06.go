package main

import (
	"bufio"
	"fmt"
	"image"
	"log"
	"os"
)

func main() {
	grid, start, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	walked := walk(grid, start)
	fmt.Println("Solution1:", len(walked))
}

func walk(grid map[image.Point]rune, start image.Point) map[image.Point]rune {
	dirs := []image.Point{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	walked := map[image.Point]rune{}

	position := start
	var currDir int

	for {
		if _, ok := grid[position]; !ok {
			return walked
		}
		walked[position] = grid[position]
		next := position.Add(dirs[currDir])
		for grid[next] == '#' {
			currDir = (currDir + 1) % len(dirs)
			next = position.Add(dirs[currDir])
		}
		position = next
	}
}

func format(filename string) (map[image.Point]rune, image.Point, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, image.Point{}, err
	}

	defer func() {
		err := file.Close()
		if err != nil {
			log.Fatalf("Error closing file: %v", err)
		}
	}()

	scanner := bufio.NewScanner(file)
	var row int
	grid := map[image.Point]rune{}
	start := image.Point{}
	for scanner.Scan() {
		line := scanner.Text()
		for col, r := range line {
			if r == '^' {
				start = image.Point{col, row}
			}
			grid[image.Point{col, row}] = r
		}
		row += 1
	}
	return grid, start, nil
}
