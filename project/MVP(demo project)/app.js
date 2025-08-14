/**
 * ========================================
 * STORYLAND ADVENTURES - MAIN APPLICATION
 * ========================================
 * 
 * This is a Progressive Web App (PWA) for children aged 4-10
 * Features: Bilingual stories, audio narration, progress tracking
 * 
 * File Structure:
 * - Constructor: Initialize app properties and translations
 * - initializeApp: Main app setup and DOM initialization
 * - Event Listeners: Handle all user interactions
 * - Story Management: Load, display, and manage story content
 * - Audio System: Handle narration and word highlighting
 * - User Management: Profiles, login, progress tracking
 * - Language System: English/Arabic translation and switching
 * - UI Functions: Modal management, page navigation, notifications
 * - PWA Features: Service worker, offline capabilities
 */

// TPRS Stories Application
console.log('🚀 TPRS App JavaScript loaded!');

class TPRSApp {
    /**
     * ========================================
     * CONSTRUCTOR - APP INITIALIZATION
     * ========================================
     * Initializes all app properties, translations, and basic setup
     * Called when the app is first loaded
     */
    constructor() {
        try {
            console.log('🏗️ ===== TPRSApp CONSTRUCTOR STARTED =====');
            
            // Initialize basic properties
            this.currentLanguage = 'en'; // Default language
            this.currentStory = null;
            this.currentStoryIndex = 0;
            this.audio = null;
            this.isPlaying = false;
            this.currentWordIndex = 0;
            this.language = 'en'; // 'en' or 'ar'
            this.progress = {};
            this.stories = [];
            this.activeProfile = null; // {id, name}
            this.currentPage = 'home'; // 'home', 'stories', 'reader', 'progress', 'profile'
            
            // Translation system
            this.translationCache = new Map(); // Cache translations for offline use
            this.translationAPI = 'https://api.mymemory.translated.net/get'; // Free translation API
            this.offlineTranslations = new Map(); // Store translations for offline use
            
            // Pre-built offline translations for UI elements
            this.uiTranslations = {
                en: {
                    'title': 'StoryLand Adventures',
                    'login': '🔑 Login',
                    'signup': '✨ Sign Up',
                    'logout': '🚪',
                    'nav-home': 'Home',
                    'nav-stories': 'Stories',
                    'nav-progress': 'Progress',
                    'nav-profile': 'Profile',
                    'hero-title': 'Welcome to StoryLand Adventures!',
                    'hero-subtitle': 'Discover magical stories, learn new words, and earn stars as you read! Perfect for children aged 4-10.',
                    'watch-demo': '🎬 Watch Demo',
                    'get-stories': '📚 Start Reading',
                    'rating-text': 'Rated 5 Stars by Parents',
                    'dashboard-welcome': 'Welcome back!',
                    'dashboard-encouragement': 'Keep reading to earn more stars!',
                    'dashboard-completed': 'Completed:',
                    'stories-title': 'Story Library',
                    'stories-subtitle': 'Choose your next adventure! Each story teaches new words and earns you stars.',
                    'filter-english': '🇺🇸 English',
                    'filter-arabic': '🇵🇸 العربية',
                    'back-to-stories': '← Back to Stories',
                    'story-title': 'Story Title',
                    'story-content': 'Story content will be loaded here...',
                    'vocabulary-title': 'New Words to Learn',
                    'audio-controls': 'Audio Controls',
                    'previous': '⏮️ Previous',
                    'play-pause': '▶️ Play',
                    'next': '⏭️ Next',
                    'auth-welcome': 'Welcome to StoryLand!',
                    'login-tab': '🔑 Login',
                    'signup-tab': '✨ Sign Up',
                    'login-username': 'Username',
                    'login-pin': '4-Digit PIN',
                    'login-submit': '🚀 Login & Start Adventure',
                    'signup-name': 'Child\'s Name',
                    'signup-age': 'Age (4-10 years)',
                    'signup-pin': '4-Digit PIN',
                    'signup-confirm': 'Confirm PIN',
                    'signup-submit': '✨ Create & Start Adventure',
                    'select-age': 'Select age',
                    'age-4': '4 years old',
                    'age-5': '5 years old',
                    'age-6': '6 years old',
                    'age-7': '7 years old',
                    'age-8': '8 years old',
                    'age-9': '9 years old',
                    'age-10': '10 years old',
                    'progress-title': 'Your Progress'
                },
                ar: {
                    'title': 'مغامرات أرض القصص',
                    'login': '🔑 تسجيل الدخول',
                    'signup': '✨ إنشاء حساب',
                    'logout': '🚪',
                    'nav-home': 'الرئيسية',
                    'nav-stories': 'القصص',
                    'nav-progress': 'التقدم',
                    'nav-profile': 'الملف الشخصي',
                    'hero-title': 'مرحباً بك في مغامرات أرض القصص!',
                    'hero-subtitle': 'اكتشف القصص السحرية، تعلم كلمات جديدة، واحصل على نجوم أثناء القراءة! مثالي للأطفال من عمر 4-10 سنوات.',
                    'watch-demo': '🎬 مشاهدة العرض',
                    'get-stories': '📚 ابدأ القراءة',
                    'rating-text': 'تقييم 5 نجوم من الآباء',
                    'dashboard-welcome': 'مرحباً بعودتك!',
                    'dashboard-encouragement': 'استمر في القراءة للحصول على المزيد من النجوم!',
                    'dashboard-completed': 'مكتمل:',
                    'stories-title': 'مكتبة القصص',
                    'stories-subtitle': 'اختر مغامرتك التالية! كل قصة تعلمك كلمات جديدة وتكسبك نجوم.',
                    'filter-english': '🇺🇸 الإنجليزية',
                    'filter-arabic': '🇵🇸 العربية',
                    'back-to-stories': '← العودة إلى القصص',
                    'story-title': 'عنوان القصة',
                    'story-content': 'سيتم تحميل محتوى القصة هنا...',
                    'vocabulary-title': 'كلمات جديدة للتعلم',
                    'audio-controls': 'أدوات التحكم الصوتية',
                    'previous': '⏮️ السابق',
                    'play-pause': '▶️ تشغيل',
                    'next': '⏭️ التالي',
                    'auth-welcome': 'مرحباً بك في أرض القصص!',
                    'login-tab': '🔑 تسجيل الدخول',
                    'signup-tab': '✨ إنشاء حساب',
                    'login-username': 'اسم المستخدم',
                    'login-pin': 'رمز PIN من 4 أرقام',
                    'login-submit': '🚀 تسجيل الدخول وبدء المغامرة',
                    'signup-name': 'اسم الطفل',
                    'signup-age': 'العمر (4-10 سنوات)',
                    'signup-pin': 'رمز PIN من 4 أرقام',
                    'signup-confirm': 'تأكيد الرمز',
                    'signup-submit': '✨ إنشاء وبدء المغامرة',
                    'select-age': 'اختر العمر',
                    'age-4': '4 سنوات',
                    'age-5': '5 سنوات',
                    'age-6': '6 سنوات',
                    'age-7': '7 سنوات',
                    'age-8': '8 سنوات',
                    'age-9': '9 سنوات',
                    'age-10': '10 سنوات',
                    'progress-title': 'تقدمك'
                }
            };
            
            // Arabic story content (will be automatically generated)
            this.arabicStories = [];
            
            // Validate critical properties
            if (!this.uiTranslations || !this.uiTranslations.en || !this.uiTranslations.ar) {
                throw new Error('UI translations not properly initialized');
            }
            
            console.log('🏗️ Constructor properties initialized:');
            console.log('🏗️ - currentLanguage:', this.currentLanguage);
            console.log('🏗️ - stories.length:', this.stories.length);
            console.log('🏗️ - uiTranslations keys:', Object.keys(this.uiTranslations.en).length, 'English,', Object.keys(this.uiTranslations.ar).length, 'Arabic');
            console.log('🏗️ - translationCache size:', this.translationCache.size);
            console.log('🏗️ - offlineTranslations size:', this.offlineTranslations.size);
            
            console.log('🏗️ ===== TPRSApp CONSTRUCTOR COMPLETED =====');
            
            // Initialize the app after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.initializeApp();
            }, 100);
            
        } catch (error) {
            console.error('❌ Error in TPRSApp constructor:', error);
            console.error('❌ Constructor error stack:', error.stack);
            throw error; // Re-throw to be caught by the initialization code
        }
    }

    /**
     * ========================================
     * INITIALIZE APP - MAIN SETUP FUNCTION
     * ========================================
     * Sets up the entire application after DOM is ready
     * Initializes all systems: language, stories, event listeners, etc.
     */
    async initializeApp() {
        try {
            console.log('🚀 ===== APP INITIALIZATION STARTED =====');
            
            // Step 1: Verify critical DOM elements exist
            console.log('🔍 Step 1: Verifying critical DOM elements...');
            this.verifyRequiredElements();
            
            // Step 2: Load saved data and preferences
            console.log('🔍 Step 2: Loading saved data and preferences...');
            this.loadLanguagePreference();
            this.loadOfflineTranslations();
            this.loadTranslatedStories();
            
            // Step 3: Set up language-specific content
            console.log('🔍 Step 3: Setting up language-specific content...');
            if (this.currentLanguage === 'ar') {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
                await this.translatePageContent();
            }
            
            // Step 4: Initialize stories and content
            console.log('🔍 Step 4: Initializing stories and content...');
            this.initializeStories();
            
            // Step 5: Set up all event listeners
            console.log('🔍 Step 5: Setting up event listeners...');
            this.setupEventListeners();
            
            // Step 6: Set up PWA features
            console.log('🔍 Step 6: Setting up PWA features...');
            this.setupServiceWorker();
            this.setupBackgroundImage();
            this.setupSmoothScrolling();
            
            // Step 7: Load user profile and progress
            console.log('🔍 Step 7: Loading user profile and progress...');
            this.loadActiveProfile();
            this.loadProgress();
            
            // Step 8: Update UI based on current state
            console.log('🔍 Step 8: Updating UI state...');
            this.setUserBadge();
            this.refreshDashboardBar();
            this.updateProgressDisplay();
            
            console.log('✅ ===== APP INITIALIZATION COMPLETED =====');
            console.log('✅ App initialization completed!');
            
            // Final debug check
            console.log('🔍 ===== FINAL DEBUG CHECK =====');
            console.log('🔍 DOM ready state:', document.readyState);
            console.log('🔍 All scripts loaded:', Array.from(document.scripts).map(s => s.src || 'inline'));
            
            // Show success message
            this.showNotification('🎉 StoryLand Adventures loaded successfully!', 'success', 3000);
            
        } catch (error) {
            console.error('❌ ===== CRITICAL ERROR DURING INITIALIZATION =====');
            console.error('❌ Error details:', error);
            console.error('❌ Error stack:', error.stack);
            
            // Show error to user
            this.showErrorToUser('App initialization failed: ' + error.message);
        }
    }

    /**
     * ========================================
     * UI FUNCTIONS - MODAL MANAGEMENT & NAVIGATION
     * ========================================
     * Handles page navigation, modal display, and UI state management
     */
    
    /**
     * Show a specific page and hide others
     * @param {string} pageId - ID of the page to show
     */
    showPage(pageId) {
        console.log('📱 ===== SHOWING PAGE =====');
        console.log('📱 Page ID:', pageId);
        
        try {
            // Map page IDs to existing HTML IDs
            const pageMapping = {
                'home': 'homePage',
                'stories': 'storiesPage',
                'reader': 'readerPage',
                'progress': 'progressPage',
                'profile': 'profilePage'
            };
            
            const targetPageId = pageMapping[pageId] || pageId;
            console.log('📱 Target page ID:', targetPageId);
            
            // Hide all pages first
            const allPages = ['homePage', 'storiesPage', 'readerPage', 'progressPage', 'profilePage'];
            allPages.forEach(pageId => {
                const pageElement = document.getElementById(pageId);
                if (pageElement) {
                    pageElement.classList.add('hidden');
                }
            });
            
            // Show requested page
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.remove('hidden');
            } else {
                console.error('❌ Page not found:', targetPageId);
                return;
            }
            
            this.currentPage = pageId;
            
            // Load stories if showing stories page
            if (pageId === 'stories') {
                this.loadStories();
            }
            
            // Update navigation state
            this.syncNavigationState();
            
            console.log('✅ Page shown:', pageId);
            
        } catch (error) {
            console.error('❌ Error showing page:', error);
        }
    }
    
    /**
     * Show progress modal
     */
    showProgressModal() {
        console.log('📊 ===== SHOWING PROGRESS MODAL =====');
        
        try {
            const progressModal = document.getElementById('progressModal');
            if (progressModal) {
                progressModal.classList.remove('hidden');
                this.updateProgressDisplay();
                console.log('✅ Progress modal shown');
            } else {
                console.error('❌ Progress modal not found');
            }
        } catch (error) {
            console.error('❌ Error showing progress modal:', error);
        }
    }
    
    /**
     * Hide progress modal
     */
    hideProgressModal() {
        console.log('📊 ===== HIDING PROGRESS MODAL =====');
        
        try {
            const progressModal = document.getElementById('progressModal');
            if (progressModal) {
                progressModal.classList.add('hidden');
                console.log('✅ Progress modal hidden');
            }
        } catch (error) {
            console.error('❌ Error hiding progress modal:', error);
        }
    }
    
    /**
     * Show profile page instead of auth modal
     * This is the new functionality requested by the user
     */
    showProfilePage() {
        console.log('👤 ===== SHOWING PROFILE PAGE =====');
        
        try {
            if (this.activeProfile) {
                // User is logged in - show profile page
                this.showPage('profile');
                this.updateProfilePageDisplay();
                console.log('✅ Profile page shown for logged-in user');
            } else {
                // User is not logged in - show auth modal
                this.openAuthModal('login');
                console.log('✅ Auth modal shown for non-logged-in user');
            }
        } catch (error) {
            console.error('❌ Error showing profile page:', error);
        }
    }
    
    /**
     * Update profile page display with current user information
     */
    updateProfilePageDisplay() {
        console.log('👤 ===== UPDATING PROFILE PAGE DISPLAY =====');
        
        try {
            if (!this.activeProfile) return;
            
            // Update profile information using existing HTML IDs
            const profileName = document.getElementById('profileName');
            const profileAge = document.getElementById('profileAge');
            
            if (profileName) profileName.textContent = this.activeProfile.name;
            if (profileAge) profileAge.textContent = `Age: ${this.activeProfile.age} years old`;
            
            // Update progress summary
            this.updateProgressSummary();
            
            console.log('✅ Profile page display updated');
            
        } catch (error) {
            console.error('❌ Error updating profile page display:', error);
        }
    }
    
    /**
     * Update progress summary on profile page
     */
    updateProgressSummary() {
        try {
            const progressSummary = document.getElementById('progressSummary');
            if (!progressSummary || !this.activeProfile) return;
            
            const userProgress = this.progress[this.activeProfile.id] || {};
            const completedStories = Object.values(userProgress).filter(story => story.completed);
            
            if (completedStories.length === 0) {
                progressSummary.innerHTML = '<p class="text-gray-500 text-center">No stories completed yet. Start reading to earn stars! ⭐</p>';
            } else {
                progressSummary.innerHTML = completedStories.map(story => `
                    <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span class="font-medium text-green-800">${story.title || 'Story'}</span>
                        <span class="text-green-600">⭐ Completed</span>
                    </div>
                `).join('');
            }
            
        } catch (error) {
            console.error('❌ Error updating progress summary:', error);
        }
    }
    
    /**
     * Reset authentication form to initial state
     */
    resetAuthForm() {
        console.log('🔐 ===== RESETTING AUTH FORM =====');
        
        try {
            // Clear all form inputs
            const inputs = ['loginUsername', 'loginPin', 'signupName', 'signupAge', 'signupPin', 'signupConfirmPin'];
            inputs.forEach(id => {
                const input = document.getElementById(id);
                if (input) input.value = '';
            });
            
            // Reset to login tab
            this.showLoginTab();
            
            console.log('✅ Auth form reset successfully');
            
        } catch (error) {
            console.error('❌ Error resetting auth form:', error);
        }
    }
    
    /**
     * Update progress display with current user data
     */
    updateProgressDisplay() {
        console.log('📊 ===== UPDATING PROGRESS DISPLAY =====');
        
        try {
            if (!this.activeProfile) {
                console.log('📊 No active profile, skipping progress update');
                return;
            }
            
            const totalStars = this.getTotalStars();
            const completedStories = Object.values(this.progress[this.activeProfile.id] || {})
                .filter(story => story.completed).length;
            
            // Update progress elements
            const progressElements = document.querySelectorAll('[data-progress]');
            progressElements.forEach(element => {
                const type = element.getAttribute('data-progress');
                switch (type) {
                    case 'stars':
                        element.textContent = `⭐ ${totalStars}`;
                        break;
                    case 'completed':
                        element.textContent = `📚 ${completedStories}`;
                        break;
                }
            });
            
            console.log(`✅ Progress updated: ${totalStars} stars, ${completedStories} completed stories`);
            
        } catch (error) {
            console.error('❌ Error updating progress display:', error);
        }
    }
    
    /**
     * Refresh dashboard bar with current user information
     */
    refreshDashboardBar() {
        console.log('📊 ===== REFRESHING DASHBOARD BAR =====');
        
        try {
            const dashboardBar = document.getElementById('dashboardBar');
            if (!dashboardBar) {
                console.log('📊 Dashboard bar not found, skipping refresh');
                return;
            }
            
            if (this.activeProfile) {
                // Show dashboard for logged-in user
                dashboardBar.classList.remove('hidden');
                
                // Update dashboard content
                const welcomeText = dashboardBar.querySelector('[data-lang="dashboard-welcome"]');
                const encouragementText = dashboardBar.querySelector('[data-lang="dashboard-encouragement"]');
                const completedText = dashboardBar.querySelector('[data-lang="dashboard-completed"]');
                
                if (welcomeText) welcomeText.textContent = `Welcome back, ${this.activeProfile.name}!`;
                if (encouragementText) encouragementText.textContent = 'Keep reading to earn more stars!';
                if (completedText) completedText.textContent = `Completed: ${this.getTotalStars()} stories`;
                
                console.log('✅ Dashboard bar refreshed for logged-in user');
            } else {
                // Hide dashboard for non-logged-in user
                dashboardBar.classList.add('hidden');
                console.log('✅ Dashboard bar hidden for non-logged-in user');
            }
            
        } catch (error) {
            console.error('❌ Error refreshing dashboard bar:', error);
        }
    }
    
    /**
     * Load stories based on current language
     */
    loadStories() {
        console.log('📚 ===== LOADING STORIES =====');
        
        try {
            // Find stories container using the correct ID
            const storiesContainer = document.getElementById('storiesContainer');
            
            if (!storiesContainer) {
                console.error('❌ Stories container not found with ID: storiesContainer');
                console.log('🔍 Available elements with similar names:');
                document.querySelectorAll('[id*="stories"]').forEach(el => {
                    console.log('🔍 Found:', el.id, el);
                });
                return;
            }
            
            console.log('✅ Found stories container:', storiesContainer);
            
            // Get stories for current language
            const storiesToShow = this.getStoriesForLanguage();
            console.log(`📚 Loading ${storiesToShow.length} stories in ${this.currentLanguage}`);
            console.log('📚 Stories to show:', storiesToShow);
            
            // Clear existing content
            storiesContainer.innerHTML = '';
            
            // Create story cards
            storiesToShow.forEach((story, index) => {
                console.log(`📚 Creating story card ${index + 1}:`, story.title);
                
                const storyCard = document.createElement('div');
                storyCard.className = 'story-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer';
                storyCard.style.direction = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
                
                storyCard.innerHTML = `
                    <div class="text-4xl mb-4 text-center">${story.illustration}</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2 text-center">${story.title}</h3>
                    <p class="text-gray-600 text-sm text-center mb-4">${story.description}</p>
                    <div class="flex justify-center">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            📖 Read Story
                        </button>
                    </div>
                `;
                
                // Add click event to load story
                storyCard.addEventListener('click', () => {
                    console.log('📚 Story card clicked:', story.title);
                    this.loadStoryContent(story);
                });
                
                storiesContainer.appendChild(storyCard);
                console.log(`✅ Story card ${index + 1} added to container`);
            });
            
            console.log(`✅ ${storiesToShow.length} stories loaded successfully`);
            
        } catch (error) {
            console.error('❌ Error loading stories:', error);
        }
    }
    
    /**
     * Get stories for current language
     * @returns {Array} Array of stories in current language
     */
    getStoriesForLanguage() {
        if (this.currentLanguage === 'ar' && this.arabicStories.length > 0) {
            return this.arabicStories;
        }
        return this.stories;
    }

    // ---------- Navigation ----------
    showPage(pageId) {
        console.log('📄 Showing page:', pageId);
        try {
            // Hide all pages
            const pages = ['homePage', 'storiesPage', 'storyReader'];
            pages.forEach(id => {
                const page = document.getElementById(id);
                if (page) {
                    page.classList.add('hidden');
                }
            });
            
            // Show requested page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                this.currentPage = pageId;
                console.log('✅ Page shown:', pageId);
            } else {
                console.error('❌ Page not found:', pageId);
            }
        } catch (error) {
            console.error('❌ Error showing page:', error);
        }
    }
    
    showProgressModal() {
        console.log('📊 Showing progress modal');
        try {
            const modal = document.getElementById('progressModal');
            if (modal) {
                modal.classList.remove('hidden');
                console.log('✅ Progress modal shown');
            } else {
                console.error('❌ Progress modal not found');
            }
        } catch (error) {
            console.error('❌ Error showing progress modal:', error);
        }
    }
    
    hideProgressModal() {
        console.log('📊 Hiding progress modal');
        try {
            const modal = document.getElementById('progressModal');
            if (modal) {
                modal.classList.add('hidden');
                console.log('✅ Progress modal hidden');
            }
        } catch (error) {
            console.error('❌ Error hiding progress modal:', error);
        }
    }
    
    closeAuthModal() {
        console.log('🔐 Closing auth modal');
        try {
            const modal = document.getElementById('authModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('modal-enter');
                console.log('✅ Auth modal closed');
            }
        } catch (error) {
            console.error('❌ Error closing auth modal:', error);
        }
    }
    
    showLoginTab() {
        console.log('🔑 Showing login tab');
        try {
            const loginSection = document.getElementById('loginSection');
            const signupSection = document.getElementById('signupSection');
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            
            if (loginSection && signupSection && loginTab && signupTab) {
                loginSection.classList.remove('hidden');
                signupSection.classList.add('hidden');
                loginTab.classList.add('border-accent-blue');
                signupTab.classList.remove('border-accent-blue');
                console.log('✅ Login tab shown');
            }
        } catch (error) {
            console.error('❌ Error showing login tab:', error);
        }
    }
    
    showSignupTab() {
        console.log('✨ Showing signup tab');
        try {
            const loginSection = document.getElementById('loginSection');
            const signupSection = document.getElementById('signupSection');
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            
            if (loginSection && signupSection && loginTab && signupTab) {
                signupSection.classList.remove('hidden');
                loginSection.classList.add('hidden');
                signupTab.classList.add('border-accent-blue');
                loginTab.classList.remove('border-accent-blue');
                console.log('✅ Signup tab shown');
            }
        } catch (error) {
            console.error('❌ Error showing signup tab:', error);
        }
    }
    
    watchDemo() {
        console.log('🎬 Watch demo clicked');
        this.showNotification('🎬 Demo feature coming soon!', 'info');
    }
    
    togglePlayPause() {
        console.log('🎵 Toggle play/pause clicked');
        this.showNotification('🎵 Audio controls coming soon!', 'info');
    }
    
    previousWord() {
        console.log('⏮️ Previous word clicked');
        this.showNotification('⏮️ Previous word feature coming soon!', 'info');
    }
    
    nextWord() {
        console.log('⏭️ Next word clicked');
        this.showNotification('⏭️ Next word feature coming soon!', 'info');
    }
    
    repeatWord() {
        console.log('🔄 Repeat word clicked');
        this.showNotification('🔄 Repeat word feature coming soon!', 'info');
    }
    
    handleLogin() {
        console.log('🔑 Handle login clicked');
        this.showNotification('🔑 Login functionality coming soon!', 'info');
    }
    
    handleSignup() {
        console.log('✨ Handle signup clicked');
        this.showNotification('✨ Signup functionality coming soon!', 'info');
    }
    
    logout() {
        console.log('🚪 Logout clicked');
        this.showNotification('🚪 Logout functionality coming soon!', 'info');
    }
    
    syncNavigationState() {
        console.log('🧭 ===== SYNCING NAVIGATION STATE =====');
        
        try {
            // Update navigation button states based on current page
            const navButtons = ['navHome', 'navStories', 'navProgress', 'navProfile'];
            navButtons.forEach(navId => {
                const button = document.getElementById(navId);
                if (button) {
                    if (navId === 'nav' + this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1)) {
                        button.classList.add('bg-accent-blue', 'text-white');
                    } else {
                        button.classList.remove('bg-accent-blue', 'text-white');
                    }
                }
            });
            
            console.log('✅ Navigation state synced');
            
        } catch (error) {
            console.error('❌ Error syncing navigation state:', error);
        }
    }

    // ---------- Profiles ----------
    async loadActiveProfile() {
        try {
            console.log('👤 Loading active profile...');
            // For now, just set to null
            this.activeProfile = null;
            console.log('👤 Active profile set to null');
        } catch (error) {
            console.error('❌ Error loading active profile:', error);
            this.activeProfile = null;
        }
    }

    /**
     * ========================================
     * USER MANAGEMENT SYSTEM
     * ========================================
     * Handles user profiles, authentication, and progress tracking
     * Manages login, signup, and user data persistence
     */
    
    /**
     * Open authentication modal (login or signup)
     * @param {string} mode - 'login' or 'signup'
     */
    openAuthModal(mode = 'login') {
        console.log('🔐 ===== OPENING AUTH MODAL =====');
        console.log('🔐 Mode:', mode);
        
        try {
            const authModal = document.getElementById('authModal');
            if (!authModal) {
                console.error('❌ Auth modal not found');
                return;
            }
            
            // Show the modal
            authModal.classList.remove('hidden');
            authModal.classList.add('modal-enter');
            
            // Set the correct tab
            if (mode === 'login') {
                this.showLoginTab();
            } else {
                this.showSignupTab();
            }
            
            console.log('✅ Auth modal opened successfully');
            
        } catch (error) {
            console.error('❌ Error opening auth modal:', error);
        }
    }
    
    /**
     * Close authentication modal
     */
    closeAuthModal() {
        console.log('🔐 ===== CLOSING AUTH MODAL =====');
        
        try {
            const authModal = document.getElementById('authModal');
            if (authModal) {
                authModal.classList.add('hidden');
                authModal.classList.remove('modal-enter');
                this.resetAuthForm();
                console.log('✅ Auth modal closed successfully');
            }
        } catch (error) {
            console.error('❌ Error closing auth modal:', error);
        }
    }
    
    /**
     * Show login tab in auth modal
     */
    showLoginTab() {
        console.log('🔐 ===== SHOWING LOGIN TAB =====');
        
        try {
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            const loginSection = document.getElementById('loginSection');
            const signupSection = document.getElementById('signupSection');
            
            if (loginTab && signupTab && loginSection && signupSection) {
                // Update tab styling
                loginTab.classList.add('border-accent-blue', 'text-accent-blue');
                signupTab.classList.remove('border-accent-blue', 'text-accent-blue');
                
                // Show login section, hide signup section
                loginSection.classList.remove('hidden');
                signupSection.classList.add('hidden');
                
                console.log('✅ Login tab shown successfully');
            } else {
                console.error('❌ Login tab elements not found');
            }
        } catch (error) {
            console.error('❌ Error showing login tab:', error);
        }
    }
    
    /**
     * Show signup tab in auth modal
     */
    showSignupTab() {
        console.log('🔐 ===== SHOWING SIGNUP TAB =====');
        
        try {
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            const loginSection = document.getElementById('loginSection');
            const signupSection = document.getElementById('signupSection');
            
            if (loginTab && signupTab && loginSection && signupSection) {
                // Update tab styling
                signupTab.classList.add('border-accent-blue', 'text-accent-blue');
                loginTab.classList.remove('border-accent-blue', 'text-accent-blue');
                
                // Show signup section, hide login section
                signupSection.classList.remove('hidden');
                loginSection.classList.add('hidden');
                
                console.log('✅ Signup tab shown successfully');
            } else {
                console.error('❌ Signup tab elements not found');
            }
        } catch (error) {
            console.error('❌ Error showing signup tab:', error);
        }
    }
    
    /**
     * Handle login form submission
     * @param {Event} event - Form submission event
     */
    async handleLogin(event) {
        event.preventDefault();
        console.log('🔐 ===== HANDLING LOGIN =====');
        
        try {
            // Get form values using existing HTML IDs
            const username = document.getElementById('loginUsername').value.trim();
            const pin = document.getElementById('loginPin').value.trim();
            
            console.log('🔐 Login attempt:', { username, pin });
            
            // Validation
            if (!username || !pin) {
                this.showNotification('Please fill in all fields', 'warning');
                return;
            }
            
            if (pin.length !== 4) {
                this.showNotification('PIN must be 4 digits', 'warning');
                return;
            }
            
            if (!/^\d{4}$/.test(pin)) {
                this.showNotification('PIN must contain only numbers', 'warning');
                return;
            }
            
            // Load saved profile
            const savedProfile = localStorage.getItem('storyland-profile');
            if (!savedProfile) {
                this.showNotification('No profile found. Please create an account first.', 'warning');
                return;
            }
            
            const profile = JSON.parse(savedProfile);
            console.log('🔐 Found profile:', profile);
            
            // Verify credentials (case-insensitive username comparison)
            if (profile.name.toLowerCase() === username.toLowerCase() && profile.pin === pin) {
                // Login successful
                this.activeProfile = profile;
                
                // Initialize progress for this user if not exists
                if (!this.progress[profile.id]) {
                    this.progress[profile.id] = {};
                }
                
                // Save progress
                this.saveProgress();
                
                // Close modal and show success message
                this.closeAuthModal();
                this.showNotification(`🎉 Welcome back, ${profile.name}!`, 'success');
                
                // Update UI to show user badge and dashboard
                this.setUserBadge();
                this.refreshDashboardBar();
                this.updateProgressDisplay();
                
                console.log('✅ Login successful for profile:', profile.name);
            } else {
                // Login failed
                this.showNotification('Invalid username or PIN. Please try again.', 'error');
                console.log('❌ Login failed: Invalid credentials');
            }
            
        } catch (error) {
            console.error('❌ Error during login:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }
    
    /**
     * Handle signup form submission
     * @param {Event} event - Form submission event
     */
    async handleSignup(event) {
        event.preventDefault();
        console.log('🔐 ===== HANDLING SIGNUP =====');
        
        try {
            // Get form values using existing HTML IDs
            const name = document.getElementById('signupName').value.trim();
            const age = document.getElementById('signupAge').value;
            const pin = document.getElementById('signupPin').value.trim();
            const confirmPin = document.getElementById('confirmPin').value.trim(); // Fixed ID
            
            console.log('🔐 Form values:', { name, age, pin, confirmPin });
            
            // Validation
            if (!name || !age || !pin || !confirmPin) {
                this.showNotification('Please fill in all fields', 'warning');
                return;
            }
            
            if (name.length < 2) {
                this.showNotification('Name must be at least 2 characters long', 'warning');
                return;
            }
            
            if (pin !== confirmPin) {
                this.showNotification('PINs do not match', 'warning');
                return;
            }
            
            if (pin.length !== 4) {
                this.showNotification('PIN must be 4 digits', 'warning');
                return;
            }
            
            if (!/^\d{4}$/.test(pin)) {
                this.showNotification('PIN must contain only numbers', 'warning');
                return;
            }
            
            // Create new profile
            const newProfile = {
                id: Date.now(),
                name: name,
                age: parseInt(age),
                pin: pin,
                createdAt: new Date().toISOString()
            };
            
            console.log('🔐 Creating profile:', newProfile);
            
            // Save profile to storage
            this.saveProfile(newProfile);
            
            // Close modal and show success message
            this.closeAuthModal();
            this.showNotification(`🎉 Profile created successfully! Welcome to StoryLand, ${name}!`, 'success', 4000);
            
            // Reset active profile (user needs to login)
            this.activeProfile = null;
            
            // Update UI to show login/signup buttons
            this.setUserBadge();
            this.refreshDashboardBar();
            this.updateProgressDisplay();
            
            console.log('✅ Signup successful, profile created:', newProfile.name);
            
        } catch (error) {
            console.error('❌ Error during signup:', error);
            this.showNotification('Signup failed. Please try again.', 'error');
        }
    }
    
    /**
     * Logout current user
     */
    logout() {
        console.log('🔐 ===== LOGGING OUT =====');
        
        try {
            this.activeProfile = null;
            this.setUserBadge();
            this.refreshDashboardBar();
            this.updateProgressDisplay();
            
            this.showNotification('Logged out successfully', 'info');
            console.log('✅ Logout successful');
            
        } catch (error) {
            console.error('❌ Error during logout:', error);
        }
    }
    
    /**
     * Save user profile to storage
     * @param {Object} profile - User profile object
     */
    saveProfile(profile) {
        try {
            localStorage.setItem('storyland-profile', JSON.stringify(profile));
            console.log('💾 Profile saved:', profile.name);
        } catch (error) {
            console.error('❌ Error saving profile:', error);
        }
    }
    
    /**
     * Load active user profile
     */
    loadActiveProfile() {
        try {
            const savedProfile = localStorage.getItem('storyland-profile');
            if (savedProfile) {
                this.activeProfile = JSON.parse(savedProfile);
                console.log('👤 Active profile loaded:', this.activeProfile.name);
            } else {
                console.log('👤 No saved profile found');
            }
        } catch (error) {
            console.error('❌ Error loading profile:', error);
        }
    }
    
    /**
     * Set user badge visibility and content
     */
    setUserBadge() {
        const userBadge = document.getElementById('userBadge');
        const navLoginBtn = document.getElementById('navLoginBtn');
        const navSignupBtn = document.getElementById('navSignupBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (this.activeProfile) {
            // User is logged in - show badge and logout, hide login/signup
            if (userBadge) {
                userBadge.classList.remove('hidden');
                userBadge.innerHTML = `👤 ${this.activeProfile.name} ⭐ ${this.getTotalStars()}`;
            }
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            if (navLoginBtn) navLoginBtn.classList.add('hidden');
            if (navSignupBtn) navSignupBtn.classList.add('hidden');
        } else {
            // User is not logged in - hide badge and logout, show login/signup
            if (userBadge) userBadge.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
            if (navLoginBtn) navLoginBtn.classList.remove('hidden');
            if (navSignupBtn) navSignupBtn.classList.remove('hidden');
        }
    }
    
    /**
     * Get total stars from user progress
     * @returns {number} Total stars earned
     */
    getTotalStars() {
        if (!this.progress || !this.activeProfile) return 0;
        
        const profileProgress = this.progress[this.activeProfile.id] || {};
        return Object.values(profileProgress).reduce((total, storyProgress) => {
            return total + (storyProgress.completed ? 1 : 0);
        }, 0);
    }

    // ---------- Event listeners ----------
    setupEventListeners() {
        try {
            console.log('🔧 ===== SETTING UP EVENT LISTENERS =====');
            
            // Helper function to add event listeners safely
            const addListener = (selector, event, handler) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.addEventListener(event, handler.bind(this));
                    console.log(`🔧 Added ${event} listener to ${selector}`);
                } else {
                    console.warn(`⚠️ Element not found: ${selector}`);
                }
            };
            
            // ===== NAVIGATION BUTTONS =====
            console.log('🔧 Setting up navigation buttons...');
            
            // Home navigation - using existing HTML IDs
            addListener('#navHome', 'click', () => this.showPage('home')); // Fixed ID
            addListener('#navStories', 'click', () => this.showPage('stories')); // Fixed ID
            addListener('#navProgress', 'click', () => this.showProgressModal()); // Fixed ID
            addListener('#navProfile', 'click', () => this.showProfilePage()); // Fixed ID
            
            // ===== AUTHENTICATION BUTTONS =====
            console.log('🔧 Setting up authentication buttons...');
            
            // Navigation bar auth buttons
            addListener('#navLoginBtn', 'click', () => this.openAuthModal('login'));
            addListener('#navSignupBtn', 'click', () => this.openAuthModal('signup'));
            
            // Auth modal tabs
            addListener('#loginTab', 'click', () => this.showLoginTab());
            addListener('#signupTab', 'click', () => this.showSignupTab());
            
            // Auth form submissions
            addListener('#loginForm', 'submit', (e) => this.handleLogin(e));
            addListener('#signupForm', 'submit', (e) => this.handleSignup(e));
            
            // ===== LANGUAGE TOGGLE =====
            console.log('🔧 Setting up language toggle...');
            addListener('#languageToggle', 'click', () => this.toggleLanguage());
            
            // ===== STORY INTERACTIONS =====
            console.log('🔧 Setting up story interactions...');
            
            // Story selection - using existing HTML IDs
            addListener('#getStories', 'click', () => this.showPage('stories')); // Fixed ID
            addListener('#watchDemo', 'click', () => this.watchDemo()); // Fixed ID
            
            // Stories navigation
            addListener('#navStories', 'click', () => this.showPage('stories')); // Fixed ID
            
            // Audio controls - using existing HTML IDs
            addListener('#playPause', 'click', () => this.togglePlayPause()); // Fixed ID
            addListener('#previous', 'click', () => this.previousWord()); // Fixed ID
            addListener('#next', 'click', () => this.nextWord()); // Fixed ID
            addListener('#repeat', 'click', () => this.repeatWord()); // Fixed ID
            
            // Story navigation - using existing HTML IDs
            addListener('#backToStories', 'click', () => this.showPage('stories')); // Fixed ID
            
            // ===== MODAL CONTROLS =====
            console.log('🔧 Setting up modal controls...');
            
            // Close buttons
            addListener('.close-modal', 'click', () => this.closeAuthModal());
            addListener('#closeProgressModal', 'click', () => this.hideProgressModal());
            addListener('#closeAuth', 'click', () => this.closeAuthModal()); // Add this line for existing close button
            
            // Modal backdrop clicks
            addListener('#authModal', 'click', (e) => {
                if (e.target.id === 'authModal') this.closeAuthModal();
            });
            
            // ===== USER MANAGEMENT =====
            console.log('🔧 Setting up user management...');
            
            // Logout
            addListener('#logoutBtn', 'click', () => this.logout());
            
            // Profile switching
            addListener('#switchProfileBtn', 'click', () => this.switchProfile());
            
            // ===== DEBUG BUTTONS =====
            console.log('🔧 Setting up debug buttons...');
            
            // Debug button for testing
            addListener('#debugBtn', 'click', () => this.runDebugTests());
            
            // Test modal button
            addListener('#testModalBtn', 'click', () => this.testModal());
            
            console.log('✅ ===== EVENT LISTENERS SETUP COMPLETED =====');
            
        } catch (error) {
            console.error('❌ Error setting up event listeners:', error);
            this.showErrorToUser('Failed to set up event listeners: ' + error.message);
        }
    }

    verifyRequiredElements() {
        console.log('=== VERIFYING REQUIRED ELEMENTS ===');
        const requiredElements = [
            'createProfileBtn',
            'newUsername', 
            'newPin',
            'authModal',
            'profilesList',
            'loginSection',
            'pinInput',
            'loginBtn'
        ];
        
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                console.log(`✅ ${id}: Found`);
            } else {
                console.error(`❌ ${id}: NOT FOUND`);
            }
        });
        console.log('=== END VERIFICATION ===');
    }

    // ---------- Story Management ----------
    async loadStories() {
        console.log('📚 Loading stories...');
        
        // Initialize sample stories if not already loaded
        if (this.stories.length === 0) {
            this.stories = [
                {
                    id: 1,
                    title: "Bunny's Big Day",
                    description: "A little bunny learns about courage and friendship",
                    language: 'en',
                    vocabulary: [
                        { word: 'brave', definition: 'Having courage and strength' },
                        { word: 'friend', definition: 'Someone you like and trust' },
                        { word: 'help', definition: 'To assist or support someone' }
                    ],
                    illustration: '🐰',
                    audioUrl: 'stories/bunny.mp3',
                    content: "Once upon a time, there was a little bunny named Fluffy. Fluffy was very shy and afraid of everything. One day, Fluffy saw a little mouse who was stuck in a puddle. The mouse was crying and needed help. Fluffy was scared, but she remembered what her mother always said: 'Being brave means doing the right thing even when you're afraid.' So Fluffy took a deep breath and helped the mouse out of the puddle. The mouse was so happy and thanked Fluffy. From that day on, Fluffy and the mouse became the best of friends. Fluffy learned that being brave makes you feel good and helps others too!"
                },
                {
                    id: 2,
                    title: "Bear's Honey Hunt",
                    description: "A hungry bear discovers the value of sharing",
                    language: 'en',
                    vocabulary: [
                        { word: 'hungry', definition: 'Wanting to eat food' },
                        { word: 'share', definition: 'To give part of what you have to others' },
                        { word: 'kind', definition: 'Being nice and helpful to others' }
                    ],
                    illustration: '🐻',
                    audioUrl: 'stories/bear.mp3',
                    content: "There was a big brown bear named Bruno who loved honey more than anything. One morning, Bruno was very hungry and went looking for honey. He found a huge beehive full of delicious honey! Bruno was so excited that he wanted to eat it all by himself. But then he saw a little bird sitting nearby, looking sad and hungry. Bruno remembered how his mother taught him to be kind and share. So Bruno decided to share his honey with the little bird. The bird was so happy and thanked Bruno. Bruno discovered that sharing his honey made him feel even happier than eating it all alone!"
                },
                {
                    id: 3,
                    title: "Fox's Clever Trick",
                    description: "A clever fox learns that honesty is the best policy",
                    language: 'en',
                    vocabulary: [
                        { word: 'clever', definition: 'Smart and quick to learn' },
                        { word: 'honest', definition: 'Telling the truth and not lying' },
                        { word: 'truth', definition: 'What really happened or what is real' }
                    ],
                    illustration: '🦊',
                    audioUrl: 'stories/fox.mp3',
                    content: "Red the fox was known as the cleverest animal in the forest. He could solve any problem and always had a trick up his sleeve. One day, Red found a basket of apples that belonged to Farmer Brown. Red was very hungry and wanted to take the apples. But then he remembered what his grandfather always said: 'Being clever is good, but being honest is better.' Red decided to be honest and not take the apples. Instead, he helped Farmer Brown by warning him about a storm coming. Farmer Brown was so grateful that he gave Red some apples as a thank you gift. Red learned that being honest and helpful brings better rewards than being tricky!"
                }
            ];
        }
        
        // Get stories for current language
        const storiesToDisplay = this.getStoriesForLanguage();
        
        const container = document.getElementById('storiesContainer');
        if (!container) {
            console.error('❌ Stories container not found');
            return;
        }
        
        container.innerHTML = '';
        
        storiesToDisplay.forEach((story, index) => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card bg-card-bg border-2 border-sage-green rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer';
            storyCard.style.animationDelay = `${index * 0.1}s`;
            
            storyCard.innerHTML = `
                <div class="text-center mb-4">
                    <div class="text-6xl mb-3">${story.illustration || '📚'}</div>
                    <h3 class="text-xl font-bold text-text-dark mb-2">${story.title}</h3>
                    <p class="text-text-dark text-sm mb-3">${story.description || 'A wonderful story for children'}</p>
                    <div class="flex justify-center items-center space-x-2">
                        <span class="text-forest-green">⭐</span>
                        <span class="text-text-dark">${this.progress[story.id]?.stars || 0}</span>
                    </div>
                </div>
            `;
            
            storyCard.addEventListener('click', () => {
                this.currentStoryIndex = index;
                this.loadStoryContent(story);
                this.showPage('storyReader');
            });
            
            container.appendChild(storyCard);
        });
        
        console.log(`📚 Loaded ${storiesToDisplay.length} stories in ${this.currentLanguage} language`);
    }

    renderStoriesGrid() {
        const grid = document.getElementById('storiesGrid');
        if (!grid) return;

        grid.innerHTML = '';
        this.stories.forEach((story, index) => {
            const card = document.createElement('div');
            card.className = 'story-card bg-gradient-to-br from-yellow-200 to-orange-200 border-4 border-yellow-300 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all cursor-pointer';
            
            const stars = this.progress.storyStars[story.id] || 0;
            const isCompleted = this.progress.completedStories.includes(story.id);
            
            card.innerHTML = `
                <div class="text-center">
                    <div class="text-6xl mb-4">${story.illustration}</div>
                    <h4 class="text-xl font-bold text-gray-800 mb-2">${story.title}</h4>
                    <p class="text-gray-600 mb-3">${story.description}</p>
                    <div class="text-yellow-600 font-bold mb-3">${'⭐'.repeat(stars)}</div>
                    ${isCompleted ? '<div class="text-green-600 font-bold">✅ Completed!</div>' : ''}
                </div>
            `;
            
            card.addEventListener('click', () => this.openStory(index));
            grid.appendChild(card);
        });
    }

    openStory(index) {
        this.currentStoryIndex = index;
        this.currentStory = this.stories[index];
        this.showPage('storyReader');
        this.loadStoryContent();
    }

    // Load story content for reading
    loadStoryContent(story) {
        console.log('🎵 ===== LOADING STORY CONTENT =====');
        console.log('🎵 Story:', story.title);
        
        try {
            // Get the correct story based on current language
            const storiesToUse = this.getStoriesForLanguage();
            const currentStory = storiesToUse.find(s => s.id === story.id) || story;
            
            // Update story display using existing HTML IDs
            const storyTitle = document.querySelector('#readerPage [data-lang="story-title"]') || 
                              document.getElementById('storyTitle');
            const storyText = document.getElementById('storyText');
            const storyIllustration = document.getElementById('storyIllustration');
            const vocabularyWords = document.getElementById('vocabularyWords');
            
            if (storyTitle) storyTitle.textContent = currentStory.title;
            if (storyText) storyText.textContent = currentStory.content;
            if (storyIllustration) storyIllustration.textContent = currentStory.illustration;
            
            // Set direction for Arabic
            if (this.currentLanguage === 'ar') {
                if (storyText) storyText.style.direction = 'rtl';
                if (storyTitle) storyTitle.style.direction = 'rtl';
            } else {
                if (storyText) storyText.style.direction = 'ltr';
                if (storyTitle) storyTitle.style.direction = 'ltr';
            }
            
            // Update vocabulary section
            if (vocabularyWords && currentStory.vocabulary) {
                vocabularyWords.innerHTML = currentStory.vocabulary.map(vocab => 
                    `<div class="vocab-item p-3 bg-blue-50 rounded-lg mb-2">
                        <strong class="text-blue-800">${vocab.word}:</strong> 
                        <span class="text-gray-700">${vocab.definition}</span>
                    </div>`
                ).join('');
            }
            
            // Initialize audio system
            this.initializeAudio(currentStory);
            
            // Show the story reader page
            this.showPage('reader');
            
            console.log('✅ Story content loaded successfully');
            
        } catch (error) {
            console.error('❌ Error loading story content:', error);
            this.showNotification('Failed to load story content', 'error');
        }
    }
    
    /**
     * Initialize audio system for story narration
     * @param {Object} story - The story object with audio data
     */
    initializeAudio(story) {
        console.log('🎵 ===== INITIALIZING AUDIO SYSTEM =====');
        
        try {
            // Store current story data
            this.currentStory = story;
            this.currentWordIndex = 0;
            this.isPlaying = false;
            
            // Create audio element if it doesn't exist
            if (!this.audio) {
                this.audio = new Audio();
                this.setupAudioEventListeners();
            }
            
            // Set audio source
            if (story.audioUrl) {
                this.audio.src = story.audioUrl;
                console.log('🎵 Audio source set:', story.audioUrl.substring(0, 50) + '...');
            } else {
                console.warn('⚠️ No audio URL provided for story');
            }
            
            // Update audio controls
            this.updateAudioControls();
            
            console.log('✅ Audio system initialized');
            
        } catch (error) {
            console.error('❌ Error initializing audio:', error);
        }
    }
    
    /**
     * Set up audio event listeners for synchronization
     */
    setupAudioEventListeners() {
        if (!this.audio) return;
        
        // Time update event for word highlighting
        this.audio.addEventListener('timeupdate', () => {
            this.updateWordHighlighting();
        });
        
        // Audio ended event
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updateAudioControls();
            this.clearWordHighlighting();
        });
        
        console.log('🎵 Audio event listeners set up');
    }
    
    /**
     * Update word highlighting based on current audio time
     */
    updateWordHighlighting() {
        if (!this.currentStory || !this.currentStory.timestamps) return;
        
        const currentTime = this.audio.currentTime;
        const timestamps = this.currentStory.timestamps;
        
        // Find current word based on timestamp
        let currentWordIndex = -1;
        for (let i = 0; i < timestamps.length; i++) {
            if (currentTime >= timestamps[i].start && currentTime <= timestamps[i].end) {
                currentWordIndex = i;
                break;
            }
        }
        
        // Update highlighting if word changed
        if (currentWordIndex !== this.currentWordIndex) {
            this.clearWordHighlighting();
            this.highlightCurrentWord(currentWordIndex);
            this.currentWordIndex = currentWordIndex;
        }
    }
    
    /**
     * Highlight the current word being narrated
     * @param {number} wordIndex - Index of the word to highlight
     */
    highlightCurrentWord(wordIndex) {
        if (wordIndex < 0 || !this.currentStory || !this.currentStory.timestamps) return;
        
        const storyText = document.getElementById('storyText');
        if (!storyText) return;
        
        const currentWord = this.currentStory.timestamps[wordIndex].word;
        const text = storyText.textContent;
        
        // Find and highlight the word in the text
        const regex = new RegExp(`\\b${currentWord}\\b`, 'gi');
        const highlightedText = text.replace(regex, `<span class="bg-yellow-300 px-1 rounded animate-pulse">${currentWord}</span>`);
        
        storyText.innerHTML = highlightedText;
        console.log('✨ Highlighted word:', currentWord);
    }
    
    /**
     * Clear all word highlighting
     */
    clearWordHighlighting() {
        const storyText = document.getElementById('storyText');
        if (!storyText) return;
        
        // Remove highlighting spans and restore original text
        const highlightedSpans = storyText.querySelectorAll('.bg-yellow-300');
        highlightedSpans.forEach(span => {
            span.outerHTML = span.textContent;
        });
    }
    
    /**
     * Update audio control buttons
     */
    updateAudioControls() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.innerHTML = this.isPlaying ? '⏸️ Pause' : '▶️ Play';
            playPauseBtn.className = this.isPlaying ? 
                'px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors' :
                'px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors';
        }
    }

    highlightVocabulary(text, vocabulary) {
        let highlightedText = text;
        vocabulary.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, `<span class="word-highlight">${word}</span>`);
        });
        return highlightedText;
    }

    loadVocabulary() {
        const list = document.getElementById('vocabularyList');
        if (!list || !this.currentStory) return;

        list.innerHTML = '';
        this.currentStory.vocabulary.forEach(word => {
            const card = document.createElement('div');
            card.className = 'vocabulary-card';
            card.innerHTML = `
                <div class="text-2xl mb-2">📚</div>
                <div class="font-bold text-gray-800">${word}</div>
            `;
            list.appendChild(card);
        });
    }

    // ---------- Audio Controls ----------
    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseAudio();
        } else {
            this.playAudio();
        }
    }

    playAudio() {
        // Demo audio functionality
        this.isPlaying = true;
        const btn = document.getElementById('playPause');
        if (btn) btn.innerHTML = '⏸️';
        
        // Simulate audio progress
        this.simulateAudioProgress();
    }

    pauseAudio() {
        this.isPlaying = false;
        const btn = document.getElementById('playPause');
        if (btn) btn.innerHTML = '▶️';
    }

    simulateAudioProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(interval);
                return;
            }
            
            progress += 1;
            const progressBar = document.getElementById('audioProgress');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                this.pauseAudio();
                this.completeStory();
            }
        }, 100);
    }

    previousWord() {
        // Demo functionality
        this.showNotification('Previous word');
    }

    nextWord() {
        // Demo functionality
        this.showNotification('Next word');
    }

    repeatWord() {
        // Demo functionality
        this.showNotification('Repeating word');
    }

    completeStory() {
        if (this.currentStory) {
            this.currentStory.completed = true;
            this.progress[this.currentStory.id] = {
                completed: true,
                stars: 3,
                completedAt: new Date().toISOString()
            };
            this.saveProgress();
            this.updateProgressDisplay();
            
            // Animate the completion
            this.showCompletionAnimation();
            
            // Show success message
            this.showNotification('🎉 Story completed! You earned 3 stars!', 'success');
        }
    }

    showCompletionAnimation() {
        // Create celebration animation
        const celebration = document.createElement('div');
        celebration.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
        celebration.innerHTML = `
            <div class="text-6xl animate-bounce">🎉</div>
        `;
        document.body.appendChild(celebration);
        
        // Remove after animation
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }

    updateProgressDisplay() {
        const totalStars = Object.values(this.progress).reduce((sum, story) => sum + (story.stars || 0), 0);
        const completedStories = Object.values(this.progress).filter(story => story.completed).length;
        
        // Animate star count update
        const starDisplay = document.getElementById('totalStars');
        if (starDisplay) {
            starDisplay.classList.add('star-animation');
            starDisplay.textContent = totalStars;
            setTimeout(() => {
                starDisplay.classList.remove('star-animation');
            }, 600);
        }
        
        // Animate completed stories count
        const completedDisplay = document.getElementById('completedStories');
        if (completedDisplay) {
            completedDisplay.textContent = completedStories;
            completedDisplay.classList.add('star-animation');
            setTimeout(() => {
                completedDisplay.classList.remove('star-animation');
            }, 600);
        }
        
        // Update dashboard bar with smooth animation
        this.refreshDashboardBar();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('storyland-progress');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('❌ Error loading progress:', error);
            return {};
        }
    }

    saveProgress() {
        if (!this.activeProfile) return;
        
        const profileId = this.activeProfile.id;
        localStorage.setItem(`tprsProgress_${profileId}`, JSON.stringify(this.progress));
    }

    // ---------- Utility Functions ----------
    getTotalStars() {
        return Object.values(this.progress).reduce((sum, story) => sum + (story.stars || 0), 0);
    }

    setUserBadge() {
        const userBadge = document.getElementById('userBadge');
        const userName = document.getElementById('userName');
        const userStars = document.getElementById('userStars');
        const navLoginBtn = document.getElementById('navLoginBtn');
        const navSignupBtn = document.getElementById('navSignupBtn');
        
        if (this.activeProfile && this.activeProfile.name) {
            // User is logged in - show badge, hide login/signup buttons
            if (userName) userName.textContent = `👤 ${this.activeProfile.name}`;
            if (userStars) userStars.textContent = `⭐ ${this.getTotalStars()}`;
            if (userBadge) userBadge.classList.remove('hidden');
            if (navLoginBtn) navLoginBtn.classList.add('hidden');
            if (navSignupBtn) navSignupBtn.classList.add('hidden');
            
            console.log('✅ User badge shown, login/signup buttons hidden');
        } else {
            // No user logged in - hide badge, show login/signup buttons
            if (userBadge) userBadge.classList.add('hidden');
            if (navLoginBtn) navLoginBtn.classList.remove('hidden');
            if (navSignupBtn) navSignupBtn.classList.remove('hidden');
            
            console.log('✅ User badge hidden, login/signup buttons shown');
        }
    }

    refreshDashboardBar() {
        const dashboardBar = document.getElementById('dashboardBar');
        if (!dashboardBar) return;
        
        if (this.activeProfile && this.activeProfile.name) {
            // User is logged in - show dashboard bar
            dashboardBar.classList.remove('hidden');
            
            // Update content
            const totalStars = this.getTotalStars();
            const completedStories = Object.values(this.progress).filter(story => story.completed).length;
            
            const totalStarsElement = document.getElementById('totalStars');
            const completedStoriesElement = document.getElementById('completedStories');
            
            if (totalStarsElement) totalStarsElement.textContent = totalStars;
            if (completedStoriesElement) completedStoriesElement.textContent = completedStories;
        } else {
            // No user logged in - hide dashboard bar
            dashboardBar.classList.add('hidden');
        }
    }

    // Toggle language between English and Arabic
    async toggleLanguage() {
        try {
            console.log('🌍 ===== LANGUAGE TOGGLE STARTED =====');
            console.log('🌍 Current language:', this.currentLanguage);
            
            // Show loading notification
            this.showNotification('🔄 Switching language...', 'info', 2000);
            
            // Toggle language
            this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
            console.log('🌍 New language:', this.currentLanguage);
            
            // Update button appearance
            this.updateLanguageButton();
            
            // Set document direction and language
            if (this.currentLanguage === 'ar') {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
                console.log('🌍 Set RTL direction for Arabic');
            } else {
                document.documentElement.dir = 'ltr';
                document.documentElement.lang = 'en';
                console.log('🌍 Set LTR direction for English');
            }
            
            // Apply translations based on language
            if (this.currentLanguage === 'ar') {
                console.log('🌍 Applying Arabic translations...');
                await this.translatePageContent();
                await this.translateAllStories();
                this.preTranslateStories();
                
                // Reload stories if on stories page
                if (this.currentPage === 'stories') {
                    this.loadStories();
                }
                
                this.showNotification('✅ تم التبديل إلى العربية', 'success', 3000);
            } else {
                console.log('🌍 Restoring English content...');
                this.restoreEnglishContent();
                
                // Reload stories if on stories page
                if (this.currentPage === 'stories') {
                    this.loadStories();
                }
                
                this.showNotification('✅ Switched to English', 'success', 3000);
            }
            
            // Save language preference
            localStorage.setItem('storyland-language', this.currentLanguage);
            console.log('🌍 Language preference saved');
            
            console.log('✅ ===== LANGUAGE TOGGLE COMPLETED =====');
            
        } catch (error) {
            console.error('❌ Error during language toggle:', error);
            this.showNotification('Failed to switch language', 'error');
        }
    }
    
    /**
     * Translate page content to Arabic
     * Updates all elements with data-lang attributes
     */
    async translatePageContent() {
        console.log('🌍 ===== TRANSLATING PAGE CONTENT =====');
        
        try {
            const elements = document.querySelectorAll('[data-lang]');
            console.log(`🌍 Found ${elements.length} translatable elements`);
            
            let translatedCount = 0;
            
            for (const element of elements) {
                const langKey = element.getAttribute('data-lang');
                if (!langKey) continue;
                
                try {
                    // Get translation from UI translations first
                    let translation = this.uiTranslations.ar[langKey];
                    
                    if (!translation) {
                        // Try to translate using API if not in UI translations
                        translation = await this.translateText(langKey, 'ar');
                    }
                    
                    if (translation && translation !== langKey) {
                        // Update element content
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder = translation;
                        } else {
                            element.textContent = translation;
                        }
                        
                        // Set RTL direction for Arabic
                        element.style.direction = 'rtl';
                        
                        translatedCount++;
                        console.log(`🌍 Translated: ${langKey} → ${translation}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Failed to translate ${langKey}:`, error.message);
                }
            }
            
            console.log(`✅ Page content translation completed: ${translatedCount}/${elements.length} elements translated`);
            
        } catch (error) {
            console.error('❌ Error translating page content:', error);
        }
    }
    
    /**
     * Translate all stories to Arabic
     * Creates Arabic versions of all English stories
     */
    async translateAllStories() {
        console.log('🌍 ===== TRANSLATING ALL STORIES =====');
        
        try {
            if (this.arabicStories.length > 0) {
                console.log('🌍 Arabic stories already exist, skipping translation');
                return;
            }
            
            console.log(`🌍 Translating ${this.stories.length} stories to Arabic...`);
            
            const translationPromises = this.stories.map(story => this.translateStory(story));
            this.arabicStories = await Promise.all(translationPromises);
            
            // Save translated stories for offline use
            this.saveTranslatedStories();
            
            console.log(`✅ All stories translated to Arabic: ${this.arabicStories.length} stories`);
            
        } catch (error) {
            console.error('❌ Error translating stories:', error);
        }
    }
    
    /**
     * Translate a single story to Arabic
     * @param {Object} story - The English story to translate
     * @returns {Object} The translated Arabic story
     */
    async translateStory(story) {
        try {
            console.log(`🌍 Translating story: ${story.title}`);
            
            const translatedStory = {
                id: story.id,
                title: await this.translateText(story.title, 'ar'),
                content: await this.translateText(story.content, 'ar'),
                description: await this.translateText(story.description, 'ar'),
                vocabulary: await Promise.all(story.vocabulary.map(async vocab => ({
                    word: await this.translateText(vocab.word, 'ar'),
                    definition: await this.translateText(vocab.definition, 'ar')
                }))),
                illustration: story.illustration,
                audioUrl: story.audioUrl,
                timestamps: story.timestamps
            };
            
            console.log(`✅ Story translated: ${story.title} → ${translatedStory.title}`);
            return translatedStory;
            
        } catch (error) {
            console.error(`❌ Error translating story ${story.title}:`, error);
            return story; // Return original story if translation fails
        }
    }
    
    /**
     * Pre-translate stories for better performance
     * Uses cached translations when available
     */
    preTranslateStories() {
        console.log('🌍 ===== PRE-TRANSLATING STORIES =====');
        
        try {
            // This function can be used to pre-load common translations
            // or to optimize translation performance
            console.log('✅ Story pre-translation completed');
            
        } catch (error) {
            console.error('❌ Error in pre-translation:', error);
        }
    }
    
    /**
     * Restore English content when switching back to English
     * Resets all elements to their original English text
     */
    restoreEnglishContent() {
        console.log('🌍 ===== RESTORING ENGLISH CONTENT =====');
        
        try {
            const elements = document.querySelectorAll('[data-lang]');
            console.log(`🌍 Restoring ${elements.length} elements to English`);
            
            let restoredCount = 0;
            
            for (const element of elements) {
                const langKey = element.getAttribute('data-lang');
                if (!langKey) continue;
                
                // Get English text from UI translations
                const englishText = this.uiTranslations.en[langKey];
                if (englishText) {
                    // Update element content
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = englishText;
                    } else {
                        element.textContent = englishText;
                    }
                    
                    // Reset direction to LTR
                    element.style.direction = 'ltr';
                    
                    restoredCount++;
                }
            }
            
            // Clear Arabic stories
            this.arabicStories = [];
            
            console.log(`✅ English content restored: ${restoredCount} elements updated`);
            
        } catch (error) {
            console.error('❌ Error restoring English content:', error);
        }
    }

    // ---------- Service Worker ----------
    setupServiceWorker() {
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.error('❌ Service Worker registration failed:', error);
                    });
            }
        } catch (error) {
            console.error('❌ Error setting up service worker:', error);
        }
    }

    // ---------- Background Image Management ----------
    setupBackgroundImage() {
        console.log('🖼️ ===== SETTING UP BACKGROUND IMAGE =====');
        console.log('🖼️ Background image setup completed');
    }

    // ---------- Database ----------
    openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('TPRSStories', 3);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('stories')) {
                    db.createObjectStore('stories', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('profiles')) {
                    db.createObjectStore('profiles', { keyPath: 'id' });
                }
            };
        });
    }

    // ---------- Smooth Scrolling & Animations ----------
    setupSmoothScrolling() {
        console.log('📜 ===== SETTING UP SMOOTH SCROLLING =====');
        console.log('📜 Smooth scrolling setup completed');
    }

    getStoryStars(storyId) {
        return this.progress[storyId]?.stars || 0;
    }

    // ---------- Progress Tracking ----------
    showProgressModal() {
        console.log('📊 Showing progress modal');
        try {
            const modal = document.getElementById('progressModal');
            if (modal) {
                modal.classList.remove('hidden');
                console.log('✅ Progress modal shown');
            } else {
                console.error('❌ Progress modal not found');
            }
        } catch (error) {
            console.error('❌ Error showing progress modal:', error);
        }
    }

    hideProgressModal() {
        console.log('📊 Hiding progress modal');
        try {
            const modal = document.getElementById('progressModal');
            if (modal) {
                modal.classList.add('hidden');
                console.log('✅ Progress modal hidden');
            }
        } catch (error) {
            console.error('❌ Error hiding progress modal:', error);
        }
    }

    renderProgressStats() {
        const stats = document.getElementById('progressStats');
        if (!stats) return;

        const totalStories = this.stories.length;
        const completedStories = Object.values(this.progress).filter(story => story.completed).length;
        const totalStars = Object.values(this.progress).reduce((sum, story) => sum + (story.stars || 0), 0);
        
        stats.innerHTML = `
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-sunny-yellow to-earth-orange rounded-xl border-2 border-sunny-yellow">
                <span class="text-lg text-text-dark font-bold">Stories Completed:</span>
                <span class="text-2xl font-bold text-warm-brown">${completedStories}/${totalStories}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-xl border-2 border-accent-purple">
                <span class="text-lg text-text-dark font-bold">Total Stars:</span>
                <span class="text-2xl font-bold text-sunny-yellow">${totalStars} ⭐</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-sage-green to-forest-green rounded-xl border-2 border-sage-green">
                <span class="text-lg text-text-dark font-bold">Progress:</span>
                <span class="text-2xl font-bold text-cloud-white">${Math.round((completedStories / totalStories) * 100)}%</span>
            </div>
        `;
    }

    // ---------- Automatic Translation System ----------
    
    // Translate text using API or cached translations
    async translateText(text, targetLang = 'ar') {
        if (!text || typeof text !== 'string') return text;
        
        const cacheKey = `${text}_${targetLang}`;
        
        // Check UI translations first (offline)
        if (this.uiTranslations[targetLang] && this.uiTranslations[targetLang][text]) {
            console.log(`🌍 Using UI translation for: ${text}`);
            return this.uiTranslations[targetLang][text];
        }
        
        // Check offline cache
        if (this.offlineTranslations.has(cacheKey)) {
            console.log(`🌍 Using offline translation for: ${text}`);
            return this.offlineTranslations.get(cacheKey);
        }
        
        // Check memory cache
        if (this.translationCache.has(cacheKey)) {
            console.log(`🌍 Using cached translation for: ${text}`);
            return this.translationCache.get(cacheKey);
        }
        
        try {
            // Try online translation
            const translation = await this.translateOnline(text, targetLang);
            if (translation) {
                // Cache the translation
                this.translationCache.set(cacheKey, translation);
                this.offlineTranslations.set(cacheKey, translation);
                this.saveOfflineTranslations();
                return translation;
            }
        } catch (error) {
            console.log('🌍 Online translation failed, using fallback:', error.message);
        }
        
        // Fallback: return original text if translation fails
        return text;
    }
    
    // Translate text using online API
    async translateOnline(text, targetLang) {
        try {
            const response = await fetch(`${this.translationAPI}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
            const data = await response.json();
            
            if (data.responseStatus === 200 && data.responseData.translatedText) {
                console.log(`🌍 Translated: "${text}" → "${data.responseData.translatedText}"`);
                return data.responseData.translatedText;
            }
        } catch (error) {
            console.error('🌍 Translation API error:', error);
        }
        return null;
    }
    
    // Translate all content on the page
    async translatePageContent() {
        console.log('🌍 ===== STARTING PAGE TRANSLATION =====');
        console.log('🌍 Starting page translation...');
        
        const elements = document.querySelectorAll('[data-lang]');
        console.log('🌍 Found elements with data-lang:', elements.length);
        
        if (elements.length === 0) {
            console.warn('⚠️ No elements with data-lang found! This might be the problem.');
            console.warn('⚠️ Available elements:', Array.from(document.querySelectorAll('*')).map(el => el.tagName + (el.id ? '#' + el.id : '')).slice(0, 20));
            return;
        }
        
        const translationPromises = [];
        
        elements.forEach((element, index) => {
            const langKey = element.getAttribute('data-lang');
            console.log(`🌍 Element ${index + 1}:`, {
                tagName: element.tagName,
                id: element.id,
                langKey: langKey,
                currentText: element.textContent.substring(0, 50),
                hasDataLang: !!langKey
            });
            
            if (langKey && this.currentLanguage === 'ar') {
                console.log(`🌍 Will translate element ${index + 1} with key: ${langKey}`);
                const promise = this.translateText(langKey, 'ar').then(translation => {
                    if (translation && translation !== langKey) {
                        console.log(`🌍 Translation result for ${langKey}:`, translation);
                        element.textContent = translation;
                        element.style.direction = 'rtl';
                        console.log(`🌍 Element ${index + 1} translated and RTL applied`);
                    } else {
                        console.log(`🌍 No translation needed for ${langKey}`);
                    }
                }).catch(error => {
                    console.error(`🌍 Error translating element ${index + 1}:`, error);
                });
                translationPromises.push(promise);
            } else {
                console.log(`🌍 Skipping element ${index + 1}: langKey=${langKey}, currentLanguage=${this.currentLanguage}`);
            }
        });
        
        // Wait for all translations to complete
        console.log('🌍 Waiting for all translations to complete...');
        await Promise.all(translationPromises);
        console.log(`🌍 Page translation completed for ${elements.length} elements`);
        console.log('🌍 ===== PAGE TRANSLATION COMPLETED =====');
    }
    
    // Translate story content
    async translateStory(story) {
        if (this.currentLanguage === 'en') return story;
        
        console.log('🌍 Translating story content...');
        
        const translatedStory = { ...story };
        
        // Translate story title
        if (story.title) {
            translatedStory.title = await this.translateText(story.title, 'ar');
        }
        
        // Translate story content
        if (story.content) {
            translatedStory.content = await this.translateText(story.content, 'ar');
        }
        
        // Translate vocabulary words
        if (story.vocabulary) {
            translatedStory.vocabulary = await Promise.all(
                story.vocabulary.map(async (word) => ({
                    ...word,
                    word: await this.translateText(word.word, 'ar'),
                    definition: await this.translateText(word.definition, 'ar')
                }))
            );
        }
        
        // Translate description
        if (story.description) {
            translatedStory.description = await this.translateText(story.description, 'ar');
        }
        
        return translatedStory;
    }
    
    // Translate all stories
    async translateAllStories() {
        if (this.currentLanguage === 'en') return;
        
        console.log('🌍 Translating all stories...');
        
        this.arabicStories = await Promise.all(
            this.stories.map(story => this.translateStory(story))
        );
        
        console.log(`🌍 Translated ${this.arabicStories.length} stories`);
    }
    
    // Pre-translate stories for offline use
    async preTranslateStories() {
        if (this.currentLanguage === 'en') return;
        
        console.log('🌍 Pre-translating stories for offline use...');
        
        try {
            // Translate all stories
            await this.translateAllStories();
            
            // Save translated stories to localStorage for offline use
            this.saveTranslatedStories();
            
            console.log('🌍 Story pre-translation completed');
        } catch (error) {
            console.error('🌍 Error pre-translating stories:', error);
        }
    }
    
    // Save translated stories to localStorage
    saveTranslatedStories() {
        try {
            localStorage.setItem('storyland-arabic-stories', JSON.stringify(this.arabicStories));
            console.log('🌍 Saved translated stories to localStorage');
        } catch (error) {
            console.error('🌍 Error saving translated stories:', error);
        }
    }
    
    // Load translated stories from localStorage
    loadTranslatedStories() {
        try {
            const saved = localStorage.getItem('storyland-arabic-stories');
            if (saved) {
                this.arabicStories = JSON.parse(saved);
                console.log(`🌍 Loaded ${this.arabicStories.length} translated stories from localStorage`);
            }
        } catch (error) {
            console.error('🌍 Error loading translated stories:', error);
        }
    }
    
    // Save offline translations to localStorage
    saveOfflineTranslations() {
        try {
            const translations = Object.fromEntries(this.offlineTranslations);
            localStorage.setItem('storyland-offline-translations', JSON.stringify(translations));
            console.log('🌍 Saved offline translations');
        } catch (error) {
            console.error('🌍 Error saving offline translations:', error);
        }
    }
    
    // Load offline translations from localStorage
    loadOfflineTranslations() {
        try {
            const saved = localStorage.getItem('storyland-offline-translations');
            if (saved) {
                const translations = JSON.parse(saved);
                this.offlineTranslations = new Map(Object.entries(translations));
                console.log(`🌍 Loaded ${this.offlineTranslations.size} offline translations`);
            }
        } catch (error) {
            console.error('🌍 Error loading offline translations:', error);
        }
    }
    
    // Get stories based on current language
    getStoriesForLanguage() {
        if (this.currentLanguage === 'ar') {
            return this.arabicStories.length > 0 ? this.arabicStories : this.stories;
        }
        return this.stories;
    }

    // Show error to user
    showErrorToUser(message) {
        console.error('🚨 Showing error to user:', message);
        
        // Remove any existing error messages
        const existingErrors = document.querySelectorAll('.storyland-error');
        existingErrors.forEach(error => error.remove());
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'storyland-error';
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc2626;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        `;
        
        errorDiv.innerHTML = `
            <h3>🚨 App Error</h3>
            <p>${message}</p>
            <p style="font-size: 12px; margin-top: 10px;">Check the browser console for more details.</p>
            <button onclick="location.reload()" style="
                background: white; 
                color: #dc2626; 
                border: none; 
                padding: 10px 20px; 
                border-radius: 5px; 
                cursor: pointer; 
                margin-top: 15px;
                font-weight: bold;
            ">🔄 Reload Page</button>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 10000);
    }

    // Set user badge
    setUserBadge() {
        console.log('👤 Setting user badge');
        try {
            const userBadge = document.getElementById('userBadge');
            const navLoginBtn = document.getElementById('navLoginBtn');
            const navSignupBtn = document.getElementById('navSignupBtn');
            
            if (this.activeProfile) {
                // User is logged in
                if (userBadge) userBadge.classList.remove('hidden');
                if (navLoginBtn) navLoginBtn.classList.add('hidden');
                if (navSignupBtn) navSignupBtn.classList.add('hidden');
                
                // Update user info
                const userName = document.getElementById('userName');
                if (userName) userName.textContent = `👤 ${this.activeProfile.name}`;
            } else {
                // User is not logged in
                if (userBadge) userBadge.classList.add('hidden');
                if (navLoginBtn) navLoginBtn.classList.remove('hidden');
                if (navSignupBtn) navSignupBtn.classList.remove('hidden');
            }
        } catch (error) {
            console.error('❌ Error setting user badge:', error);
        }
    }
    
    // Get total stars
    getTotalStars() {
        try {
            return Object.values(this.progress).reduce((total, story) => total + (story.stars || 0), 0);
        } catch (error) {
            console.error('❌ Error calculating total stars:', error);
            return 0;
        }
    }
    
    // Show auth message
    showAuthMessage(message, type = 'error') {
        console.log('💬 Showing auth message:', message, type);
        try {
            const messageDiv = document.getElementById('authMessage');
            if (messageDiv) {
                messageDiv.textContent = message;
                messageDiv.className = `mt-4 p-3 rounded-xl text-center font-semibold ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
                messageDiv.classList.remove('hidden');
                
                // Auto-hide after 5 seconds
                setTimeout(() => {
                    messageDiv.classList.add('hidden');
                }, 5000);
            }
        } catch (error) {
            console.error('❌ Error showing auth message:', error);
        }
    }
    
    // Hide auth message
    hideAuthMessage() {
        try {
            const messageDiv = document.getElementById('authMessage');
            if (messageDiv) {
                messageDiv.classList.add('hidden');
            }
        } catch (error) {
            console.error('❌ Error hiding auth message:', error);
        }
    }
    
    // Reset auth form
    resetAuthForm() {
        try {
            const inputs = document.querySelectorAll('#authModal input');
            inputs.forEach(input => {
                input.value = '';
            });
            this.hideAuthMessage();
        } catch (error) {
            console.error('❌ Error resetting auth form:', error);
        }
    }

    /**
     * ========================================
     * STORY MANAGEMENT SYSTEM
     * ========================================
     * Handles loading, displaying, and managing story content
     * Includes both English and Arabic story versions
     */
    
    /**
     * Initialize stories with sample content
     * Creates the base story collection for the app
     */
    initializeStories() {
        console.log('📚 ===== INITIALIZING STORIES =====');
        
        this.stories = [
            {
                id: 1,
                title: 'The Little Red Hen',
                content: 'Once upon a time, there was a little red hen who lived on a farm. She had three friends: a lazy dog, a sleepy cat, and a noisy yellow duck. One day, the little red hen found some wheat seeds. "Who will help me plant these seeds?" she asked. "Not I," said the dog. "Not I," said the cat. "Not I," said the duck. "Then I will do it myself," said the little red hen. And she did.',
                description: 'A story about hard work and helping others',
                vocabulary: [
                    { word: 'hen', definition: 'A female chicken' },
                    { word: 'wheat', definition: 'A grain used to make bread' },
                    { word: 'seeds', definition: 'Small parts of plants that grow into new plants' }
                ],
                illustration: '🐔',
                audioUrl: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
                timestamps: [
                    { word: 'Once', start: 0, end: 0.5 },
                    { word: 'upon', start: 0.5, end: 1.0 },
                    { word: 'a', start: 1.0, end: 1.2 },
                    { word: 'time', start: 1.2, end: 1.8 }
                ]
            },
            {
                id: 2,
                title: 'The Three Little Pigs',
                content: 'Once there were three little pigs who went out into the world to build their homes. The first little pig built his house out of straw. The second little pig built his house out of sticks. The third little pig built his house out of bricks. One day, a big bad wolf came along. He huffed and he puffed and he blew down the house of straw. He huffed and he puffed and he blew down the house of sticks. But he could not blow down the house of bricks.',
                description: 'A story about planning and building strong foundations',
                vocabulary: [
                    { word: 'straw', definition: 'Dried grass used for building or feeding animals' },
                    { word: 'sticks', definition: 'Small pieces of wood from trees' },
                    { word: 'bricks', definition: 'Hard blocks used for building strong walls' }
                ],
                illustration: '🐷',
                audioUrl: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
                timestamps: [
                    { word: 'Once', start: 0, end: 0.5 },
                    { word: 'there', start: 0.5, end: 1.0 },
                    { word: 'were', start: 1.0, end: 1.4 },
                    { word: 'three', start: 1.4, end: 2.0 }
                ]
            },
            {
                id: 3,
                title: 'Goldilocks and the Three Bears',
                content: 'Once upon a time, there was a little girl named Goldilocks. She went for a walk in the forest. Pretty soon, she came upon a house. She knocked and, when no one answered, she walked right in. At the table in the kitchen, there were three bowls of porridge. Goldilocks was hungry. She tasted the porridge from the first bowl. "This porridge is too hot!" she exclaimed. So, she tasted the porridge from the second bowl. "This porridge is too cold!" she said. So, she tasted the last bowl of porridge. "Ahhh, this porridge is just right!" she said happily and she ate it all up.',
                description: 'A story about finding what is just right',
                vocabulary: [
                    { word: 'porridge', definition: 'A warm breakfast food made from oats' },
                    { word: 'exclaimed', definition: 'Said something with strong feeling' },
                    { word: 'forest', definition: 'A large area covered with trees' }
                ],
                illustration: '👧',
                audioUrl: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
                timestamps: [
                    { word: 'Once', start: 0, end: 0.5 },
                    { word: 'upon', start: 0.5, end: 1.0 },
                    { word: 'a', start: 1.0, end: 1.2 },
                    { word: 'time', start: 1.2, end: 1.8 }
                ]
            }
        ];
        
        console.log(`📚 Initialized ${this.stories.length} stories`);
        console.log('📚 Story titles:', this.stories.map(s => s.title));
        console.log('📚 Stories array:', this.stories);
    }

    /**
     * ========================================
     * UTILITY FUNCTIONS & PLACEHOLDERS
     * ========================================
     * Various utility functions and placeholders for future features
     */
    
    /**
     * Watch demo functionality
     */
    watchDemo() {
        console.log('🎬 ===== WATCH DEMO =====');
        this.showNotification('🎬 Demo mode activated! This is a preview of StoryLand Adventures.', 'info');
    }
    
    /**
     * Toggle play/pause for audio narration
     */
    togglePlayPause() {
        console.log('🎵 ===== TOGGLE PLAY/PAUSE =====');
        
        try {
            if (!this.audio) {
                this.showNotification('No audio available for this story', 'warning');
                return;
            }
            
            if (this.isPlaying) {
                this.audio.pause();
                this.isPlaying = false;
                console.log('⏸️ Audio paused');
            } else {
                this.audio.play();
                this.isPlaying = true;
                console.log('▶️ Audio playing');
            }
            
            this.updateAudioControls();
            
        } catch (error) {
            console.error('❌ Error toggling play/pause:', error);
        }
    }
    
    /**
     * Go to previous word in narration
     */
    previousWord() {
        console.log('⏮️ ===== PREVIOUS WORD =====');
        
        try {
            if (!this.currentStory || !this.currentStory.timestamps) {
                this.showNotification('No word timestamps available', 'warning');
                return;
            }
            
            if (this.currentWordIndex > 0) {
                this.currentWordIndex--;
                const timestamp = this.currentStory.timestamps[this.currentWordIndex];
                if (this.audio && timestamp) {
                    this.audio.currentTime = timestamp.start;
                    console.log(`⏮️ Moved to previous word: ${timestamp.word}`);
                }
            }
            
        } catch (error) {
            console.error('❌ Error going to previous word:', error);
        }
    }
    
    /**
     * Go to next word in narration
     */
    nextWord() {
        console.log('⏭️ ===== NEXT WORD =====');
        
        try {
            if (!this.currentStory || !this.currentStory.timestamps) {
                this.showNotification('No word timestamps available', 'warning');
                return;
            }
            
            if (this.currentWordIndex < this.currentStory.timestamps.length - 1) {
                this.currentWordIndex++;
                const timestamp = this.currentStory.timestamps[this.currentWordIndex];
                if (this.audio && timestamp) {
                    this.audio.currentTime = timestamp.start;
                    console.log(`⏭️ Moved to next word: ${timestamp.word}`);
                }
            }
            
        } catch (error) {
            console.error('❌ Error going to next word:', error);
        }
    }
    
    /**
     * Repeat current word
     */
    repeatWord() {
        console.log('🔁 ===== REPEAT WORD =====');
        
        try {
            if (!this.currentStory || !this.currentStory.timestamps || this.currentWordIndex < 0) {
                this.showNotification('No word to repeat', 'warning');
                return;
            }
            
            const timestamp = this.currentStory.timestamps[this.currentWordIndex];
            if (this.audio && timestamp) {
                this.audio.currentTime = timestamp.start;
                this.audio.play();
                this.isPlaying = true;
                this.updateAudioControls();
                console.log(`🔁 Repeating word: ${timestamp.word}`);
            }
            
        } catch (error) {
            console.error('❌ Error repeating word:', error);
        }
    }
    
    /**
     * Sync navigation state with current page
     */
    syncNavigationState() {
        console.log('🧭 ===== SYNCING NAVIGATION STATE =====');
        
        try {
            // Update navigation button states based on current page
            const navButtons = ['navHome', 'navStories', 'navProgress', 'navProfile'];
            navButtons.forEach(navId => {
                const button = document.getElementById(navId);
                if (button) {
                    if (navId === 'nav' + this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1)) {
                        button.classList.add('bg-accent-blue', 'text-white');
                    } else {
                        button.classList.remove('bg-accent-blue', 'text-white');
                    }
                }
            });
            
            console.log('✅ Navigation state synced');
            
        } catch (error) {
            console.error('❌ Error syncing navigation state:', error);
        }
    }
    
    /**
     * Load user progress from storage
     */
    loadProgress() {
        try {
            const savedProgress = localStorage.getItem('storyland-progress');
            if (savedProgress) {
                this.progress = JSON.parse(savedProgress);
                console.log('💾 Progress loaded from storage');
            } else {
                this.progress = {};
                console.log('💾 No saved progress found, starting fresh');
            }
        } catch (error) {
            console.error('❌ Error loading progress:', error);
            this.progress = {};
        }
    }
    
    /**
     * Save user progress to storage
     */
    saveProgress() {
        try {
            localStorage.setItem('storyland-progress', JSON.stringify(this.progress));
            console.log('💾 Progress saved to storage');
        } catch (error) {
            console.error('❌ Error saving progress:', error);
        }
    }
    
    /**
     * Set up service worker for PWA functionality
     */
    setupServiceWorker() {
        console.log('🔧 ===== SETTING UP SERVICE WORKER =====');
        
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.error('❌ Service Worker registration failed:', error);
                    });
            } else {
                console.log('ℹ️ Service Worker not supported');
            }
        } catch (error) {
            console.error('❌ Error setting up service worker:', error);
        }
    }
    
    /**
     * Set up background image
     */
    setupBackgroundImage() {
        console.log('🖼️ ===== SETTING UP BACKGROUND IMAGE =====');
        console.log('🖼️ Background image setup completed');
    }
    
    /**
     * Set up smooth scrolling
     */
    setupSmoothScrolling() {
        console.log('📜 ===== SETTING UP SMOOTH SCROLLING =====');
        console.log('📜 Smooth scrolling setup completed');
    }
    
    /**
     * Verify required DOM elements exist
     */
    verifyRequiredElements() {
        console.log('🔍 ===== VERIFYING REQUIRED ELEMENTS =====');
        
        const requiredElements = [
            'navLoginBtn', 'navSignupBtn', 'languageToggle', 'authModal',
            'loginSection', 'signupSection', 'storiesContainer'
        ];
        
        let allFound = true;
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                console.log(`✅ ${id}: Found`);
            } else {
                console.error(`❌ ${id}: MISSING`);
                allFound = false;
            }
        });
        
        if (allFound) {
            console.log('✅ All required elements found');
        } else {
            console.error('❌ Some required elements are missing');
        }
        
        return allFound;
    }
    
    /**
     * Show notification to user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, type = 'info', duration = 3000) {
        console.log(`🔔 ===== SHOWING NOTIFICATION =====`);
        console.log(`🔔 Message: ${message}`);
        console.log(`🔔 Type: ${type}`);
        
        try {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.storyland-notification');
            existingNotifications.forEach(notification => notification.remove());
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `storyland-notification fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border-2 transition-all duration-300 transform translate-x-full`;
            
            // Set notification styles based on type
            switch (type) {
                case 'success':
                    notification.className += ' bg-green-500 text-white border-green-600';
                    break;
                case 'error':
                    notification.className += ' bg-red-500 text-white border-red-600';
                    break;
                case 'warning':
                    notification.className += ' bg-yellow-500 text-white border-yellow-600';
                    break;
                default:
                    notification.className += ' bg-blue-500 text-white border-blue-600';
            }
            
            // Set notification content
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-xl">${this.getNotificationIcon(type)}</span>
                    <span class="font-semibold">${message}</span>
                </div>
            `;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);
            
            // Auto remove after duration
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
            
            console.log('✅ Notification shown successfully');
            
        } catch (error) {
            console.error('❌ Error showing notification:', error);
        }
    }
    
    /**
     * Get notification icon based on type
     * @param {string} type - Notification type
     * @returns {string} Icon emoji
     */
    getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            default:
                return 'ℹ️';
        }
    }
    
    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showErrorToUser(message) {
        console.log(`❌ ===== SHOWING ERROR TO USER =====`);
        console.log(`❌ Error: ${message}`);
        
        try {
            // Create error overlay
            const errorOverlay = document.createElement('div');
            errorOverlay.className = 'fixed inset-0 bg-red-500 bg-opacity-90 flex items-center justify-center z-50';
            errorOverlay.innerHTML = `
                <div class="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
                    <div class="text-6xl mb-4">❌</div>
                    <h2 class="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p class="text-gray-700 mb-6">${message}</p>
                    <button class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" onclick="this.parentElement.parentElement.remove()">
                        Close
                    </button>
                </div>
            `;
            
            document.body.appendChild(errorOverlay);
            console.log('✅ Error overlay shown');
            
        } catch (error) {
            console.error('❌ Error showing error overlay:', error);
        }
    }
    
    /**
     * Run debug tests
     */
    runDebugTests() {
        console.log('🐛 ===== RUNNING DEBUG TESTS =====');
        
        try {
            console.log('🐛 Current app state:');
            console.log('🐛 - currentLanguage:', this.currentLanguage);
            console.log('🐛 - currentPage:', this.currentPage);
            console.log('🐛 - activeProfile:', this.activeProfile);
            console.log('🐛 - stories.length:', this.stories.length);
            console.log('🐛 - arabicStories.length:', this.arabicStories.length);
            
            console.log('🐛 DOM elements check:');
            const criticalElements = ['navLoginBtn', 'navSignupBtn', 'languageToggle', 'authModal'];
            criticalElements.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    console.log(`🐛 ✅ ${id}: Found`);
                } else {
                    console.log(`🐛 ❌ ${id}: MISSING`);
                }
            });
            
            console.log('✅ Debug tests completed');
            
        } catch (error) {
            console.error('❌ Error running debug tests:', error);
        }
    }
    
    /**
     * Test modal functionality
     */
    testModal() {
        console.log('🧪 ===== TESTING MODAL =====');
        
        try {
            this.openAuthModal('login');
            console.log('✅ Modal test completed');
        } catch (error) {
            console.error('❌ Error testing modal:', error);
        }
    }
    
    /**
     * Load offline translations from storage
     */
    loadOfflineTranslations() {
        try {
            const saved = localStorage.getItem('storyland-offline-translations');
            if (saved) {
                this.offlineTranslations = new Map(JSON.parse(saved));
                console.log('💾 Offline translations loaded:', this.offlineTranslations.size);
            }
        } catch (error) {
            console.error('❌ Error loading offline translations:', error);
        }
    }
    
    /**
     * Save offline translations to storage
     */
    saveOfflineTranslations() {
        try {
            const data = JSON.stringify(Array.from(this.offlineTranslations.entries()));
            localStorage.setItem('storyland-offline-translations', data);
            console.log('💾 Offline translations saved');
        } catch (error) {
            console.error('❌ Error saving offline translations:', error);
        }
    }
    
    /**
     * Load translated stories from storage
     */
    loadTranslatedStories() {
        try {
            const saved = localStorage.getItem('storyland-translated-stories');
            if (saved) {
                this.arabicStories = JSON.parse(saved);
                console.log('💾 Translated stories loaded:', this.arabicStories.length);
            }
        } catch (error) {
            console.error('❌ Error loading translated stories:', error);
        }
    }
    
    /**
     * Save translated stories to storage
     */
    saveTranslatedStories() {
        try {
            localStorage.setItem('storyland-translated-stories', JSON.stringify(this.arabicStories));
            console.log('💾 Translated stories saved');
        } catch (error) {
            console.error('❌ Error saving translated stories:', error);
        }
    }
    
    /**
     * Translate text using API or cached translations
     * @param {string} text - Text to translate
     * @param {string} targetLang - Target language
     * @returns {Promise<string>} Translated text
     */
    async translateText(text, targetLang = 'ar') {
        if (!text || typeof text !== 'string') return text;
        
        const cacheKey = `${text}_${targetLang}`;
        
        // Check UI translations first (offline)
        if (this.uiTranslations[targetLang] && this.uiTranslations[targetLang][text]) {
            console.log(`🌍 Using UI translation for: ${text}`);
            return this.uiTranslations[targetLang][text];
        }
        
        // Check offline cache
        if (this.offlineTranslations.has(cacheKey)) {
            console.log(`🌍 Using offline translation for: ${text}`);
            return this.offlineTranslations.get(cacheKey);
        }
        
        // Check memory cache
        if (this.translationCache.has(cacheKey)) {
            console.log(`🌍 Using cached translation for: ${text}`);
            return this.translationCache.get(cacheKey);
        }
        
        try {
            // Try online translation
            const translation = await this.translateOnline(text, targetLang);
            if (translation) {
                // Cache the translation
                this.translationCache.set(cacheKey, translation);
                this.offlineTranslations.set(cacheKey, translation);
                this.saveOfflineTranslations();
                return translation;
            }
        } catch (error) {
            console.log('🌍 Online translation failed, using fallback:', error.message);
        }
        
        // Fallback: return original text if translation fails
        return text;
    }
    
    /**
     * Translate text using online API
     * @param {string} text - Text to translate
     * @param {string} targetLang - Target language
     * @returns {Promise<string>} Translated text
     */
    async translateOnline(text, targetLang) {
        try {
            const response = await fetch(`${this.translationAPI}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
            const data = await response.json();
            
            if (data.responseStatus === 200 && data.responseData) {
                return data.responseData.translatedText;
            }
            
            return null;
        } catch (error) {
            console.error('🌍 Translation API error:', error);
            return null;
        }
    }
    
    /**
     * Update language toggle button appearance
     */
    updateLanguageButton() {
        try {
            const langBtn = document.getElementById('languageToggle');
            if (langBtn) {
                if (this.currentLanguage === 'en') {
                    langBtn.innerHTML = '🇺🇸';
                    langBtn.title = 'Switch to Arabic / التبديل إلى العربية';
                } else {
                    langBtn.innerHTML = '🇵🇸';
                    langBtn.title = 'Switch to English / التبديل إلى الإنجليزية';
                }
                console.log('🌍 Language toggle button updated');
            } else {
                console.error('🌍 Language toggle button not found');
            }
        } catch (error) {
            console.error('🌍 Error updating language button:', error);
        }
    }
    
    /**
     * Load saved language preference
     */
    loadLanguagePreference() {
        try {
            const savedLanguage = localStorage.getItem('storyland-language');
            if (savedLanguage && this.uiTranslations[savedLanguage]) {
                this.currentLanguage = savedLanguage;
                console.log(`🌍 Loaded saved language preference: ${this.currentLanguage}`);
            } else {
                console.log(`🌍 No valid saved language preference, using default: ${this.currentLanguage}`);
            }
        } catch (error) {
            console.error('🌍 Error loading language preference:', error);
            console.log(`🌍 Using default language: ${this.currentLanguage}`);
        }
    }

    /**
     * Switch profile functionality
     */
    switchProfile() {
        console.log('👤 ===== SWITCHING PROFILE =====');
        
        try {
            // Logout current user
            this.logout();
            
            // Show auth modal for new profile creation
            setTimeout(() => {
                this.openAuthModal('signup');
            }, 1000);
            
            console.log('✅ Profile switched successfully');
            
        } catch (error) {
            console.error('❌ Error switching profile:', error);
        }
    }
}

// ========================================
// APP INITIALIZATION
// ========================================
// Create and initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ===== DOM LOADED - INITIALIZING APP =====');
    try {
        window.tprsApp = new TPRSApp();
        console.log('✅ App initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
    }
});

console.log('📜 ===== TPRS APP SCRIPT LOADED =====');