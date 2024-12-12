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
	checksum1 := getCheckSum1(data)
	checksum2 := getCheckSum2(data)
	fmt.Println("Solution 1:", checksum1)
	fmt.Println("Solution 2:", checksum2)
}

func getCheckSum1(data string) int {
	var head, checksum int
	tail := len(data) - 1           // index of the last non fully moved file
	blocks := int(data[tail] - '0') // number of blocks remaining in the last non fully moved file

	for i, r := range data {
		val := int(r - '0')
		// if we reach the index of last moved file
		// finish calculating the checksum of the remaining blocks if any, then exit
		if i >= tail {
			for range blocks {
				checksum += head * (tail / 2)
				head += 1
			}
			break
		}
		// if there is a file at the current postion calculate its checksum
		if i%2 == 0 {
			for range val {
				checksum += head * (i / 2)
				head += 1
			}
		} else {
			// untill there is free space, calculate the checksum for bloks of the last non moved file
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

func getCheckSum2(disk string) int {
	var head, tail, checksum int

	// priority queue like data structure to hold free spaces idx (free space size is in range 0-9)
	// the space size is the index, and at every index we have an array of space positions ordered from left to right
	// the leftmost spaces of each size are at index 0
	spaces := make([][]int, 10)
	for i := range spaces {
		spaces[i] = make([]int, 0, 1100)
	}

	// fill the priority queue and position the tail at the end of our disk
	for i, r := range disk {
		size := int(r - '0')
		if i%2 != 0 && size > 0 {
			spaces[size] = append(spaces[size], tail)
		}
		tail += size
	}

	// we iterate from the end of the disk
	for i := len(disk) - 1; i >= 0; i -= 1 {

		// move the tail to the next position
		fileSize := int(disk[i] - '0')
		tail -= fileSize

		if i%2 != 0 {
			continue
		}

		// set the head at the tail position.
		// will use this idx to calculate the cheksum if no free spaces to the left that can hold the current file size
		head = tail
		spaceUsed := -1

		// check if spaces big enough exist to the left.
		// pick the leftmost one. if found set head position to that index, so we can use it to calculate the checksum
		for j := fileSize; j < len(spaces); j += 1 {
			if len(spaces[j]) == 0 {
				continue
			}
			firstSpace := spaces[j][0]

			if firstSpace < head {
				head = firstSpace
				spaceUsed = j
			}
		}

		// calculate checksum based on head position
		for range fileSize {
			checksum += head * (i / 2)
			head += 1
		}

		// if we used free space remove it from its heap
		// if any space is left add it to the corresponding heap and sort it based on its index
		if spaceUsed != -1 {
			spaces[spaceUsed] = spaces[spaceUsed][1:]
			spaceLeft := spaceUsed - fileSize
			if spaceLeft > 0 {
				insertSorted(spaces[spaceLeft], head)
			}
		}
	}
	return checksum
}

// Function to insert spaces sorted by their position -- leftmost space at index 0
func insertSorted(slice []int, value int) {
	i := len(slice)
	slice = append(slice, value)

	// Bubble up to maintain sorted order (lower indexes at the beginning)
	for i > 0 && slice[i-1] > value {
		slice[i] = slice[i-1]
		i -= 1
	}
	slice[i] = value
}
