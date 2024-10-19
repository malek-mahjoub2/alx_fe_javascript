// Array to store quotes (initially empty)
let quotes = [];

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual server URL

  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();
    return serverQuotes;
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return []; // Return an empty array in case of error
  }
}

// Function to sync data with the server and handle conflicts
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();

    // Compare local and server quotes, resolving conflicts
    const updatedQuotes = serverQuotes.map(serverQuote => {
      const existingQuote = quotes.find(localQuote => localQuote.id === serverQuote.id);
      if (existingQuote) {
        // Implement your conflict resolution strategy here (e.g., merge changes)
        // For simplicity, let's prioritize server data for now:
        return { ...existingQuote, ...serverQuote };
      } else {
        return serverQuote;
      }
    });

    // Update local quotes and save to local storage
    quotes = updatedQuotes;
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Update UI and provide feedback
    updateQuoteDisplay();
    alert('Citations synchronisées avec le serveur !');
  } catch (error) {
    console.error('Error syncing data:', error);
    alert('Échec de la synchronisation des données. Veuillez réessayer plus tard.');
  }
}

// Function to update the quote display on the page (adjust based on your HTML)
function updateQuoteDisplay() {
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');

  // Choose a random quote from the updated quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteElement.textContent = randomQuote.quote;
  authorElement.textContent = randomQuote.author;
}

// Function to periodically sync data with the server
function startSyncInterval() {
  setInterval(syncQuotes, 60000); // Sync every 60 seconds (adjust as needed)
}

// Initial load: fetch quotes from the server and update the UI
async function init() {
  try {
    const savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes = savedQuotes;
    await syncQuotes(); // Initial sync to ensure up-to-date data
    updateQuoteDisplay();
  } catch (error) {
    console.error('Error initializing:', error);
    alert('Une erreur s\'est produite lors de l\'initialisation.');
  }
}

// Start the application
init();