// Function to fetch quotes from the server (simulated)

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
    
      
    
      // Function to sync data with the server (simulated)
    
      async function syncQuotes() {
    
        try {
    
          const serverQuotes = await fetchQuotesFromServer();
    
      
    
          // Compare local and server quotes
    
          const updatedQuotes = serverQuotes.map(serverQuote => {
    
            const existingQuote = quotes.find(localQuote => localQuote.id === serverQuote.id);
    
            if (existingQuote) {
    
              // Handle conflicts here (e.g., merge changes)
    
              return { ...existingQuote, ...serverQuote };
    
            } else {
    
              return serverQuote;
    
            }
    
          });
    
         // Function to fetch quotes from the server (simulated)
    
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
    
      
    
      // Function to sync data with the server (simulated)
    
      async function syncQuotes() {
    
        const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual server URL
    
      
    
        try {
    
          const response = await fetch(serverUrl, {
    
            method: 'POST',
    
            headers: {
    
              'Content-Type': 'application/json'
    
            },
    
            body: JSON.stringify(quotes)
    
          });
    
      
    
          if (response.ok) {
    
            const updatedQuotes = await response.json();
    
            // Handle the updated quotes as needed
    
            console.log('Data synced successfully:', updatedQuotes);
    
          } else {
    
            console.error('Error syncing data:', response.statusText);
    
          }
    
        } catch (error) {
    
          console.error('Error syncing data:', error);
    
          alert('Failed to sync data. Please try again later.');
    
        }
    
      }
    
      
    
      // Function to periodically sync data with the server
    
      function startSyncInterval() {
    
        setInterval(syncQuotes, 60000); // Sync every 60 seconds (adjust as needed)
    
      }
    
      
    
      // ... (rest of your code)
    
      
    
      // Start the sync interval when the page loads
    
      window.onload = () => {
    
        // ... (other initialization code)
    
        startSyncInterval();
    
      };
    
      // Function to fetch quotes from the server (simulated)
    
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
    
      
    
      // Function to sync data with the server (simulated)
    
      async function syncQuotes() {
    
        const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual server URL
    
      
    
        try {
    
          const response = await fetch(serverUrl, {
    
            method: 'POST',
    
            headers: {
    
              'Content-Type': 'application/json'
    
            },
    
            body: JSON.stringify(quotes)
    
          });
    
      
    
          if (response.ok) {
    
            const updatedQuotes = await response.json();
    
            // Handle the updated quotes as needed
    
            console.log('Data synced successfully:', updatedQuotes);
    
            quotes = updatedQuotes; // Update local quotes
    
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes to local storage
    
          } else {
    
            console.error('Error syncing data:', response.statusText);
    
          }
    
        } catch (error) {
    
          console.error('Error syncing data:', error);
    
          alert('Failed to sync data. Please try again later.');
    
        }
    
      }
    
      
    
      // Function to periodically sync data with the server
    
      function startSyncInterval() {
    
        setInterval(syncQuotes, 60000); // Sync every 60 seconds (adjust as needed)
    
      }
    
      
    
      // ... (rest of your code)
    
      
    
      // Start the sync interval when the page loads
    
      window.onload = () => {
    
        // ... (other initialization code)
    
        startSyncInterval();
    
      };
    
      // Function to fetch quotes from the server (simulated)
    
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
    
      
    
      // Function to sync data with the server (simulated)
    
      async function syncQuotes() {
    
        const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual server URL
    
      
    
        try {
    
          const response = await fetch(serverUrl, {
    
            method: 'POST',
    
            headers: {
    
              'Content-Type': 'application/json'
    
            },
    
            body: JSON.stringify(quotes)
    
          });
    
      
    
          if (response.ok) {
    
            const updatedQuotes = await response.json();
    
            // Handle the updated quotes as needed
    
            console.log('Data synced successfully:', updatedQuotes);
    
            quotes = updatedQuotes; // Update local quotes
    
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes to local storage
    
          } else {
    
            console.error('Error syncing data:', response.statusText);
    
          }
    
        } catch (error) {
    
          console.error('Error syncing data:', error);
    
          alert('Failed to sync data. Please try again later.');
    
        }
    
      }
    
      
    
      // Function to periodically sync data with the server
    
      function startSyncInterval() {
    
        setInterval(syncQuotes, 60000); // Sync every 60 seconds (adjust as needed)
    
      }
    
      
    
      // ... (rest of your code)
    
      
    
      // Start the sync interval when the page loads
    
      window.onload = () => {
    
        // ... (other initialization code)
    
        startSyncInterval();
    
      };
    
      // Function to fetch quotes from the server (simulated)
    
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
    
      
    
      // Function to sync data with the server (simulated)
    
      async function syncQuotes() {
    
        const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual server URL
    
      
    
        try {
    
          const response = await fetch(serverUrl, {
    
            method: 'POST',
    
            headers: {
    
              'Content-Type': 'application/json'
    
            },
    
            body: JSON.stringify(quotes)
    
          });
    
      
    
          if (response.ok) {
    
            const updatedQuotes = await response.json();
    
            // Handle the updated quotes as needed
    
            console.log('Data synced successfully:', updatedQuotes);
    
            quotes = updatedQuotes; // Update local quotes
    
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes to local storage
    
            alert('Quotes synced with server!'); // Display a message to the user
    
          } else {
    
            console.error('Error syncing data:', response.statusText);
    
            alert('Failed to sync data. Please try again later.');
    
          }
    
        } catch (error) {
    
          console.error('Error syncing data:', error);
    
          alert('Failed to sync data. Please try again later.');
    
        }
    
      }
    
      
    
      // Function to periodically sync data with the server
    
      function startSyncInterval() {
    
        setInterval(syncQuotes, 60000); // Sync every 60 seconds (adjust as needed)
    
      }
    
      
    
      // ... (rest of your code)
    
      
    
      // Start the sync interval when the page loads
    
      window.onload = () => {
    
        // ... (other initialization code)
    
        startSyncInterval();
    
      };
    
          // Update local quotes and save to local storage
    
          quotes = updatedQuotes;
    
          saveQuotes();
    
      
    
          // Update UI
    
          filterQuotes();
    
          alert('Data synced successfully!');
    
        } catch (error) {
    
          console.error('Error syncing data:', error);
    
          alert('Failed to sync data. Please try again later.');
    
        }
    
      }