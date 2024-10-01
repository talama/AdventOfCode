package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"unicode"
)

var digits = map[string]string{"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var solution1, solution2 int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		// Solution 1
		first := findNum(line, "start", false)
		last := findNum(line, "end", false)
		num, err := strconv.Atoi(first + last)
		if err != nil {
			log.Fatal(err)
		}
		solution1 += num

		// Solution 2
		firstWord := findNum(line, "start", true)
		lastWord := findNum(line, "end", true)
		num, err = strconv.Atoi(firstWord + lastWord)
		if err != nil {
			log.Fatal(err)
		}
		solution2 += num
	}
	fmt.Printf("Solution1: %d\n", solution1)
	fmt.Printf("Solution2: %d\n", solution2)
}

func findNum(line string, direction string, word bool) string {
	runeLine := []rune(line)
	lenght := len(runeLine) - 1
	var start, end int

	// for loop parameters dependign on which side of the string we start from
	switch direction {
	case "start":
		start, end = 0, lenght
	case "end":
		start, end = -lenght, 0
	default:
		log.Fatal("Wrong direction")
	}

	var buf string
	for i := start; i <= end; i += 1 {
		idx := i
		// if we start from end of the string make sure we use a positive index
		if i < 0 {
			idx = -i
		}
		char := string(runeLine[idx])
		// if we find a number return it
		if unicode.IsDigit(runeLine[idx]) {
			return char
		}

		// if we are looking for numbers in word form too, add chars to buf and check for suffix or affix
		// depending from which side of the string we are looking
		if word {
			if direction == "start" {
				buf += char
			} else {
				buf = char + buf
			}
			for k, v := range digits {
				if direction == "start" && strings.HasSuffix(buf, k) {
					return v
				} else if strings.HasPrefix(buf, k) {
					return v
				}
			}
		}
	}
	return "0"
}
