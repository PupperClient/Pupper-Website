// Internationalization module
const i18n = {
    currentLanguage: 'en',
    translations: {},
    
    // Load translations for a specific language
    async loadLanguage(lang) {
        try {
            const response = await fetch(`i18n/${lang}.json`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Failed to load language: ${lang}`, error);
        }
    },
    
    // Initialize i18n
    async init(defaultLang = 'en') {
        // Load default language first
        await this.loadLanguage(defaultLang);
        this.currentLanguage = defaultLang;
        
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang && browserLang !== defaultLang && 
            (browserLang === 'zh' || browserLang === 'ja')) {
            await this.loadLanguage(browserLang);
            this.currentLanguage = browserLang;
        }
        
        // Apply translations
        this.applyTranslations();
        
        // Set language selector value
        document.getElementById('language-select').value = this.currentLanguage;
    },
    
    // Change language
    async changeLanguage(lang) {
        if (!this.translations[lang]) {
            await this.loadLanguage(lang);
        }
        
        this.currentLanguage = lang;
        this.applyTranslations();
        
        // Update language selector
        document.getElementById('language-select').value = lang;
        
        // Save preference to localStorage
        localStorage.setItem('preferred-language', lang);
    },
    
    // Apply translations to the page
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLanguage][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    },
    
    // Get translation for a key
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
};

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    const defaultLang = savedLang || 'en';
    
    i18n.init(defaultLang);
    
    // Set up language selector
    document.getElementById('language-select').addEventListener('change', (e) => {
        i18n.changeLanguage(e.target.value);
    });
});