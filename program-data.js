(function () {
    const defaultProgramsByPage = {
        acca: {
            title: "TODAY'S ACCA GAMES",
            cards: [
                {
                    title: "High Reward Games",
                    icon: "ph ph-soccer-ball",
                    code: "78910",
                    entries: [
                        "Real Madrid vs Man City - Over 1.5",
                        "Arsenal vs Bayern - Home Win",
                        "Odds: 3.45"
                    ]
                },
                {
                    title: "Safe Banker",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "PSG vs Barcelona - AWAY WIN",
                        "Leverkusen vs West Ham - Home Win",
                        "Odds: 2.10"
                    ]
                }
            ]
        },
        correct: {
            title: "TODAY'S CORRECT SCORE GAMES",
            cards: [
                {
                    title: "Correct Score Picks",
                    icon: "ph ph-soccer-ball",
                    code: "78910",
                    entries: [
                        "Real Madrid 2-1 Man City",
                        "Arsenal 3-2 Bayern",
                        "Odds: 7.20"
                    ]
                },
                {
                    title: "Value Correct Scores",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "PSG 2-0 Barcelona",
                        "Leverkusen 1-1 West Ham",
                        "Odds: 6.80"
                    ]
                }
            ]
        },
        draw: {
            title: "TODAY'S DRAW GAMES",
            cards: [
                {
                    title: "Draw Specialists",
                    icon: "ph ph-soccer-ball",
                    code: "78910",
                    entries: [
                        "Real Madrid vs Man City - 3:3",
                        "Arsenal vs Bayern - 2:2",
                        "Odds: 37.45"
                    ]
                },
                {
                    title: "Low Risk Draws",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "PSG vs Barcelona - 1:1",
                        "Leverkusen vs West Ham - 2:2",
                        "Odds: 30.10"
                    ]
                }
            ]
        },
        elite: {
            title: "TODAY'S ELITE GAMES",
            cards: [
                {
                    title: "Elite Matchups",
                    icon: "ph ph-soccer-ball",
                    code: "78910",
                    entries: [
                        "Real Madrid vs Man City - Over 1.5",
                        "Arsenal vs Bayern - Home Win",
                        "Odds: 4.10"
                    ]
                },
                {
                    title: "Premium Banker",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "PSG vs Barcelona - Away Win",
                        "Leverkusen vs West Ham - Home Win",
                        "Odds: 2.95"
                    ]
                }
            ]
        },
        golden: {
            title: "TODAY'S GOLDEN GAMES",
            cards: [
                {
                    title: "Golden Corner",
                    icon: "ph ph-soccer-ball",
                    code: "78910",
                    entries: [
                        "Real Madrid vs Man City - Over 1.5",
                        "Arsenal vs Bayern - Home Win",
                        "Odds: 5.50"
                    ]
                },
                {
                    title: "Golden Banker",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "PSG vs Barcelona - Away Win",
                        "Leverkusen vs West Ham - Home Win",
                        "Odds: 3.15"
                    ]
                }
            ]
        },
        nba: {
            title: "TODAY'S NBA GAMES",
            cards: [
                {
                    title: "NBA High Reward",
                    icon: "ph ph-basketball",
                    code: "78910",
                    entries: [
                        "Lakers vs Celtics - Over 215.5",
                        "Nuggets vs Bucks - Away Win",
                        "Odds: 3.70"
                    ]
                },
                {
                    title: "NBA Safe Banker",
                    icon: "ph ph-chart-line-up",
                    code: "123456",
                    entries: [
                        "Mavericks vs Knicks - Home Win",
                        "Warriors vs Clippers - Over 214.5",
                        "Odds: 2.45"
                    ]
                }
            ]
        }
    };

    function normalizePageKey(pageKey) {
        const normalized = String(pageKey || 'acca').trim().toLowerCase().replace(/\.html$/i, '').replace(/[^a-z0-9_-]+/g, '');
        return normalized || 'acca';
    }

    function getStorageKey(pageKey) {
        const normalized = normalizePageKey(pageKey);
        return normalized === 'acca' ? 'stakevision_programs' : `stakevision_${normalized}_programs`;
    }

    function getProgramsData(pageKey = 'acca') {
        const normalized = normalizePageKey(pageKey);
        const defaultData = defaultProgramsByPage[normalized] || defaultProgramsByPage.acca;

        try {
            const storageKey = getStorageKey(normalized);
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && Array.isArray(parsed.cards)) {
                    return parsed;
                }
            }
        } catch (error) {
            console.warn(`Could not read saved ${normalized} program data.`, error);
        }

        return defaultData;
    }

    window.STAKEVISION_PROGRAMS = defaultProgramsByPage;
    window.STAKEVISION_STORAGE_KEY = getStorageKey('acca');
    window.getProgramsData = getProgramsData;
    window.getStorageKey = getStorageKey;
    window.normalizePageKey = normalizePageKey;
})();
