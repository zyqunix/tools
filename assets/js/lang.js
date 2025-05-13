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

		const map = {
			hobbies: "hobbies",
			status: "status",
			languages: "languages_header",
			skills: "skills_header",
			coding_stats: "stats_header",
			stats_since: "stats_since",
			contact: "contact_header",
			software_header: "software_header",
			software_equicord_tooltip: "software_equicord_tooltip",
			software_intellij_tooltip: "software_intellij_tooltip",
			software_android_tooltip: "software_android_tooltip",
			software_kitty_tooltip: "software_kitty_tooltip",
			tooltip_py: "tooltip_py",
			tooltip_js: "tooltip_js",
			tooltip_djs: "tooltip_djs",
			tooltip_c: "tooltip_c",
			tooltip_cpp: "tooltip_cpp",
			tooltip_cs: "tooltip_cs",
			tooltip_java: "tooltip_java",
			tooltip_kt: "tooltip_kt",
			tooltip_mn: "tooltip_mn",
			more: "more",
			more_sm: "more_sm",
			note: "note",
			copyright: "copyright",
			foss: "foss",
			inspired: "inspired",
			bw: "bw"
		};

		Object.entries(map).forEach(([id, key]) => {
			const el = document.getElementById(id);
			if (!el) return;

			const text = translations[lang][key];
			if (!text) return;

			if (el.hasAttribute("data-tooltip")) {
				el.setAttribute("data-tooltip", text);
			} else {
				el.innerHTML = text;
			}
		});
	}

	async function switchLanguage(lang) {
		await fetchLang(lang);
	}

	document.getElementById("en").addEventListener("click", () => location.reload());
	document.getElementById("de").addEventListener("click", () => switchLanguage("de"));
	document.getElementById("fr").addEventListener("click", () => switchLanguage("fr"));
	document.getElementById("sk").addEventListener("click", () => switchLanguage("sk"));
	document.getElementById("cz").addEventListener("click", () => switchLanguage("cz"));

}, 1000);
