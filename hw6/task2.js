const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

function highlightKeywords(template, keywords) {
	let result = template;
	let regex = /(\$\{\d+\})/g;
	const placeholders = template.match(regex);
	for (let i = 0; i < keywords.length; i++) {
		result = result.replace(placeholders[i], "<span class='highlight'>" + keywords[i] + "</span>")
	}
	return result;
}

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."