package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Equation struct {
	values []int
	result int
}

func main() {
	equations, err := format("input.txt")
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}

	var solution1 int
	for _, eq := range equations {
		if isSolvable(eq) {
			solution1 += eq.result
		}
	}
	fmt.Println("Solution 1:", solution1)
}

func isSolvable(eq Equation) bool {
	if len(eq.values) == 1 {
		return eq.values[0] == eq.result
	}
	add := Equation{values: append([]int{eq.values[0] + eq.values[1]}, eq.values[2:]...), result: eq.result}
	mul := Equation{values: append([]int{eq.values[0] * eq.values[1]}, eq.values[2:]...), result: eq.result}
	return isSolvable(add) || isSolvable(mul)
}

func format(filename string) ([]Equation, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer func() {
		err := file.Close()
		if err != nil {
			log.Fatalf("Error closing file: %v", err)
		}
	}()

	var equations []Equation
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		var equation Equation
		parts := strings.Split(line, ": ")
		equation.result, err = strconv.Atoi(parts[0])
		if err != nil {
			log.Printf("Error converting from string to integer: %v", err)
			return nil, err
		}
		values := strings.Split(parts[1], " ")
		for _, val := range values {
			val, err := strconv.Atoi(val)
			if err != nil {
				log.Printf("Error converting from string to integer: %v", err)
				return nil, err
			}
			equation.values = append(equation.values, val)
		}
		equations = append(equations, equation)
	}
	return equations, nil
}
