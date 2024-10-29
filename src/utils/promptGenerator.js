// Базовые конфигурации качества
const baseQualityConfig = [
    "centered composition",
    "illustration",
    "graphic design",
    "clear layout",
    "perfect circle frame",
    "contained artwork",
    "high quality",
    "professional design",
    "single central element"
].join(", ");

// Настройки центральной области
const centerAreaConfig = [
    "perfectly centered design",
    "light background in text areas",
    "clear space for text",
    "white space around central element",
    "high contrast with text areas"
].join(", ");

const textAreaConfig = [
    "bottom third clear space",
    "simple gradient background in bottom area",
    "neutral bottom area",
    "soft muted colors in bottom third",
    "clean bottom space",
    "minimal elements in bottom third",
    "light neutral background in text area",
    "no complex patterns in bottom area",
    "avoid bright colors in bottom third",
    "solid color bottom space"
].join(", ");

const translateText = async (text) => {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ru|en`
        );
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
};

const translateText_Lingva = async (text) => {
    try {
        const response = await fetch(`https://lingva.ml/api/v1/ru/en/${encodeURIComponent(text)}`);
        const data = await response.json();
        return data.translation;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
};

const wineCharacteristics = {
    // По содержанию сахара
    sugar: {
        0: 'dry, crisp',
        5: 'semi-dry, balanced',
        20: 'semi-sweet, smooth',
        50: 'sweet, rich'
    },
    // По крепости
    alcohol: {
        9: 'light, delicate',
        12: 'medium-bodied',
        14: 'full-bodied',
        16: 'strong, powerful'
    }
};

// Определение характера вина по характеристикам
const getWineCharacter = (sugar, alcohol) => {
    // Находим подходящее описание по сахару
    const sugarLevel = Object.entries(wineCharacteristics.sugar)
        .reverse()
        .find(([level]) => sugar >= Number(level))?.[1] || wineCharacteristics.sugar[0];

    // Находим подходящее описание по алкоголю
    const alcoholLevel = Object.entries(wineCharacteristics.alcohol)
        .reverse()
        .find(([level]) => alcohol >= Number(level))?.[1] || wineCharacteristics.alcohol[9];

    return { sugarLevel, alcoholLevel };
};

// Анализ сортов винограда
const analyzeGrapes = (grapes) => {
    // Определяем основные категории винограда
    const grapeCategories = {
        red: ['каберне', 'мерло', 'пино нуар', 'саперави', 'пино черный', 'каберне совиньон'],
        white: ['шардоне', 'рислинг', 'совиньон блан', 'алиготе', 'цоликаури', 'ркацители'],
        sweet: ['мускат', 'токай', 'малвазия'],
        local: ['кокур', 'черный доктор', 'кефесия']
    };

    const grapesLower = grapes.toLowerCase();
    const categories = [];

    Object.entries(grapeCategories).forEach(([category, varietals]) => {
        if (varietals.some(grape => grapesLower.includes(grape))) {
            categories.push(category);
        }
    });

    return categories;
};

// Конфигурации стилей
const styleConfigs = {
    'modern minimalist': {
        pattern: "minimalist abstract design, clean geometric composition",
        character: "single bold geometric element, simple shape",
        colors: "minimal color palette, clear contrast",
        atmosphere: "clean, precise, elegant minimalism",
        extras: "flat design, pure abstraction, perfect balance"
    },
    'anime kawaii': {
        pattern: "kawaii style illustration, cute mascot design",
        character: "chibi fruit character, kawaii grape mascot, cute food character",
        colors: "soft pastel colors, candy colors, light background",
        atmosphere: "cheerful, innocent, playful",
        extras: "kawaii eyes, simple cute shapes, anime food art style"
    },
    'classic animation': { // переименовали и полностью изменили
        pattern: "vintage disney animation style, early cartoon art",
        character: "cute animal character, classic cartoon style",
        colors: "1930s animation colors, watercolor style background",
        atmosphere: "whimsical, charming, nostalgic",
        extras: "hand-drawn animation style, old school cartoon art, classic disney style"
    },
    'vintage poster': { // переработали
        pattern: "vintage advertising poster style, retro design",
        character: "bold graphic element, art deco style symbol",
        colors: "limited color palette, bold contrasts",
        atmosphere: "dramatic, bold, vintage",
        extras: "retro poster art, classic advertising style, clean composition"
    },
    'geometric abstract': {
        pattern: "pure geometric abstraction, bauhaus style composition",
        character: "abstract geometric shapes, mathematical precision",
        colors: "primary colors, strong contrast, white space",
        atmosphere: "structured, balanced, harmonious",
        extras: "flat shapes, pure geometry, mondrian inspired"
    },
    'space fantasy': {
        pattern: "deep space nebula, cosmic cloud formation",
        character: "celestial phenomenon, galaxy pattern",
        colors: "deep space colors, nebula colors, full coverage",
        atmosphere: "cosmic, mysterious, ethereal",
        extras: "star clusters, cosmic dust, space phenomena"
    },
    'pop art': {
        pattern: "pop art style composition, comic art design",
        character: "bold graphic element, pop art symbol",
        colors: "vibrant pop art colors, bold color blocks",
        atmosphere: "bold, energetic, graphic",
        extras: "ben-day dots, clean pop art style, andy warhol inspired"
    },
    'ghibli landscape': {
        pattern: "Studio Ghibli background art style, Hayao Miyazaki art direction, painted environment",
        character: "dreamy landscape, ethereal natural scenery, soft detailed background",
        colors: "soft watercolor palette, gentle color gradients, Ghibli signature colors",
        atmosphere: "whimsical, serene, magical realism",
        extras: "hand-painted background style, subtle color transitions, Ghibli environmental detail",
        bottomArea: "gentle gradient fade, soft atmospheric colors",
        composition: "main elements float in upper space, ethereal background depth",
        specific: [
            "Ghibli cloud patterns",
            "painted sky technique",
            "natural color harmony",
            "atmospheric perspective",
            "Studio Ghibli background artist style",
            "Kazuo Oga painting style",
            "subtle environmental details",
            "soft lighting effects"
        ].join(", ")
    }
};

