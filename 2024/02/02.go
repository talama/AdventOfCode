package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	reports, err := format("input.txt")
	if err != nil {
		os.Exit(-1)
	}

	var safeCount, safeRemoved int

	for _, report := range reports {
		if isSafe(report, false) {
			safeCount += 1
			safeRemoved += 1
		} else {
			if isSafe(report, true) {
				safeRemoved += 1
			}
		}
	}
	fmt.Println("Solution1:", safeCount)
	fmt.Println("Solution1:", safeRemoved)
}

// if remove == true, on failure we call safeSearch passing the index at which we failed
func isSafe(report []int, remove bool) bool {
	if len(report) == 0 {
		return false
	}
	for i := 0; i < len(report)-1; i += 1 {
		arrDir := report[0] - report[1] // positive if descending, negative ascending
		dist := report[i] - report[i+1]
		if dist*arrDir <= 0 || dist < -3 || dist > 3 {
			return remove && searchSafe(report, i)
		}
	}
	return true
}

// We try removing the element at the index where isSafe failed, the elemnt before(if it exist) and the element after that
func searchSafe(report []int, idx int) bool {
	var removeCurr, removePrev, removeNext []int
	removeCurr = slices.Delete(slices.Clone(report), idx, idx+1)
	removeNext = slices.Delete(slices.Clone(report), idx+1, idx+2)
	if idx-1 >= 0 {
		removePrev = slices.Delete(slices.Clone(report), idx-1, idx)
	}
	return isSafe(removeCurr, false) || isSafe(removeNext, false) || isSafe(removePrev, false)
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
