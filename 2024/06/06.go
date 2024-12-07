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
	walked := walk(grid, start, image.Point{-1, -1})
	fmt.Println("Solution1:", len(walked))

	var loops int
	for obstacle := range walked {
		if obstacle == start {
			continue
		}
		if walk(grid, start, obstacle) == nil {
			loops += 1
		}
	}
	fmt.Println("Solution2:", loops)
}

func walk(grid map[image.Point]rune, start image.Point, obstacle image.Point) map[image.Point]int {
	dirs := []image.Point{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	walked := map[image.Point]int{}
	position := start
	var currDir int

	for {
		if _, ok := grid[position]; !ok {
			return walked
		}
		// if we already visited from the same direction => loop
		if 1<<currDir&walked[position] != 0 {
			return nil
		}

		// keep track of which directions we visited the position from
		walked[position] |= 1 << currDir

		// Find next position and if needed next direction
		next := position.Add(dirs[currDir])
		for grid[next] == '#' || next == obstacle {
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
