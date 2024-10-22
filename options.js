document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
  
    // Add event listener to the save button
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
  });
  
  function loadSettings() {
    chrome.storage.sync.get(['frequency', 'darkMode'], (result) => {
      document.getElementById('frequency').value = result.frequency || 60;
      document.getElementById('darkMode').checked = result.darkMode || false;
    });
  }
  
  function saveSettings() {
    const frequency = parseInt(document.getElementById('frequency').value);
    const darkMode = document.getElementById('darkMode').checked;
  
    chrome.storage.sync.set({ frequency, darkMode }, () => {
      alert('Settings saved!');
      // Send message to background script to reload alarms
      chrome.runtime.sendMessage({ action: 'reloadAlarms' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Message error:', chrome.runtime.lastError);
        } else if (response && response.status === 'success') {
          console.log('Alarms reloaded successfully!');
        }
      });
    });
  }
  