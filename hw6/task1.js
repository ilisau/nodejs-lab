const translations = {
	en: {
		greet: "Hello",
		intro: "Welcome to our website"
	},
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
};

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

function localize(strings, ...values) {
	const result = [];
	for (let i = 0; i < strings.length; i++) {
		result.push(strings[i]);
		if (values[i]) {
			result.push(translations[language][values[i]]);
		}
	}
	return result.join("");
}

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")