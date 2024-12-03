package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
)

func main() {
	memory, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatalf("Failed to open file: %v", err)
	}

	muls := parseMemory(string(memory))
	fmt.Println("Solution1:", sumMemory(muls))

	muls = parseMemory(filterMemory(string(memory)))
	fmt.Println("Solution2:", sumMemory(muls))
}

func parseMemory(memory string) []string {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	matches := re.FindAllString(memory, -1)
	return matches
}

func filterMemory(memory string) string {
	re := regexp.MustCompile(`(?s)(?:^|do\(\)).*?(?:don't\(\)|$)`)
	filtered := strings.Join(re.FindAllString(string(memory), -1), "")
	return filtered
}

func sumMemory(muls []string) int {
	var result int
	for _, mul := range muls {
		var a, b int
		fmt.Sscanf(mul, "mul(%d,%d)", &a, &b)
		result += a * b
	}
	return result
}
