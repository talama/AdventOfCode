package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	puzzle, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	fmt.Println(solvePuzzle(puzzle, "XMAS"))
}

func solvePuzzle(puzzle [][]string, word string) int {
	var wordCount int
	for rowIdx, row := range puzzle {
		for colIdx := range row {
			// When we find the first letter of the word we are a looking for start searching
			if puzzle[rowIdx][colIdx] == string(word[0]) {
				wordCount += findWord(puzzle, word, rowIdx, colIdx)
			}
		}
	}
	return wordCount
}

func findWord(puzzle [][]string, word string, rowIdx, colIdx int) int {
	directions := [][]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	var wordCount int
	for _, dir := range directions {
		dr, dc := dir[0], dir[1]
		currRow, currCol := rowIdx, colIdx
		var found string

		for _, char := range word[1:] {

			currRow += dr
			currCol += dc

			if currRow < 0 || currRow >= len(puzzle) || currCol < 0 || currCol >= len(puzzle[0]) {
				break
			}

			if puzzle[currRow][currCol] != string(char) {
				break
			}
			found += string(char)
		}
		if found == word[1:] {
			wordCount += 1
		}
	}
	return wordCount
}

func format(filename string) ([][]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		log.Printf("Error opening file: %v", err)
		return nil, err
	}

	var puzzle [][]string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		puzzle = append(puzzle, strings.Split(line, ""))
	}
	return puzzle, nil
}
