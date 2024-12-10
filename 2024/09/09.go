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
	tail := len(data) - 1           // index of the last non fully moved file
	blocks := int(data[tail] - '0') // number of blocks remaining in the last non fully moved file

	for i, r := range data {
		val := int(r - '0')
		// if we reach the index of last moved file
		// finish moving the remaining blocks if any, then exit
		if i >= tail {
			for range blocks {
				checksum += head * (tail / 2)
				head += 1
			}
			break
		}
		// if there is a file at the current postion write it
		if i%2 == 0 {
			for range val {
				checksum += head * (i / 2)
				head += 1
			}
		} else {
			// if there is free space, write blocks from the last non fully moved file
			// if we run out of blocks, move the tail to the next file
			for range val {
				if blocks <= 0 {
					tail -= 2
					blocks = int(data[tail] - '0')
				}
				checksum += head * (tail / 2)
				head += 1
				blocks -= 1
			}
		}
	}
	return checksum
}
