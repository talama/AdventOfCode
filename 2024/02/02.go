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

	fmt.Println("Solution1:", solution1(reports))
}

func solution1(reports [][]int) int {
	var safeCount int
	for _, report := range reports {
		ascending := true
		descending := true
		for j := 1; j < len(report); j += 1 {
			if report[j] <= report[j-1] || (report[j]-report[j-1]) > 3 {
				ascending = false
			}
			if report[j] >= report[j-1] || (report[j-1]-report[j]) > 3 {
				descending = false
			}
		}
		if ascending || descending {
			safeCount += 1
		}
	}
	return safeCount
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
