setTimeout(() => {
	let translations = {
		en: null,
		de: null,
		fr: null,
		sk: null,
		cz: null
	};

	async function fetchLang(lang) {
		if (translations[lang] !== null) {
			return;
		}

		try {
			const res = await fetch(`/assets/js/lang/${lang}.json`);
			if (!res.ok) {
				throw new Error(`Failed to fetch ${lang} translations`);
			}
			const texts = await res.json();
			translations[lang] = texts;
			applyTranslations(lang);
		} catch (error) {
			console.error(error);
		}
	}

	function applyTranslations(lang) {
		if (!translations[lang]) return;

		document.title = translations[lang].title;

		const elements = [
			"hobbies", "status", "languages", "skills", "coding_stats", "stats_since",
			"contact", "software", "tooltip_py", "tooltip_js", "tooltip_djs", "tooltip_c",
			"tooltip_cpp", "tooltip_cs", "tooltip_java", "tooltip_kt", "tooltip_mn", "tooltip_en", 
			"tooltip_de", "tooltip_fr", "tooltip_sk", "tooltip_cz"
		];

		elements.forEach((selector) => {
			const element = document.getElementById(selector);
			if (element) {
				const key = selector.replace('#', '');
				element.textContent = translations[lang][key] || element.textContent;
			} else {
				console.warn(`Element with ID '${selector}' not found`);
			}
		});
	}

	async function switchLanguage(lang) {
		await fetchLang(lang);
	}

	document.querySelector("div#en.language-name.tooltip").addEventListener('click', () => switchLanguage('en'));
	document.querySelector("div#de.language-name.tooltip").addEventListener('click', () => switchLanguage('de'));
	document.querySelector("div#fr.language-name.tooltip").addEventListener('click', () => switchLanguage('fr'));
	document.querySelector("div#sk.language-name.tooltip").addEventListener('click', () => switchLanguage('sk'));
	document.querySelector("div#cz.language-name.tooltip").addEventListener('click', () => switchLanguage('cz'));

}, 1000);
