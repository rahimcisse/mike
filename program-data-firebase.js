(function () {
    console.debug('[DEBUG] program-data-firebase.js loaded. firebase typeof:', typeof firebase, 'firestore available:', !!(window.firebase && window.firebase.firestore));
    const pageConfig = {
        acca: {
            title: "TODAY'S ACCA GAMES",
            label: 'ACCA',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-soccer-ball',
                    code: '78910',
                    entries: [
                        'Real Madrid vs Man City - Over 1.5',
                        'Arsenal vs Bayern - Home Win',
                        'Odds: 3.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'PSG vs Barcelona - AWAY WIN',
                        'Leverkusen vs West Ham - Home Win',
                        'Odds: 2.10'
                    ]
                }
            ]
        },
        draw: {
            title: "TODAY'S DRAW GAMES",
            label: 'Draw',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-soccer-ball',
                    code: '78910',
                    entries: [
                        'Real Madrid vs Man City - 3 : 3',
                        'Arsenal vs Bayern - 6 : 6',
                        'Odds: 37.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'PSG vs Barcelona - 9 : 9',
                        'Leverkusen vs West Ham - 2 : 2',
                        'Odds: 30.10'
                    ]
                }
            ]
        },
        correct: {
            title: "TODAY'S CORRECT SCORE GAMES",
            label: 'Correct Score',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-soccer-ball',
                    code: '78910',
                    entries: [
                        'Real Madrid vs Man City - Over 1.5',
                        'Arsenal vs Bayern - Home Win',
                        'Odds: 3.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'PSG vs Barcelona - AWAY WIN',
                        'Leverkusen vs West Ham - Home Win',
                        'Odds: 2.10'
                    ]
                }
            ]
        },
        elite: {
            title: "TODAY'S ELITE GAMES",
            label: 'Elite',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-soccer-ball',
                    code: '78910',
                    entries: [
                        'Real Madrid vs Man City - Over 1.5',
                        'Arsenal vs Bayern - Home Win',
                        'Odds: 3.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'PSG vs Barcelona - AWAY WIN',
                        'Leverkusen vs West Ham - Home Win',
                        'Odds: 2.10'
                    ]
                }
            ]
        },
        golden: {
            title: "TODAY'S GOLDEN GAMES",
            label: 'Golden',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-soccer-ball',
                    code: '78910',
                    entries: [
                        'Real Madrid vs Man City - Over 1.5',
                        'Arsenal vs Bayern - Home Win',
                        'Odds: 3.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'PSG vs Barcelona - AWAY WIN',
                        'Leverkusen vs West Ham - Home Win',
                        'Odds: 2.10'
                    ]
                }
            ]
        },
        nba: {
            title: "TODAY'S NBA GAMES",
            label: 'NBA',
            defaultCards: [
                {
                    title: 'High Reward Games',
                    icon: 'ph ph-basketball',
                    code: '78910',
                    entries: [
                        'Lakers vs Celtics - Over 220.5',
                        'Knicks vs Bucks - Home Win',
                        'Odds: 3.45'
                    ]
                },
                {
                    title: 'Safe Banker',
                    icon: 'ph ph-chart-line-up',
                    code: '123456',
                    entries: [
                        'Mavericks vs Suns - AWAY WIN',
                        'Warriors vs Nuggets - Home Win',
                        'Odds: 2.10'
                    ]
                }
            ]
        }
    };

    const defaultPayload = {
        title: 'STAKEVISION PROGRAMS',
        pages: Object.keys(pageConfig).reduce((accumulator, pageKey) => {
            accumulator[pageKey] = {
                title: pageConfig[pageKey].title,
                cards: pageConfig[pageKey].defaultCards
            };
            return accumulator;
        }, {})
    };

    function getPageConfig(pageKey) {
        return pageConfig[pageKey] || pageConfig.acca;
    }

    function normalizeProgramData(data, fallback) {
        const safeFallback = fallback || { title: 'TODAY\'S PROGRAMS', cards: [] };
        const normalizedCards = Array.isArray(data && data.cards)
            ? data.cards.map((card) => ({
                title: card && card.title ? card.title : 'Program Card',
                icon: card && card.icon ? card.icon : 'ph ph-soccer-ball',
                code: card && card.code ? String(card.code) : '000000',
                entries: Array.isArray(card && card.entries) ? card.entries.map((entry) => String(entry)) : []
            }))
            : (safeFallback.cards || []);

        return {
            title: data && data.title ? data.title : (safeFallback.title || 'TODAY\'S PROGRAMS'),
            cards: normalizedCards.length ? normalizedCards : (safeFallback.cards || [])
        };
    }

    function normalizeProgramPayload(payload) {
        const safePayload = payload && typeof payload === 'object' ? payload : defaultPayload;
        const pages = {};

        Object.keys(pageConfig).forEach((pageKey) => {
            const pageData = safePayload.pages && safePayload.pages[pageKey] ? safePayload.pages[pageKey] : null;
            const config = getPageConfig(pageKey);
            pages[pageKey] = normalizeProgramData(pageData || { title: config.title, cards: config.defaultCards }, config.defaultCards);
        });

        return {
            title: safePayload.title || 'STAKEVISION PROGRAMS',
            pages
        };
    }

    function setProgramPayload(payload) {
        const normalized = normalizeProgramPayload(payload || defaultPayload);
        window.__programPayload = normalized;
        console.debug('[DEBUG] setProgramPayload:', normalized && normalized.title, 'pages:', Object.keys(normalized.pages || {}).length);
        // update on-page debug overlay if present
        try {
            const dbg = document.getElementById('__programs_debug_overlay');
            if (dbg) {
                dbg.innerText = `Firebase:${typeof firebase} firestore:${!!(window.firebase && window.firebase.firestore)} | Title:${normalized.title} | Pages:${Object.keys(normalized.pages||{}).length}`;
            }
        } catch (e) {
            // ignore
        }
        return normalized;
    }

    function getProgramsData(pageKey = 'acca') {
        const payload = window.__programPayload || setProgramPayload(defaultPayload);
        const config = getPageConfig(pageKey);
        const pageData = payload.pages && payload.pages[pageKey];
        console.debug('[DEBUG] getProgramsData for', pageKey, 'has pageData:', !!pageData);
        return pageData || normalizeProgramData({ title: config.title, cards: config.defaultCards }, config.defaultCards);
    }

    async function refreshProgramsData(pageKey = 'acca') {
        console.debug('[DEBUG] refreshProgramsData called for', pageKey);
        try {
            // Check if Firebase is available
            if (typeof firebase === 'undefined' || !firebase.firestore) {
                console.warn('Firebase not initialized or firestore missing, using local defaults');
                const data = getProgramsData(pageKey);
                // ensure overlay shows the fallback data summary
                try {
                    let dbg = document.getElementById('__programs_debug_overlay');
                    if (!dbg) {
                        dbg = document.createElement('div');
                        dbg.id = '__programs_debug_overlay';
                        dbg.style.position = 'fixed';
                        dbg.style.right = '12px';
                        dbg.style.top = '12px';
                        dbg.style.padding = '8px 10px';
                        dbg.style.background = 'rgba(0,0,0,0.6)';
                        dbg.style.color = '#fff';
                        dbg.style.fontSize = '12px';
                        dbg.style.zIndex = 999999;
                        dbg.style.borderRadius = '6px';
                        document.body.appendChild(dbg);
                    }
                    dbg.innerText = `Firebase:undefined firestore:false | Using local defaults | Page:${pageKey} | Cards:${(data.cards||[]).length}`;
                } catch (e) {}
                return data;
            }

            const db = firebase.firestore();
            const docRef = db.collection('config').doc('programs');
            const docSnapshot = await docRef.get();

            if (docSnapshot.exists) {
                const payload = docSnapshot.data();
                const normalized = setProgramPayload(payload);
                try {
                    let dbg = document.getElementById('__programs_debug_overlay');
                    if (!dbg) {
                        dbg = document.createElement('div');
                        dbg.id = '__programs_debug_overlay';
                        dbg.style.position = 'fixed';
                        dbg.style.right = '12px';
                        dbg.style.top = '12px';
                        dbg.style.padding = '8px 10px';
                        dbg.style.background = 'rgba(0,0,0,0.6)';
                        dbg.style.color = '#fff';
                        dbg.style.fontSize = '0.001px';
                        dbg.style.zIndex = 999999;
                        dbg.style.borderRadius = '6px';
                        document.body.appendChild(dbg);
                    }
                    dbg.innerText = `Firebase:available firestore:true | Page:${pageKey} | Cards:${(normalized.pages && normalized.pages[pageKey] && normalized.pages[pageKey].cards? normalized.pages[pageKey].cards.length : 0)}`;
                } catch (e) {}
                return normalized.pages[pageKey] || getProgramsData(pageKey);
            } else {
                console.warn('Programs document not found in Firestore; falling back to local defaults');
                return getProgramsData(pageKey);
            }
        } catch (error) {
            console.warn('Failed to load from Firestore, using local defaults:', error && error.message ? error.message : error);
            return getProgramsData(pageKey);
        }
    }

    async function saveProgramPage(pageKey, data) {
        try {
            if (typeof firebase === 'undefined' || !firebase.firestore) {
                throw new Error('Firebase not initialized');
            }

            const db = firebase.firestore();
            const docRef = db.collection('config').doc('programs');

            const currentPayload = window.__programPayload || setProgramPayload(defaultPayload);
            const config = getPageConfig(pageKey);
            const pageData = normalizeProgramData(data, config.defaultCards);
            currentPayload.pages[pageKey] = pageData;
            currentPayload.lastUpdated = new Date().toISOString();

            await docRef.set(currentPayload);

            const normalized = setProgramPayload(currentPayload);
            console.log('Successfully saved page to Firestore:', pageKey);
            return normalized.pages[pageKey];
        } catch (error) {
            console.error('Save error:', error);
            throw error;
        }
    }

    function exportProgramsDataFile() {
        const payload = window.__programPayload || setProgramPayload(defaultPayload);
        const dataStr = JSON.stringify(payload, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'programs.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    function importProgramsDataFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    const normalized = normalizeProgramPayload(imported);
                    window.__programPayload = normalized;

                    if (typeof firebase === 'undefined' || !firebase.firestore) {
                        throw new Error('Firebase not initialized');
                    }

                    const db = firebase.firestore();
                    const docRef = db.collection('config').doc('programs');
                    normalized.lastUpdated = new Date().toISOString();
                    
                    await docRef.set(normalized);
                    resolve(normalized);
                } catch (error) {
                    reject(new Error('Invalid JSON file or Firestore save failed: ' + error.message));
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsText(file);
        });
    }

    window.PROGRAM_PAGE_CONFIG = pageConfig;
    window.getProgramsData = getProgramsData;
    window.refreshProgramsData = refreshProgramsData;
    window.saveProgramPage = saveProgramPage;
    window.exportProgramsDataFile = exportProgramsDataFile;
    window.importProgramsDataFile = importProgramsDataFile;
    window.__programPayload = setProgramPayload(defaultPayload);
})();
