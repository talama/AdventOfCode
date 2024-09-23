import { readFileSync } from 'fs';
import { join } from 'path';

const __dirname = import.meta.dirname;

// format input as a string array
function format(input: string): string[] {
	return readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
}

const numbers: Record<string, string> = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9'
};

// for each line get first and last number, concat them, add the result to the previous line
function Solution(data: string[], kind: 'number' | 'word' = 'number') {
	let result = 0;
	data.forEach((line) => {
		const first = getNum(line, 'start', kind);
		const last = getNum(line, 'end', kind);
		result += Number(first.concat(last));
	});
	return result;
}

// find first number from start or from end, numeric olny or also in word form
function getNum(
	str: string,
	from: 'start' | 'end' = 'start',
	kind: 'number' | 'word' = 'number'
): string {
	// boundaries for the loop, if we iterate from the end we start at Math.abs(str.lenght - 1) to 0 included
	const [start, end] = from === 'start' ? [0, str.length - 1] : [-(str.length - 1), 0];
	let buf = '';

	for (let i = start; i <= end; i += 1) {
		const idx = Math.abs(i);
		if (Number(str[idx])) {
			return str[idx] ?? '0';
		}
		if (kind === 'word') {
			// if we iterate from the end we need to reverse the string as we go
			buf = from === 'start' ? buf.concat(str[idx] ?? '') : (str[idx] ?? '').concat(buf);
			const found = findWord(buf);
			if (found !== '0') {
				return found;
			}
		}
	}
	return '0';
}

// find if the string contains a number as a word and returns the number as a string
function findWord(wordBuf: string): string {
	for (const key of Object.keys(numbers)) {
		if (wordBuf.includes(key)) {
			return numbers[key] ?? '0';
		}
	}
	return '0';
}

const data: string[] = format('input.txt');
console.log(Solution(data));
console.log(Solution(data, 'word'));
