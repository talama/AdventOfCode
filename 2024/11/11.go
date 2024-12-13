package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	line, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	stones := map[int]int{}

	for _, r := range strings.Fields(string(line)) {
		stone, _ := strconv.Atoi(r)
		stones[stone] += 1
	}
	fmt.Println("Solution 1:", blink(stones, 25))
	fmt.Println("Solution 2:", blink(stones, 75))
}

func blink(stones map[int]int, blinks int) int {
	for range blinks {
		updated := map[int]int{}
		for stone, numStones := range stones {
			if numStones == 0 {
				continue
			}
			if stone == 0 {
				updated[1] += numStones
			} else if s := strconv.Itoa(stone); len(s)%2 == 0 {
				n1, _ := strconv.Atoi(s[:len(s)/2])
				n2, _ := strconv.Atoi(s[len(s)/2:])
				updated[n1] += numStones
				updated[n2] += numStones
			} else {
				updated[stone*2024] += numStones
			}
		}
		stones = updated
	}
	var count int
	for _, numStones := range stones {
		count += numStones
	}
	return count
}
