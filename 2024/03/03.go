package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
)

func main() {
	memory, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatalf("Failed to open file: %v", err)
	}

	var result int
	muls := parseMemory(string(memory))
	for _, mul := range muls {
		var a, b int
		fmt.Sscanf(mul, "mul(%d,%d)", &a, &b)
		result += a * b
	}
	fmt.Println("Solution1:", result)
}

func parseMemory(memory string) []string {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	matches := re.FindAllString(memory, -1)
	return matches
}
