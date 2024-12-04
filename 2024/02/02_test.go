package main

import (
	"testing"
)

func TestPart1(t *testing.T) {
	tests := []struct {
		name  string
		input []int
		want  bool
	}{
		{"safeAscending", []int{1, 3, 6, 7, 9}, true},
		{"safeDescending", []int{7, 6, 4, 2, 1}, true},
		{"unsafeAscending", []int{1, 2, 7, 8, 9}, false},
		{"unsafeDescending", []int{9, 7, 6, 2, 1}, false},
		{"unsafeNoIncrease", []int{8, 6, 4, 4, 1}, false},
		{"unsafeNotSorted", []int{1, 3, 2, 4, 5}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isSafe(tt.input, false); got != tt.want {
				t.Errorf("got %t, want %t", got, tt.want)
			}
		})
	}
}

func TestPart2(t *testing.T) {
	tests := []struct {
		name  string
		input []int
		want  bool
	}{
		{"safeAscending", []int{1, 3, 6, 7, 9}, true},
		{"safeDescending", []int{7, 6, 4, 2, 1}, true},
		{"unsafeAscending", []int{1, 2, 7, 8, 9}, false},
		{"unsafeDescending", []int{9, 7, 6, 2, 1}, false},
		{"safeRemoved 4", []int{8, 6, 4, 4, 1}, true},
		{"safeRemoved 3", []int{1, 3, 2, 4, 5}, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isSafe(tt.input, true); got != tt.want {
				t.Errorf("got %t, want %t", got, tt.want)
			}
		})
	}
}
