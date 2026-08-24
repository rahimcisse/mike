// Firebase Configuration
// Replace these values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyD9R-VHVuAvTs8g3ybobSczdeLYf7q8HEg",
  authDomain: "stakevisionbet-12345.firebaseapp.com",
  projectId: "stakevisionbet-12345",
  storageBucket: "stakevisionbet-12345.firebasestorage.app",
  messagingSenderId: "545975308421",
  appId: "1:545975308421:web:aae58522940c3311a5d9ec",
  measurementId: "G-8YR04C6EXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Store reference to the programs document
const PROGRAMS_DOC_REF = db.collection('config').doc('programs');

// Initialize Firestore with programs data if not exists
async function initializeFirestore() {
  try {
    const docSnapshot = await PROGRAMS_DOC_REF.get();
    if (!docSnapshot.exists) {
      // Create default programs document
      const defaultPayload = {
        title: 'STAKEVISION PROGRAMS',
        pages: {
          acca: {
            title: "TODAY'S ACCA GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-soccer-ball',
                code: '78910',
                entries: ['Real Madrid vs Man City - Over 1.5', 'Arsenal vs Bayern - Home Win', 'Odds: 3.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['PSG vs Barcelona - AWAY WIN', 'Leverkusen vs West Ham - Home Win', 'Odds: 2.10']
              }
            ]
          },
          draw: {
            title: "TODAY'S DRAW GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-soccer-ball',
                code: '78910',
                entries: ['Real Madrid vs Man City - 3 : 3', 'Arsenal vs Bayern - 6 : 6', 'Odds: 37.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['PSG vs Barcelona - 9 : 9', 'Leverkusen vs West Ham - 2 : 2', 'Odds: 30.10']
              }
            ]
          },
          correct: {
            title: "TODAY'S CORRECT SCORE GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-soccer-ball',
                code: '78910',
                entries: ['Real Madrid vs Man City - Over 1.5', 'Arsenal vs Bayern - Home Win', 'Odds: 3.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['PSG vs Barcelona - AWAY WIN', 'Leverkusen vs West Ham - Home Win', 'Odds: 2.10']
              }
            ]
          },
          elite: {
            title: "TODAY'S ELITE GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-soccer-ball',
                code: '78910',
                entries: ['Real Madrid vs Man City - Over 1.5', 'Arsenal vs Bayern - Home Win', 'Odds: 3.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['PSG vs Barcelona - AWAY WIN', 'Leverkusen vs West Ham - Home Win', 'Odds: 2.10']
              }
            ]
          },
          golden: {
            title: "TODAY'S GOLDEN GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-soccer-ball',
                code: '78910',
                entries: ['Real Madrid vs Man City - Over 1.5', 'Arsenal vs Bayern - Home Win', 'Odds: 3.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['PSG vs Barcelona - AWAY WIN', 'Leverkusen vs West Ham - Home Win', 'Odds: 2.10']
              }
            ]
          },
          nba: {
            title: "TODAY'S NBA GAMES",
            cards: [
              {
                title: 'High Reward Games',
                icon: 'ph ph-basketball',
                code: '78910',
                entries: ['Lakers vs Celtics - Over 220.5', 'Knicks vs Bucks - Home Win', 'Odds: 3.45']
              },
              {
                title: 'Safe Banker',
                icon: 'ph ph-chart-line-up',
                code: '123456',
                entries: ['Mavericks vs Suns - AWAY WIN', 'Warriors vs Nuggets - Home Win', 'Odds: 2.10']
              }
            ]
          }
        },
        lastUpdated: new Date().toISOString()
      };
      
      await PROGRAMS_DOC_REF.set(defaultPayload);
      console.log('Firestore initialized with default programs data');
    }
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

// Call initialization on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFirestore);
} else {
  initializeFirestore();
}
