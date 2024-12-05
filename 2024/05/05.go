package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	var result int
	rules, updates, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	for _, update := range updates {
		if isSorted(update, rules) {
			mid, _ := strconv.Atoi(string(update[len(update)/2]))
			fmt.Println(mid)
			result += mid
		}
	}
	fmt.Println("Solution1:", result)
}

func isSorted(update []string, rules []string) bool {
	for i := 0; i < len(update)-1; i += 1 {
		for _, rule := range rules {
			values := strings.Split(rule, "|")
			if update[i] == values[1] && update[i+1] == values[0] {
				return false
			}
		}
	}
	return true
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
