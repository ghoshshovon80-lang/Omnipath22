const savedStateKey = 'omniPathState';

const roadmapLessons = [
    { title: 'Python setup', duration: '8 min', id: 1, url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
    { title: 'Variables & types', duration: '12 min', id: 2, url: 'https://www.youtube.com/watch?v=kjBOesZCoqc' },
    { title: 'Pandas essentials', duration: '22 min', id: 3, url: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
    { title: 'Functions and modules', duration: '18 min', id: 4, url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I' },
    { title: 'Data cleaning workflow', duration: '20 min', id: 5, url: 'https://www.youtube.com/watch?v=OTz5XEZwd2E' },
    { title: 'Exploratory analysis', duration: '25 min', id: 6, url: 'https://www.youtube.com/watch?v=2eebptXfEvw' },
    { title: 'Modeling fundamentals', duration: '28 min', id: 7, url: 'https://www.youtube.com/watch?v=7eh4d6sabA0' },
    { title: 'Visualizing insights', duration: '16 min', id: 8, url: 'https://www.youtube.com/watch?v=zx5aroO8eYg' },
    { title: 'Mini project build', duration: '30 min', id: 9, url: 'https://www.youtube.com/watch?v=2-F5W4x0nug' },
    { title: 'Review & next steps', duration: '15 min', id: 10, url: 'https://www.youtube.com/watch?v=sBzRwzY7G-k' }
];

const defaultState = {
    topic: 'Python for data science',
    progress: 24,
    completedLessons: [1],
    lastLesson: 1
};

function showSection(sectionId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'roadmap') {
        updateRoadmap();
    }
    if (sectionId === 'focus') {
        updateFocus();
    }
    if (sectionId === 'profile') {
        updateProfile();
    }
}

function handleAuth() {
    alert('Login / Signup UI placeholder. This page is designed for saved progress and personal paths.');
}

function getState() {
    const saved = localStorage.getItem(savedStateKey);
    return saved ? JSON.parse(saved) : defaultState;
}

function saveState(state) {
    localStorage.setItem(savedStateKey, JSON.stringify(state));
}

function generateRoadmap() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Please type a topic to generate your learning roadmap.');
        return;
    }

    const state = getState();
    state.topic = query;
    state.progress = 0;
    state.completedLessons = [];
    state.lastLesson = 0;
    saveState(state);

    document.getElementById('roadmapTopic').textContent = query;
    updateRoadmap();
    showSection('roadmap');
}

function loadTrending(topic) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = topic;
    generateRoadmap();
}

function updateRoadmap() {
    const state = getState();
    document.getElementById('roadmapTopic').textContent = state.topic;
    const steps = [
        'Intro to the skill and key concepts',
        'Core tools, terminology, and setup',
        'Fundamental examples and practice',
        'Intermediate workflows and best practices',
        'Applied projects with theory',
        'Advanced strategy and optimization',
        'Real-world problem solving',
        'Knowledge checks and analogy review',
        'Portfolio-style mini project',
        'Capstone review and next steps'
    ];

    const container = document.getElementById('roadmapSteps');
    container.innerHTML = steps.map((label, index) => `
        <div class="roadmap-step">
            <div class="roadmap-step__badge">${index + 1}</div>
            <div class="roadmap-step__meta">
                <strong>${label}</strong>
                <span>${index === 0 ? 'Start here to build a strong foundation.' : 'Step ' + (index + 1) + ' in your curated path.'}</span>
            </div>
        </div>
    `).join('');
}

function updateFocus() {
    const state = getState();
    document.getElementById('courseProgress').style.width = `${state.progress}%`;
    document.getElementById('progressText').textContent = `${state.progress}% complete • ${state.completedLessons.length} / ${roadmapLessons.length} lessons watched`;

    const lessonList = document.getElementById('lessonList');
    lessonList.innerHTML = roadmapLessons.map(lesson => {
        const completed = state.completedLessons.includes(lesson.id);
        return `
            <div class="lesson-item${completed ? ' completed' : ''}">
                <div>
                    <strong>${lesson.id}. ${lesson.title}</strong>
                    <div class="small-note">${lesson.duration}${completed ? ' • Completed' : ''}</div>
                </div>
                <button onclick="playLesson('${lesson.title}', '${lesson.url}', ${lesson.id})">Watch</button>
            </div>
        `;
    }).join('');
}

function playLesson(title, url, lessonId) {
    const iframe = document.getElementById('focusIframe');
    iframe.src = getYouTubeEmbedUrl(url);

    const state = getState();
    if (!state.completedLessons.includes(lessonId)) {
        state.completedLessons.push(lessonId);
        state.progress = Math.min(100, Math.round((state.completedLessons.length / roadmapLessons.length) * 100));
        state.lastLesson = lessonId;
        saveState(state);
    }
    updateFocus();
}

function askAI() {
    const question = document.getElementById('askInput').value.trim();
    const response = document.getElementById('askResponse');
    if (!question) {
        response.textContent = 'Type a question to get quick concept guidance.';
        return;
    }

    response.textContent = 'AI Tutor placeholder: This answer would explain the video concept in clear study-friendly language.';
}

function getYouTubeEmbedUrl(url) {
    try {
        const parsed = new URL(url, window.location.href);
        let videoId = '';
        if (parsed.hostname.includes('youtu.be')) {
            videoId = parsed.pathname.slice(1);
        } else if (parsed.hostname.includes('youtube.com')) {
            if (parsed.searchParams.has('v')) {
                videoId = parsed.searchParams.get('v');
            } else if (parsed.pathname.startsWith('/embed/')) {
                videoId = parsed.pathname.split('/embed/')[1];
            }
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
    } catch (error) {
        return url;
    }
}

function fetchYouTubeVideos(topic) {
    // TODO: Integrate YouTube Data API backend proxy.
    // Example: POST /api/youtube-search { query: topic }
    // Return an array of video objects: { title, url, duration }
    return Promise.resolve([]);
}

function fetchAIResponse(question, context) {
    // TODO: Integrate OpenAI/Anthropic backend proxy.
    // Example: POST /api/ai-chat { question, context }
    return Promise.resolve('AI integration will provide a contextual answer here.');
}

window.addEventListener('load', () => {
    const state = getState();
    document.getElementById('searchInput').value = state.topic;
    updateRoadmap();
    updateFocus();
});
