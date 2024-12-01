package main

import (
	"testing"
)

func TestPart1(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  int
	}{
		{"example", "test.txt", 11},
		{"actual", "input.txt", 1830467},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			list1, list2, err := parseFile(tt.input)
			if err != nil {
				t.Errorf("Could not read file %v", err)
			}
			if got := solution1(list1, list2); got != tt.want {
				t.Errorf("got %d, want %d", got, tt.want)
			}
		})
	}
}

func TestPart2(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  int
	}{
		{"example", "test.txt", 31},
		{"actual", "input.txt", 26674158},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			list1, list2, err := parseFile(tt.input)
			if err != nil {
				t.Errorf("Could not read file %v", err)
			}
			if got := solution2(list1, list2); got != tt.want {
				t.Errorf("got %d, want %d", got, tt.want)
			}
		})
	}
}
