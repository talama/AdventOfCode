package main

import (
	"fmt"
	"log"
	"os"
	"sort"
)

func main() {
	list1, list2, err := parseFile("input.txt")
	if err != nil {
		log.Fatalf("Error parsing file: %v", err)
	}
	solution1(list1, list2)
	solution2(list1, list2)
}

func solution1(list1 []int, list2 []int) {
	var totalDistance int
	for i, val1 := range list1 {
		distance := val1 - list2[i]
		if distance > 0 {
			totalDistance += distance
		} else {
			totalDistance += -distance
		}
	}
	fmt.Println("Solution 1:", totalDistance)
}

func solution2(list1 []int, list2 []int) {
	map2 := map[int]int{}
	score := 0

	// hash map from list2
	for _, val := range list2 {
		map2[val] += 1
	}

	for _, val := range list1 {
		score += val * map2[val]
	}

	fmt.Println("Solution 2:", score)
}

func parseFile(filename string) ([]int, []int, error) {
	// Read File
	file, err := os.Open(filename)
	if err != nil {
		return nil, nil, err
	}

	defer func() {
		if err := file.Close(); err != nil {
			log.Printf("Failed to close file: %v", err)
		}
	}()

	// For each line in the file add the first number to list1 and the second to list2
	var list1, list2 []int
	for {
		var val1, val2 int
		_, err := fmt.Fscanf(file, "%d %d\n", &val1, &val2)
		if err != nil {
			break
		}
		list1 = append(list1, val1)
		list2 = append(list2, val2)
	}

	sort.Ints(list1)
	sort.Ints(list2)
	return list1, list2, nil
}
