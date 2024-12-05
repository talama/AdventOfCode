package main

import (
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	var solution1, solution2 int
	rules, updates, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}

	cmp := func(a, b string) int {
		for _, rule := range rules {
			values := strings.Split(rule, "|")
			if values[0] == a && values[1] == b {
				return -1
			}
		}
		return 0
	}

	for _, update := range updates {
		if slices.IsSortedFunc(update, cmp) {
			mid, _ := strconv.Atoi(string(update[len(update)/2]))
			solution1 += mid
		} else {
			slices.SortFunc(update, cmp)
			mid, _ := strconv.Atoi(string(update[len(update)/2]))
			solution2 += mid
		}
	}
	fmt.Println("Solution1:", solution1)
	fmt.Println("Solution2:", solution2)
}

func format(filename string) ([]string, [][]string, error) {
	input, err := os.ReadFile(filename)
	if err != nil {
		return nil, nil, err
	}

	parts := strings.Split(strings.TrimSpace(string(input)), "\n\n")
	rules := strings.Split(parts[0], "\n")
	var updates [][]string
	for _, line := range strings.Split(parts[1], "\n") {
		updates = append(updates, strings.Split(line, ","))
	}
	return rules, updates, nil
}
