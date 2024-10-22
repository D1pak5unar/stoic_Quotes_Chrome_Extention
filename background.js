// Import Stoic quotes
importScripts('quotes.js');

// Function to get a random quote from the list
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * stoicQuotes.length);
  return stoicQuotes[randomIndex];
}

// Set up an alarm to trigger every hour (default)
chrome.alarms.create('stoicQuoteAlarm', {
  periodInMinutes: 60
});

// Load user settings from storage (e.g., frequency)
chrome.storage.sync.get(['frequency'], (result) => {
  const frequency = result.frequency || 60; // Default to 60 minutes
  chrome.alarms.clear('stoicQuoteAlarm');
  chrome.alarms.create('stoicQuoteAlarm', { periodInMinutes: frequency });
});

// Listen for alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'stoicQuoteAlarm') {
    const quote = getRandomQuote();

    // Create a notification with the quote
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Stoic Wisdom',
      message: quote,
      buttons: [
        { title: 'Favorite' },
        { title: 'Show History' }
      ]
    });

    // Send a message to content scripts to handle TTS
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'speakQuote', quote: quote });
    });
  }
});

// Create a context menu, ensuring no duplicates
chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: 'showQuote',
    title: 'Show Stoic Quote',
    contexts: ['page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'showQuote') {
    const quote = getRandomQuote();
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: displayQuoteOverlay,
      args: [quote]
    });

    // Send a message to content script to read the quote aloud
    chrome.tabs.sendMessage(tab.id, { action: 'speakQuote', quote: quote });
  }
});

// Function to display an overlay with a quote
function displayQuoteOverlay(quote) {
  const overlay = document.createElement('div');
  overlay.textContent = quote;
  overlay.style.position = 'fixed';
  overlay.style.bottom = '10px';
  overlay.style.right = '10px';
  overlay.style.backgroundColor = '#000';
  overlay.style.color = '#fff';
  overlay.style.padding = '10px';
  overlay.style.zIndex = '9999';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 5000); // Auto-remove after 5 seconds
}

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notifId, btnIndex) => {
  if (btnIndex === 0) {
    saveFavoriteQuote();
  } else if (btnIndex === 1) {
    showQuoteHistory();
  }
});

// Save the current quote to favorites
function saveFavoriteQuote() {
  chrome.storage.sync.get(['favorites'], (result) => {
    const favorites = result.favorites || [];
    const quote = getRandomQuote();
    if (!favorites.includes(quote)) {
      favorites.push(quote);
      chrome.storage.sync.set({ favorites });
    }
  });
}

// Show quote history
function showQuoteHistory() {
  chrome.storage.sync.get(['favorites'], (result) => {
    const favorites = result.favorites || [];
    alert('Favorite Quotes:\n' + favorites.join('\n'));
  });
}

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'reloadAlarms') {
    chrome.storage.sync.get(['frequency'], (result) => {
      const frequency = result.frequency || 60;
      chrome.alarms.clear('stoicQuoteAlarm');
      chrome.alarms.create('stoicQuoteAlarm', { periodInMinutes: frequency });
      sendResponse({ status: 'success' });
    });
    return true; // Indicate asynchronous response
  }
});
