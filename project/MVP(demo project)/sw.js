// Service Worker for StoryLand Adventures PWA
const CACHE_NAME = 'storyland-cache-v1';
const STATIC_CACHE = 'tprs-static-v5';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/styles.css',
    '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                self.skipWaiting();
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated successfully');
            self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Network-first strategy for HTML and JavaScript
    if (request.destination === 'document' || 
        request.destination === 'script' || 
        (request.url.includes('.html') || request.url.includes('.js'))) {
        
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache the response for future use
                    const responseClone = response.clone();
                    caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // If network fails, try to serve from cache
                    return caches.match(request);
                })
        );
        return;
    }
    
    // Cache-first strategy for other assets
    event.respondWith(
        caches.match(request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(request);
            })
    );
});

// Message event - handle story downloads
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'DOWNLOAD_STORIES') {
    downloadStories(event.data.stories);
  }
});

// Function to download and cache stories
async function downloadStories(stories) {
  const cache = await caches.open(STORIES_CACHE);
  
  for (const story of stories) {
    try {
      if (story.audioUrl) {
        const audioResponse = await fetch(story.audioUrl);
        await cache.put(story.audioUrl, audioResponse.clone());
      }
      await cache.put(`/stories/${story.id}`, new Response(JSON.stringify(story)));
    } catch (error) {
      // Ignore errors to continue caching others
    }
  }
  
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'STORIES_CACHED', count: stories.length });
    });
  });
} 