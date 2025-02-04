// DOM elements
const descriptionInput = document.getElementById('descriptionInput');
const amountInput = document.getElementById('amountInput');
const addTransactionBtn = document.getElementById('addTransactionBtn');
const transactionList = document.getElementById('transactionList');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
const currentBalance = document.getElementById('currentBalance');
const clearAllBtn = document.getElementById('clearAllBtn');

// Declare an array to hold each transactions
const transactions = [];

// Add an event listener to the button and call the transaction function
addTransactionBtn.addEventListener('click', addTransaction);
clearAllBtn.addEventListener('click', clearAllTransactions);

// Functions
// Function to add transaction
function addTransaction(){
    const description = descriptionInput.value; 
    const amount = parseFloat(amountInput.value);
    
    //vallidate input
    if (description === ''){
        alert("Please enter a description for this transaction");
        return;
    };

    if (amount === 0 || !amount){
        alert("Please enter a valid amount")
        return
    }

    // create new transaction object and add to the array
    // declare an object to hold individual transaction.
    const transaction = {
        description: description,
        amount: amount
    }

    // push the new transaction into the array
    transactions.push(transaction);

    // empty the input fields
    descriptionInput.value = '';
    amountInput.value = '';
    displayTransactions()
    updateSummaryBreakdown()
}

// function to display transaction
function displayTransactions(){
    // clear existing transaction
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) =>{

        // Create a div to hold each transaction List item
        const transactionItem = document.createElement('div');

        // Assign a class to the div created
        transactionItem.className = 'transaction-item';

        // Add the transaction description and amount to the div and create another div to hold the  delete button
        // .toFixed(2) simply means a 2 decimal point aftr the original amount that is 500.00
        transactionItem.innerHTML = `
            <span> ${transaction.description}>>>$${transaction.amount.toFixed(2)}</span>
            <div>
                <button onclick = "deleteTransaction(${index})">
                    Delete Transaction
                </button>
            </div>
            `;
        transactionList.appendChild(transactionItem)
    })
}

// Function to delete transaction
function deleteTransaction(index) {
    // remove the transaction from the array
    transactions.splice(index, 1);
    displayTransactions()
    updateSummaryBreakdown()
}

// function to update summary breakdown
function updateSummaryBreakdown(){
    // calculate total income and expenses
    let income = 0;
    let expenses = 0;
    
    // loop through each transaction
    transactions.forEach(transaction => {
        if (transaction.amount > 0){
            income += transaction.amount;
        } else{
            expenses += transaction.amount;
        }
    });

    totalIncome.textContent = `$${income.toFixed(2)}`
    // Math.abs ensures that the expenses shows on the screen as a positive value even if it is stored as a negative value
    totalExpenses.textContent = `$${Math.abs(expenses).toFixed(2)}`
    currentBalance.textContent = `$${(income + expenses).toFixed(2)}`
}

// function to clear all transactions
function clearAllTransactions(){
    transactions.length = 0
    displayTransactions()
    updateSummaryBreakdown()
}
