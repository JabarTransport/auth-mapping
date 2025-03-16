// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB62dgVC2BMKm7d-UjNms93SNN38BFUb4I",
    authDomain: "login-with-agio.web.app",
    projectId: "login-agio",
    storageBucket: "login-agio.firebasestorage.app",
    messagingSenderId: "1089500143018",
    appId: "1:1089500143018:web:7b3bbaa11a0c86af989fd3",
    measurementId: "G-WQT0VC0EBE"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // UI Controls
  const toggleLoader = (type, isLoading) => {
    const elements = {
      keyword: {
        text: document.getElementById('keywordText'),
        spinner: document.getElementById('keywordSpinner'),
        button: document.getElementById('keywordBtn')
      },
      github: {
        text: document.getElementById('githubText'),
        spinner: document.getElementById('githubSpinner'),
        button: document.getElementById('githubBtn')
      }
    };
  
    const target = elements[type];
    target.text.classList.toggle('hidden', isLoading);
    target.spinner.classList.toggle('hidden', !isLoading);
    target.button.disabled = isLoading;
  };
  
  const showError = (message) => {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 5000);
  };
  
  // Login Handlers
  const handleKeywordLogin = async () => {
    try {
      toggleLoader('keyword', true);
      const keyword = document.getElementById('keywordInput').value;
      
      if (keyword === "yupra") { // Ganti dengan secret key yang diinginkan
        const tokenData = {
          method: 'keyword',
          timestamp: Date.now(),
          exp: Date.now() + 300000 // 5 menit
        };
        const token = btoa(JSON.stringify(tokenData));
        
        // Simpan token dan metode login di localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('loginMethod', 'keyword');
        
        // Redirect ke halaman profil
        window.location.href = 'https://homeagio.netlify.app/chage.html';
      } else {
        throw new Error('Secret key tidak valid');
      }
    } catch (error) {
      showError(error.message);
    } finally {
      toggleLoader('keyword', false);
    }
  };
  
  const loginWithGitHub = async () => {
    try {
      toggleLoader('github', true);
      const provider = new firebase.auth.GithubAuthProvider();
      const result = await auth.signInWithPopup(provider);
      const token = await result.user.getIdToken();
      
      // Simpan token dan metode login di localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('loginMethod', 'github');
      
      // Redirect ke halaman profil
      window.location.href = 'https://homeagio.netlify.app/chage.html';
    } catch (error) {
      showError(error.message);
    } finally {
      toggleLoader('github', false);
    }
  };
  
  // Form Validation
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    handleKeywordLogin();
  });
  
  // Auto-focus input
  document.getElementById('keywordInput').focus();
