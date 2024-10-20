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
  
      showRandomQuote(); // Display the newly added quote
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  // Initial setup
  window.onload = () => {
    showRandomQuote(); // Display a random quote initially
    createAddQuoteForm(); // Create the form for adding new quotes
  };