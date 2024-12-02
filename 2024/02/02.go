package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	reports, err := format("input.txt")
	if err != nil {
		os.Exit(-1)
	}

	var safeCount, safeCountDamp int

	for _, report := range reports {
		if isSafe(report) {
			safeCount += 1
		}
		for i := range report {
			clone := make([]int, 0, len(report)-1)
			clone = append(clone, report[:i]...)
			clone = append(clone, report[i+1:]...)
			if isSafe(clone) {
				safeCountDamp += 1
				break
			}
		}
	}
	fmt.Println("Solution1:", safeCount)
	fmt.Println("Solution2:", safeCountDamp)
}

func isSafe(report []int) bool {
	for i := 0; i < len(report)-1; i += 1 {
		arrDir := report[0] - report[1] // positive if descending, negative ascending
		dist := report[i] - report[i+1]
		if dist*arrDir <= 0 || dist < -3 || dist > 3 {
			return false
		}
	}
	return true
}

func format(filename string) ([][]int, error) {
	file, err := os.Open(filename)
	if err != nil {
		log.Printf("Failed to open file: %v", err)
		return nil, err
	}

	defer func() {
		if err = file.Close(); err != nil {
			log.Printf("Failed to close file: %v", err)
		}
	}()

	var reports [][]int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		values := strings.Fields(line)
		ints := make([]int, len(values))
		for i, val := range values {
			ints[i], err = strconv.Atoi(val)
			if err != nil {
				log.Printf("Error converting from string to integer: %v", err)
				return nil, err
			}
		}
		reports = append(reports, ints)
	}
	return reports, nil
}
