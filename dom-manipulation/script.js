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

    // Update the category filter options
    populateCategories();

    showRandomQuote(); // Display the newly added quote
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Function to populate the category filter options
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  // Update the quote display with filtered quotes
  // ... (implementation to update the quote display)
}
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });
}
window.onload = () => {
  

  populateCategories();
  showRandomQuote();
  createAddQuoteForm();

 
}
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `<h2>${randomQuote.text}</h2><p>Category: ${randomQuote.category}</p>`;
  } else {
      quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
  }
}
function exportQuotes() {
  const quotesJson = JSON.stringify(quotes);
  const blob = new Blob([quotesJson], { type: 'application/json' }); // Add this line
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url); // Clean up the temporary URL
}
function importFromJsonFile(event) {
  const fileReader = new FileReader(); // Add this line

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

  fileReader.readAsText(event.target.files[0]); // Add this line
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your actual API endpoint
    const data = await response.json();

    // Filter for posts with "quote" in the title (optional)
    const quotesData = data.filter(post => post.title.toLowerCase().includes('quote'));

    // Update quotes and local storage
    quotes = quotesData; // Use the filtered data or all data based on your needs
    localStorage.setItem('quotes', JSON.stringify(quotes));

    populateCategories();
    showRandomQuote();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    // Handle errors, e.g., display an error message to the user
  }
}
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch('https://your-mock-api-endpoint', { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Quote posted successfully:', data);
      // Handle success, e.g., update the UI or show a success message
    } else {
      console.error('Error posting quote:', response.statusText);
      // Handle errors, e.g., display an error message to the user
    }
  } catch (error) {
    console.error('Error posting quote:', error);
    // Handle network errors or other exceptions
  }
}
async function syncQuotes() {
  try {
    // Fetch quotes from the server
    const response = await fetch('https://your-server-api-endpoint'); // Replace with your actual API endpoint
    const serverQuotes = await response.json();

    // Update local quotes and local storage
    quotes = serverQuotes;
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Update the UI
    populateCategories();
    showRandomQuote();
  } catch (error) {
    console.error('Error syncing quotes:', error);
    // Handle errors, e.g., display an error message to the user
  }
}
// Initial setup
window.onload = () => {
  // Load quotes from local storage
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  populateCategories();
  showRandomQuote();
  createAddQuoteForm();
  fetchQuotesFromServer();
  syncQuotes(); 
};
