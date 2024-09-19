import { readFileSync } from 'fs';
import { join } from 'path';

const __dirname = import.meta.dirname;

function format(input: string): string[] {
	return readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
}

function Solution1(data: string[]) {
	let result = 0;
	data.forEach((line) => {
		const first = getNum(line, 'start');
		const last = getNum(line, 'end');
		result += Number(first + last);
	});
	return result;
}

function getNum(str: string, from: 'start' | 'end'): string {
	if (from === 'start') {
		for (const c of str) {
			if (c === '0' || Number(c)) {
				return c;
			}
		}
	}
	if (from === 'end') {
		for (let i = str.length - 1; i >= 0; i -= 1) {
			if (str[i] === '0' || Number(str[i])) {
				return str[i] ?? '0';
			}
		}
	}
	return '0';
}

const data: string[] = format('test.txt');
console.log(Solution1(data));

