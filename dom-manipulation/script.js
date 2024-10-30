// Array of quote objects
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens to you while you're busy making other plans.", category: "Humor" },
  // Add more quotes here
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<h2>${randomQuote.text}</h2><p>Category: ${randomQuote.category}</p>`;

  // Store the last viewed quote index in session storage
  sessionStorage.setItem('lastViewedQuote', randomIndex);
}

// Function to create and display a form for adding new quotes
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  form.appendChild(quoteInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.appendChild(form);
}

// Function to add a new quote to the array and display it
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear the form inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Save quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    showRandomQuote(); // Display the newly added quote
  } else {
    alert("Please enter both quote text and category.");
  }}

// Function to export quotes as JSON
function exportQuotes() {
  const quotesJson = JSON.stringify(quotes);
  const blob = new Blob([quotesJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url); // Clean up the temporary URL
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Error importing quotes: ' + error.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial setup
window.onload = () => {
  // Load quotes from local storage
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  // Retrieve the last viewed quote index from session storage
  const lastViewedIndex = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedIndex) {
    showQuoteAtIndex(lastViewedIndex);
  } else {
    showRandomQuote(); // Display a random quote initially
  }

  createAddQuoteForm(); // Create the form for adding new quotes

  // Add event listener for the export button
  document.getElementById('exportButton').addEventListener('click', exportQuotes);

  // Add file input element for import
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'importFile';
  importInput.accept = '.json';
  importInput.onchange = importFromJsonFile;
  document.body.appendChild(importInput);
};

// Helper function to display a specific quote by index
function showQuoteAtIndex(index) {
  const quote = quotes[index];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<h2>${quote.text}</h2><p>Category: ${quote.category}</p>`;
}