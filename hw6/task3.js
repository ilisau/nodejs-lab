function multiline(strings) {
	const lines = strings[0].split('\n');
	if (lines[0].trim() === '') {
		lines.shift();
	}
	if (lines[lines.length - 1].trim() === '') {
		lines.pop();
	}
	const maxDigits = String(lines.length).length;

	const processedLines = lines.map((line, index) => {
		const lineNumber = (index + 1).toString().padStart(maxDigits, ' ');
		return `${lineNumber} ${line}`;
	});
	return processedLines.join('\n');
}

const code = multiline`
function add(a, b) {  
return a + b;  
}  
`;

console.log(code);
// Expected:  
// 1 function add(a, b) {
// 2 return a + b;  
// 3 }