# Stoic Quotes Extension

## Overview
The **Stoic Quotes Extension** is a Chrome extension that delivers timeless wisdom from Stoic philosophers right to your browser. It randomly displays Stoic quotes as notifications at customizable intervals, helping you stay inspired and mindful throughout your day.

## Features
- **Random Stoic Quotes:** Receive random quotes from famous Stoic philosophers like Marcus Aurelius, Seneca, and Epictetus.
- **Customizable Notifications:** Set the frequency of notifications (e.g., every 30 minutes, 1 hour, or 2 hours).
- **Favorite Quotes:** Save your favorite quotes for later reference.
- **Quote History:** View a list of all your saved favorite quotes.
- **Context Menu Integration:** Right-click anywhere in the browser to get a Stoic quote instantly.
- **Text-to-Speech:** Listen to the quotes through built-in text-to-speech functionality.
- **Daily Motivational Reminder:** Get a special Stoic message each morning at a set time.
- **Dark Mode:** Enable dark mode in the options for a more comfortable viewing experience.

## Installation
1. **Download or clone** the repository.
2. **Open Chrome** and go to `chrome://extensions/`.
3. **Enable Developer Mode** in the top-right corner.
4. Click **Load unpacked** and select the extension folder.
5. The extension is now installed and will start delivering Stoic wisdom!

## Usage
1. **Receive Notifications:**
   - By default, the extension sends a random Stoic quote notification every hour.
   - You can customize the notification interval via the options page.
2. **Right-Click Context Menu:**
   - Right-click anywhere on a webpage and select "Show Stoic Quote" to see a quote instantly.
3. **Save Favorite Quotes:**
   - Click "Favorite" in the notification to save a quote.
   - Access your saved quotes through the "Show History" button in the notification.
4. **Enable Text-to-Speech:**
   - Quotes are automatically read aloud when notifications appear.

## Options
To customize the extension:
1. Click on the **extension icon** in the toolbar and select "Options."
2. Set your desired **notification interval**, enable **dark mode**, or manage other settings.
3. Click **Save** to apply the changes.

## Permissions
The extension requires the following permissions:
- **`alarms`**: To trigger notifications at set intervals.
- **`notifications`**: To display Stoic quotes.
- **`storage`**: To save user settings, favorite quotes, and quote history.
- **`contextMenus`**: To add a context menu for quick quote access.
- **`activeTab`**: To display quotes on active tabs through an overlay.

## Handling Content Security Policy (CSP)
To comply with Chrome’s Content Security Policy:
- Use **event listeners** in external JavaScript files instead of inline handlers in HTML.
- Example: Replace `<button onclick="saveSettings()">Save Settings</button>` with an event listener in `options.js`.

## Contributing
Feel free to open issues or submit pull requests if you have ideas for new features or improvements.

## License
This extension is licensed under the **MIT License**. See the LICENSE file for more details.

## Credits
Quotes sourced from classic works of Stoic philosophers, including Marcus Aurelius, Seneca, and Epictetus.
