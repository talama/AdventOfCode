package main

import (
	"testing"
)

var memory = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

func TestPart1(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  []string
	}{
		{"memory", memory, []string{"mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := parseMemory(tt.input)
			for i, mul := range got {
				if mul != tt.want[i] {
					t.Errorf("got %s, want %s", mul, tt.want[i])
				}
			}
		})
	}
}
