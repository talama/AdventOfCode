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

	var solution1 int
	var solution2 int

	for rowIdx, row := range puzzle {
		for colIdx := range row {
			if puzzle[rowIdx][colIdx] == "X" {
				solution1 += findWord(puzzle, "XMAS", rowIdx, colIdx)
			}
			if puzzle[rowIdx][colIdx] == "A" && findWordX(puzzle, "MAS", rowIdx, colIdx) {
				solution2 += 1
			}
		}
	}
	fmt.Println("Solution1:", solution1)
	fmt.Println("Solution2:", solution2)
}

// Given a [][]string and a starting point (rowIdx, rowCol), find each occurence of "word" going in all directions.
// Return the number of occurences found.
func findWord(puzzle [][]string, word string, rowIdx, colIdx int) int {
	directions := [][]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	var wordCount int

	for _, dir := range directions {
		currRow, currCol := rowIdx, colIdx
		var found bool

		for _, char := range word[1:] {
			currRow += dir[0]
			currCol += dir[1]

			if currRow < 0 || currRow >= len(puzzle) || currCol < 0 || currCol >= len(puzzle[0]) || puzzle[currRow][currCol] != string(char) {
				found = false
				break
			}
			found = true
		}
		if found {
			wordCount += 1
		}
	}
	return wordCount
}

// Given a [][]string and a starting point (rowIdx, colIdx) find if 2 occurences of the word in an X shape form exist around that point
// This implementation only works for words with an odd number of letters
func findWordX(puzzle [][]string, word string, rowIdx, colIdx int) bool {
	directions := [][]int{{-1, -1}, {-1, 1}, {1, -1}, {1, 1}}
	var found bool
	var wordCount int

	for _, dir := range directions {
		// Move in the opposite direction of dir for enough distance to move to where the beginning of the word
		halfLength := len(word) / 2
		currRow := rowIdx - (dir[0] * halfLength)
		currCol := colIdx - (dir[1] * halfLength)
		for _, char := range word {
			if currRow < 0 || currRow >= len(puzzle) || currCol < 0 || currCol >= len(puzzle[0]) || puzzle[currRow][currCol] != string(char) {
				found = false
				break
			}
			found = true
			currRow += dir[0]
			currCol += dir[1]
		}
		if found {
			wordCount += 1
		}
	}
	return wordCount == 2
}

func format(filename string) ([][]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		log.Printf("Error opening file: %v", err)
		return nil, err
	}

	defer func() {
		if err := file.Close(); err != nil {
			log.Fatalf("Failed to close file: %v", err)
		}
	}()

	var puzzle [][]string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		puzzle = append(puzzle, strings.Split(line, ""))
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return puzzle, nil
}
