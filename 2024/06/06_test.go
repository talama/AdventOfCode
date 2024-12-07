package main

import (
	"testing"
)

func BenchmarkMain(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i += 1 {
		main()
	}
	b.ReportMetric(b.Elapsed().Seconds(), "s")
}
