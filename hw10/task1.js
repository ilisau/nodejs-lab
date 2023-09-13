class Book {
	#title;
	#author;
	#isbn;
	#price;
	#availability;

	/**
	 * Creates a Book object.
	 * @param title
	 * @param author
	 * @param isbn
	 * @param price
	 * @param availability amount of books available to buy
	 */
	constructor(title, author, isbn, price, availability) {
		this.#title = title;
		this.#author = author;
		this.#isbn = isbn;
		this.#price = price;
		this.#availability = availability;
	}

	get title() {
		return this.#title;
	}

	get author() {
		return this.#author;
	}

	get isbn() {
		return this.#isbn;
	}

	get price() {
		return this.#price;
	}

	get availability() {
		return this.#availability;
	}

	set availability(amount) {
		this.#availability = amount;
	}
}

class FictionBook extends Book {
	#genre;

	constructor(title, author, isbn, price, availability, genre) {
		super(title, author, isbn, price, availability);
		this.#genre = genre;
	}

	get genre() {
		return this.#genre;
	}

	set genre(genre) {
		this.#genre = genre;
	}
}

class NonFictionBook extends Book {
	#science;

	constructor(title, author, isbn, price, availability, science) {
		super(title, author, isbn, price, availability);
		this.#science = science;
	}

	get science() {
		return this.#science;
	}

	set science(science) {
		this.#science = science;
	}
}

class User {
	/**
	 * List of all created ids.
	 * @type {number[]}
	 */
	static #IDS = []
	#id;
	#name;
	#email;

	/**
	 * Creates a User object.
	 * @param name
	 * @param email
	 * @param userId unique ID of user
	 */
	constructor(name, email, userId) {
		if (User.#IDS.includes(userId)) {
			throw Error("Id is already assigned");
		}
		this.#id = userId;
		User.#IDS.push(userId);
		this.#name = name;
		this.#email = email;
	}

	get id() {
		return this.#id
	}

	get name() {
		return this.#name
	}

	get email() {
		return this.#email
	}
}

class Cart {
	#user;
	#books;

	/**
	 * Creates a Cart object.
	 * @param user
	 */
	constructor(user) {
		this.#user = user;
		this.#books = new Map();
	}

	/**
	 * Adds book with its amount to cart.
	 * @param book
	 * @param amount positive number
	 */
	addBook(book, amount) {
		if (amount === 0) {
			this.removeBook(book);
		}
		if (amount < 0) {
			throw new Error("Amount can not be a negative number.")
		}
		if (book.availability < amount) {
			throw new Error("Not enough books.")
		}
		if (this.#books.get(book)) {
			book.availability += this.#books.get(book);
		}
		this.#books.set(book, amount);
		book.availability -= amount;
	}

	/**
	 * Removes a book from cart.
	 * @param book
	 */
	removeBook(book) {
		let amount = this.#books.get(book);
		if (amount) {
			book.availability += amount
		}
		this.#books.delete(book);
	}

	/**
	 * Returns total price of books in the cart.
	 * @returns {number}
	 */
	getTotalPrice() {
		return new Array(...this.#books.entries()).reduce((total, cartItem) => (total + cartItem[0].price * cartItem[1]), 0)
	}

	get user() {
		return this.#user
	}

	get books() {
		return this.#books
	}
}

class Order {
	#user;
	#books;

	/**
	 * Creates an Order object.
	 * @param user
	 * @param books a Map of books and amount
	 */
	constructor(user, books) {
		this.#user = user;
		this.#books = books;
	}

	/**
	 * Returns total price of books in the cart.
	 * @returns {number}
	 */
	getTotalPrice() {
		return new Array(...this.#books.entries()).reduce((total, cartItem) => (total + cartItem[0].price * cartItem[1]), 0)
	}

	get user() {
		return this.#user
	}

	get books() {
		return this.#books
	}
}

let book1 = new Book("Book 1", "Author 1", "12345678", 10.0, 100);
let book2 = new FictionBook("Book 2", "Author 2", "12345679", 11.0, 50, "diaries");
let book3 = new NonFictionBook("Book 3", "Author 3", "12345670", 25.0, 2, "physics");

let user1 = new User("User1", "user1@gmail.com", 1);
let user2 = new User("User2", "user2@gmail.com", 2);

let cart1 = new Cart(user1);
cart1.addBook(book1, 5);
cart1.addBook(book1, 5);
cart1.addBook(book2, 2);
cart1.addBook(book3, 1);

let cart2 = new Cart(user2);
cart2.addBook(book1, 2);
cart2.addBook(book2, 1);
// cart2.addBook(book3, 5);
cart2.removeBook(book2);

let order1 = new Order(user1, cart1.books);
let order2 = new Order(user2, cart2.books);

console.log(order1.getTotalPrice());
console.log(order2.getTotalPrice());
