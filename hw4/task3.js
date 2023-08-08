let bankAccount = {
    _balance: 1000,

    get formattedBalance() {
        this._formattedBalance = '$' + this._balance
        return this._formattedBalance
    },

    set balance(value) {
        this._balance = value
        this._formattedBalance = '$' + this._balance
    },

    transfer(to, amount) {
        if (this._balance < amount) {
            throw new Error("Not enough money.")
        }
        this.balance = this._balance - amount
        to.balance = to._balance + amount
    }
}

// TESTS

{
    let from = Object.create(bankAccount)
    let to = Object.create(bankAccount)
    let amount = 100

    from.transfer(to, amount)
    console.log(to.formattedBalance === '$' + 1100)
    console.log(from.formattedBalance === '$' + 900)
}