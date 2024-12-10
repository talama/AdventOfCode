package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer file.Close()

	data, err := bufio.NewReader(file).ReadString('\n')
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	data = strings.TrimSpace(data)
	checksum := getCheckSum(data)
	fmt.Println("Solution 1:", checksum)
}

func getCheckSum(data string) int {
	var head, checksum int
	tail := len(data) - 1
	tailVal := int(data[tail] - '0')

	writeSpaces := func(spaces int) {
		for range spaces {
			if tailVal <= 0 {
				tail -= 2
				tailVal = int(data[tail] - '0')
			}
			checksum += head * (tail / 2)
			head += 1
			tailVal -= 1
		}
	}

	for i, r := range data {
		val := int(r - '0')
		if i >= tail {
			for range tailVal {
				checksum += head * (tail / 2)
				head += 1
			}
			break
		}
		if i%2 == 0 {
			for range val {
				checksum += head * (i / 2)
				head += 1
			}
		} else {
			writeSpaces(val)
		}
	}
	return checksum
}
