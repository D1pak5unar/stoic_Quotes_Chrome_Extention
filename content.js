chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'speakQuote' && request.quote) {
      const utterance = new SpeechSynthesisUtterance(request.quote);
      speechSynthesis.speak(utterance);
    }
  });
  