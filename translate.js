const translations = {
    en: {
        welcome: {
            title: "Welcome!",
            description: "This is a website for future tools. The source code can be found on my <a href='https://github.com/zyqunix/tools' target='_blank'>GitHub</a>!",
            testIt: "Clicking \"Test It\" will open the tool in the current tab.",
            future: "More tools will come in the future."
        }
    },
    de: {
        welcome: {
            title: "Willkommen!",
            description: "Dies ist eine Webseite für zukünftige Tools. Der Quellcode ist auf meinem <a href='https://github.com/zyqunix/tools' target='_blank'>GitHub</a> zu finden!",
            testIt: "\"Test It\" öffnet das Tool im aktuellen Tab.",
            future: "Weitere Tools werden in Zukunft hinzugefügt."
        }
    }
};

const languageSelector = document.getElementById('langauge-selector');
languageSelector.addEventListener('change', () => {
    const selectedLanguage = languageSelector.value;
    applyTranslations(selectedLanguage);
});

function applyTranslations(language) {
    const welcome = translations[language].welcome;
    document.getElementById('welcome-title').innerHTML = welcome.title;
    document.getElementById('welcome-description').innerHTML = welcome.description;
    document.getElementById('welcome-test-it').innerHTML = welcome.testIt;
    document.getElementById('welcome-future').innerHTML = welcome.future;
}

applyTranslations('en');