package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type Set struct {
	Red   int
	Green int
	Blue  int
}

type Game struct {
	Sets []Set
	ID   int
}

var bag = Set{Red: 12, Green: 13, Blue: 14}

func main() {
	var sum, powerSum int
	games := getGames("input.txt")
	for _, game := range games {
		possible := true
		var minSet Set // set containing the lowest amount of cubes for each color for each game
		for _, set := range game.Sets {

			// Solution 1
			if set.Red > bag.Red || set.Blue > bag.Blue || set.Green > bag.Green {
				possible = false
			}

			// Solution 2
			if set.Red > minSet.Red {
				minSet.Red = set.Red
			}
			if set.Blue > minSet.Blue {
				minSet.Blue = set.Blue
			}
			if set.Green > minSet.Green {
				minSet.Green = set.Green
			}
		}

		// Solution 1
		if possible {
			sum += game.ID
		}
		// Solution 2
		powerSum += minSet.Red * minSet.Blue * minSet.Green
	}
	fmt.Printf("Solution 1: %d\n", sum)
	fmt.Printf("Solution 2: %d\n", powerSum)
}

// Parse the input file and return a []Game
func getGames(filename string) []Game {
	var games []Game

	file, err := os.Open(filename)
	if err != nil {
		log.Fatal("Could not open input file: ", err)
	}

	defer func(*os.File) {
		err := file.Close()
		if err != nil {
			log.Fatal("Error closing input file", err)
		}
	}(file)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		games = append(games, parseLine(line))
	}
	return games
}

// Parse a line into a Game struct
func parseLine(line string) Game {
	var game Game
	parts := strings.Split(line, ": ")
	_, err := fmt.Sscanf(parts[0], "Game %d", &game.ID)
	if err != nil {
		log.Fatal("could not parse line")
	}

	// Parse every set in the current game into a Set struct and append it to Game.Sets
	for _, set := range strings.Split(parts[1], "; ") {
		colors := strings.Split(set, ", ")
		var parsedSet Set

		for _, color := range colors {
			var col string
			var val int

			_, err := fmt.Sscanf(color, "%d %s", &val, &col)
			if err != nil {
				log.Fatal("could not parse line")
			}

			switch col {
			case "red":
				parsedSet.Red = val
			case "green":
				parsedSet.Green = val
			case "blue":
				parsedSet.Blue = val
			default:
				log.Fatal("could not parse line")
			}
		}
		game.Sets = append(game.Sets, parsedSet)
	}
	return game
}
