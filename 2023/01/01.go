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

	scanner := bufio.NewScanner(file)
	var sum, sumWord int
	for scanner.Scan() {
		line := scanner.Text()

		// Solution 1
		first, last := findNum(line, false)
		fmt.Println(first, last)
		num, err := strconv.Atoi(first + last)
		if err != nil {
			log.Fatal()
		}
		sum += num

		// Solution 2
		first, last = findNum(line, true)
		num, err = strconv.Atoi(first + last)
		if err != nil {
			log.Fatal()
		}
		sumWord += num
	}
	fmt.Printf("Solution 1: %d\n", sum)
	fmt.Printf("Solution 2: %d\n", sumWord)
}

// Find numbers in line, if word = true consider numbers in word form too ("one", "two" ...)
func findNum(line string, word bool) (first, last string) {
	// iterate from beginning of line until we find a number
	for i, r := range line {
		if unicode.IsDigit(r) {
			first = string(r)
			break
		} else if word {
			for key, val := range digits {
				if strings.HasPrefix(line[i:], key) {
					first = val
					break
				}
			}
			if first != "" {
				break
			}
		}
	}

	// If we went the whole string without finding a number we can return now (return 0 for both value)
	if first == "" {
		first = "0"
		last = "0"
		return
	}

	// iterate from the end of line until we find a number
	runeLine := []rune(line)
	for i := len(runeLine) - 1; i >= 0; i -= 1 {
		if unicode.IsDigit(runeLine[i]) {
			last = string(runeLine[i])
			break
		} else if word {
			for key, val := range digits {
				if strings.HasSuffix(line[:i+1], key) {
					last = val
					break
				}
			}
			if last != "" {
				break
			}
		}
	}
	return
}