// Негативные промпты
const baseNegativePrompt = [
    "[text:15152.0]",
    "[letters:2.0]",
    "[symbols:2.0]",
    "[writing:2.0]",
    "[typography:2.0]",
    "[numbers:2.0]",
    "text overlay",
    "text elements",
    "written words",
    "calligraphy",
    "handwriting",
    "font",
    "label text",
    "[photo-realistic:1.5]",
    "[3d:1.5]",
    "[realistic:1.5]",
    "(wine bottle:1.6)",
    "(wine glass:1.6)",
    "(bottles:1.6)",
    "(glasses:1.6)",
    "(drinking:1.6)",
    "(face:1.5)",
    "(nude:1.8)",
    "(nsfw:1.8)",
    "(dark background:1.4)",
    "(busy background:1.4)",
    "realistic objects",
    "complex details",
    "photographic elements",
    "busy composition",
    "product photography",
].join(", ");

/**
 * Генерирует промпт для создания этикетки
 */
export const generatePrompt = async (style, wineData) => {
    const { name, sugar, alcohol, grapes } = wineData;
    const styleConfig = styleConfigs[style];

    // Получаем переведенное название
    let translatedName = await translateText(name);
    translatedName = translatedName
        .replace(/[^\w\s]/gi, '')
        .toLowerCase()
        .trim();
    // Создаем тематический промпт на основе названия
    const themePrompt = `theme: (${translatedName}:1.4)`;

    // Получаем характеристики вина
    const { sugarLevel, alcoholLevel } = getWineCharacter(sugar, alcohol);
    const grapeTypes = analyzeGrapes(grapes);

    // Формируем дополнительные характеристики для промпта
    const wineCharacteristics = [
        sugarLevel,
        alcoholLevel,
        ...grapeTypes
    ].filter(Boolean);

    // Адаптируем базовый стиль под характеристики вина
    let modifiedStyle = { ...styleConfig };

    // Модифицируем цвета и атмосферу в зависимости от характеристик
    if (grapeTypes.includes('red')) {
        modifiedStyle.colors = `deep red tones, ${modifiedStyle.colors}`;
    } else if (grapeTypes.includes('white')) {
        modifiedStyle.colors = `light golden tones, ${modifiedStyle.colors}`;
    }

    if (sugarLevel.includes('sweet')) {
        modifiedStyle.atmosphere = `rich, lush, ${modifiedStyle.atmosphere}`;
    } else if (sugarLevel.includes('dry')) {
        modifiedStyle.atmosphere = `refined, crisp, ${modifiedStyle.atmosphere}`;
    }

    // Собираем финальный промпт
    const promptParts = [
        baseQualityConfig,
        themePrompt,
        centerAreaConfig,
        textAreaConfig,
        modifiedStyle.pattern,
        modifiedStyle.character,
        modifiedStyle.colors,
        modifiedStyle.atmosphere,
        modifiedStyle.extras,
        `wine characteristics: ${wineCharacteristics.join(', ')}`,
        `(main subject:1.5)`,
        `centered composition, subject in the center, clear background around subject`,
        '2:3 aspect ratio, vertical compositio',
    ];

    return {
        prompt: promptParts.join(", "),
        negativePrompt: baseNegativePrompt
    };
};

/**
 * Получает доступные стили этикеток
 * @returns {Array} Массив доступных стилей
 */
export const getAvailableStyles = () => Object.keys(styleConfigs);

/**
 * Получает конфигурацию конкретного стиля
 * @param {string} style - Стиль этикетки
 * @returns {Object} Конфигурация стиля
 */
export const getStyleConfig = (style) => styleConfigs[style];

/**
 * Проверяет валидность стиля
 * @param {string} style - Стиль для проверки
 * @returns {boolean} Является ли стиль валидным
 */
export const isValidStyle = (style) => !!styleConfigs[style];

// Экспортируем конфигурации для возможного использования в других местах
export const configs = {
    baseQuality: baseQualityConfig,
    centerArea: centerAreaConfig,
    styles: styleConfigs,
    negativePrompt: baseNegativePrompt
};