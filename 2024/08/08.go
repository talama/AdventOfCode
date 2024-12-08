package main

import (
	"bufio"
	"fmt"
	"image"
	"log"
	"os"
)

func main() {
	locations, antennas, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}

	solution1 := map[image.Point]rune{}
	solution2 := map[image.Point]rune{}

	for _, antenna := range antennas {
		for _, a := range antenna {
			for _, b := range antenna {
				if a == b {
					continue
				}
				distAB := b.Sub(a)
				next := b.Add(distAB)
				if locations[next] {
					solution1[next] = '#'
				}
				for locations[b] {
					solution2[b] = '#'
					b = b.Add(distAB)
				}
			}
		}
	}

	fmt.Println("Solution 1:", len(solution1))
	fmt.Println("Solution 2:", len(solution2))
}

func format(filename string) (map[image.Point]bool, map[rune][]image.Point, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, nil, err
	}

	defer func() {
		err := file.Close()
		if err != nil {
			log.Printf("Error closing file: %v", err)
			return
		}
	}()

	locations := map[image.Point]bool{}
	antennas := map[rune][]image.Point{}
	var row int

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		for col, r := range line {
			if r != '.' {
				antennas[r] = append(antennas[r], image.Point{col, row})
			}
			locations[image.Point{col, row}] = true
		}
		row += 1
	}
	if err := scanner.Err(); err != nil {
		log.Printf("Error reading file: %v", err)
		return nil, nil, err
	}

	return locations, antennas, nil
}
