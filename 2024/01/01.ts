import { readFileSync } from 'fs';
import { join } from 'path';

const __dirname = import.meta.dirname;

function format(input: string) {
	const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');

	const list1: number[] = [];
	const list2: number[] = [];

	for (const line of data) {
		const [val1, val2] = line.split(/\s+/).map(Number);
		list1.push(val1 ?? 0);
		list2.push(val2 ?? 0);
	}
	list1.sort((a, b) => a - b);
	list2.sort((a, b) => a - b);
	return [list1, list2];
}

function solution1(list1: number[], list2: number[]): number {
	let totalDistance = 0;
	list1.forEach((val, i) => {
		const distance = val - (list2[i] ?? 0);
		totalDistance += Math.abs(distance);
	});
	return totalDistance;
}

function solution2(list1: number[], list2: number[]): number {
	let score = 0;
	const map2 = new Map<number, number>();
	list2.forEach((val) => map2.set(val, (map2.get(val) ?? 0) + 1));
	list1.forEach((val) => (score += val * (map2.get(val) ?? 0)));
	return score;
}

const [list1, list2] = format('input.txt');

if (list1 && list2) {
	console.log('Solution1: %d', solution1(list1, list2));
	console.log('Solution2: %d', solution2(list1, list2));
}
