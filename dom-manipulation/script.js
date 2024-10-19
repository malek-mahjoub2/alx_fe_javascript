// Array to hold quotes
let quotes = [];

// Load quotes and last selected category from local storage
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}
const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = new Set(quotes.map(quote => quote.category));

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  // Update quote display
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `<strong>${quote.category}:</strong> ${quote.text}`;
    quoteDisplay.appendChild(quoteElement);
  });

  // Save selected category to local storage
  localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Check if both fields are filled
  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote); // Add the new quote to the quotes array

    // Update categories in dropdown
    populateCategories();

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Save quotes to local storage
    saveQuotes();

    // Show the new quote immediately
    filterQuotes();
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to export quotes as JSON
function exportQuotes() {
  const quoteData = JSON.stringify(quotes);
  const blob = new Blob([quoteData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url); // Clean up memory leak
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // Spread syntax for efficient array merging
    saveQuotes();
    alert('Quotes imported successfully!');
    populateCategories(); // Update categories after import
    filterQuotes(); // Filter quotes based on last selected category
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', addQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

// Show a random quote on page load
window.onload = () => {
  showRandomQuote();
  populateCategories();
};