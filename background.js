// Import Stoic quotes
importScripts('quotes.js');

// Function to get a random quote from the list
function getRandomQuote() {
  // Generate a random index based on the length of the stoicQuotes array
  const randomIndex = Math.floor(Math.random() * stoicQuotes.length);
  return stoicQuotes[randomIndex];
}

// Set up an alarm to trigger every hour
chrome.alarms.create('stoicQuoteAlarm', {
  periodInMinutes: 60 // Fires every 60 minutes
});

// When the alarm triggers, show a notification
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'stoicQuoteAlarm') {
    const quote = getRandomQuote();
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Stoic Wisdom',
      message: quote
    });
  }
});
