// ==========================================
// MOHSIN ❤️ MUZAMMIL
// A JOURNEY OF ONE BEAUTIFUL YEAR
// SCRIPT.JS — CLEAN & FIXED EDITION
// ==========================================

// ==========================================
// GLOBAL STATE
// ==========================================
let currentScene = 1;
let isMusicPlaying = false;

let galaxyAnimationId = null;
let fireworksAnimationId = null;

let poppedCount = 0;
let currentQuestionIdx = 0;
let easterClickCount = 0;

// Memory Galaxy state
let galaxyStarsClicked = 0;
let clickedStarIndexHistory = [];

const totalScenes = 19;

// ==========================================
// 1. CLOCK
// ==========================================
function updateClock() {
    const clockElem = document.getElementById("clock");
    if (!clockElem) return;

    const now = new Date();

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    clockElem.innerText = now.toLocaleDateString("en-GB", options);
}

setInterval(updateClock, 1000);
updateClock();


// ==========================================
// 2. MUSIC
// ==========================================
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const button = document.getElementById("music-toggle-btn");

    if (!music) return;

    if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;

        if (button) {
            button.innerText = "🎵 Play Music";
        }
    } else {
        music.play()
            .then(() => {
                isMusicPlaying = true;

                if (button) {
                    button.innerText = "⏸ Pause Music";
                }
            })
            .catch(error => {
                console.log("Music play blocked:", error);
            });
    }
}


// ==========================================
// 3. PRELOADER
// ==========================================
function hidePreloader() {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    setTimeout(() => {
        preloader.style.display = "none";

        if (typeof startScene1Animation === "function") {
            startScene1Animation();
        }
    }, 800);
}

window.addEventListener("load", () => {
    setTimeout(hidePreloader, 1500);
});


// ==========================================
// 4. SCENE NAVIGATION & EXACT SEQUENCE
// ==========================================
function nextScene() {
    stopBackgroundAnimations();

    const currentElement = document.getElementById(`scene-${currentScene}`);

    if (currentElement) {
        currentElement.classList.remove("active");
    }

    // Exact Sequence handling according to HTML Structure
    if (currentScene === 7) {
        currentScene = "7b";
    }
    else if (currentScene === "7b") {
        currentScene = 8;
    }
    else if (currentScene === 12) {
        currentScene = "12b";
    }
    else if (currentScene === "12b") {
        currentScene = "13.5";
    }
    else if (currentScene === "13.5") {
        currentScene = 14;
    }
    else if (currentScene === 14) {
        currentScene = "14b";
    }
    else if (currentScene === "14b") {
        currentScene = 15;
    }
    else if (currentScene === 15) {
        currentScene = 16;
    }
    else if (currentScene === 16) {
        currentScene = 13; // 365 Days — Our Story comes right after Grand Fireworks
    }
    else if (currentScene === 13) {
        currentScene = 17; // Friendship Awards
    }
    else {
        if (typeof currentScene === "number") {
            currentScene++;
        } else {
            currentScene = parseInt(currentScene) + 1;
        }
    }

    const nextElement = document.getElementById(`scene-${currentScene}`);

    if (nextElement) {
        nextElement.classList.add("active");
        initSceneLogic(currentScene);
    }
}


// ==========================================
// DIRECT SCENE NAVIGATION
// ==========================================
function goToScene(sceneId) {
    document.querySelectorAll(".scene").forEach(scene => scene.classList.remove("active"));

    stopBackgroundAnimations();

    const target = document.getElementById(sceneId);

    if (!target) return;

    target.classList.add("active");

    const rawId = sceneId.replace("scene-", "");

    if (!isNaN(rawId)) {
        currentScene = Number(rawId);
    } else {
        currentScene = rawId;
    }

    initSceneLogic(currentScene);
}


// ==========================================
// STOP ANIMATIONS
// ==========================================
function stopBackgroundAnimations() {
    if (galaxyAnimationId) {
        cancelAnimationFrame(galaxyAnimationId);
        galaxyAnimationId = null;
    }

    if (fireworksAnimationId) {
        cancelAnimationFrame(fireworksAnimationId);
        fireworksAnimationId = null;
    }
}


// ==========================================
// SCENE INITIALIZATION LOGIC
// ==========================================
function initSceneLogic(sceneId) {
    sceneId = String(sceneId);

    if (sceneId === "3") {
        initBalloonGame();
    }
    if (sceneId === "9") {
        loadQuizQuestion();
    }
    if (sceneId === "10") {
        fixSpecialCardsOverflow();
    }
    if (sceneId === "13.5") {
        initMemoryGalaxy();
    }
    if (sceneId === "14") {
        startTypewriterLetter();
    }
    if (sceneId === "14b") {
        startSilentReflection();
        startGalaxyBackground("galaxy-canvas-14b");
    }
    if (sceneId === "15") {
        startGalaxyBackground("galaxy-canvas-15");
    }
    if (sceneId === "16") {
        triggerFireworks();
    }
    if (sceneId === "13") {
        start365DaysStory();
    }
    if (sceneId === "18") {
        startWishesFireworks();
    }
    if (sceneId === "19") {
        startFinalEndingSequence();
    }
}


// ==========================================
// 5. SCENE 1 — CINEMATIC OPENING
// ==========================================
function startScene1Animation() {
    const q1 = document.getElementById("quote-1");
    const q2 = document.getElementById("quote-2");

    if (!q1 || !q2) return;

    q1.classList.remove("hidden");

    setTimeout(() => {
        q1.classList.add("hidden");

        setTimeout(() => {
            q2.classList.remove("hidden");

            setTimeout(() => {
                q2.classList.add("hidden");

                setTimeout(() => {
                    nextScene();
                }, 1000);

            }, 4000);

        }, 1000);

    }, 4000);
}


// ==========================================
// 6. SCENE 3 — BALLOON GAME
// ==========================================
const balloonWords = [
    "Trust",
    "Brotherhood",
    "Respect",
    "Loyalty",
    "Kindness",
    "Support",
    "Care",
    "Memories",
    "Smile",
    "Family"
];

function initBalloonGame() {
    const container = document.getElementById("balloon-container");
    if (!container) return;

    container.innerHTML = "";
    poppedCount = 0;

    const count = document.getElementById("pop-count");
    const list = document.getElementById("revealed-words-list");

    if (count) count.innerText = "0";
    if (list) list.innerHTML = "";

    const nextButton = document.getElementById("balloon-next-btn");
    if (nextButton) nextButton.classList.add("hidden");

    balloonWords.forEach((word, index) => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${8 + (index * 9)}%`;
        balloon.style.animationDelay = `${Math.random() * 2}s`;

        balloon.onclick = () => {
            popBalloon(balloon, word);
        };

        container.appendChild(balloon);
    });
}

function popBalloon(element, word) {
    if (!element || element.dataset.popped === "true") return;

    element.dataset.popped = "true";
    element.style.transform = "scale(1.5)";
    element.style.opacity = "0";

    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 150);

    poppedCount++;

    const count = document.getElementById("pop-count");
    if (count) count.innerText = poppedCount;

    const list = document.getElementById("revealed-words-list");
    if (list) {
        const badge = document.createElement("span");
        badge.className = "word-badge";
        badge.innerText = word;
        list.appendChild(badge);
    }

    if (poppedCount >= balloonWords.length) {
        const nextButton = document.getElementById("balloon-next-btn");
        if (nextButton) nextButton.classList.remove("hidden");
    }
}


// ==========================================
// 7. HEART EXPLOSION
// ==========================================
function explodeHeart() {
    const heart = document.querySelector(".glowing-heart-interactive");

    if (heart) {
        heart.style.transform = "scale(2)";
        heart.style.opacity = "0";
    }

    setTimeout(() => {
        nextScene();
    }, 700);
}


// ==========================================
// 8. SECRET PIN
// ==========================================
function verifySecretPin() {
    const input = document.getElementById("pin-input");
    if (!input) return;

    const pin = input.value.trim();
    const validPins = ["160926", "2026", "16", "786"];

    if (validPins.includes(pin)) {
        const error = document.getElementById("pin-error-text");
        if (error) error.classList.add("hidden");

        triggerEasterEggPopup();
    } else {
        const error = document.getElementById("pin-error-text");
        if (error) error.classList.remove("hidden");

        input.value = "";
        input.focus();
    }
}


// ==========================================
// 9. GIFT BOX
// ==========================================
function openGiftBox() {
    const box = document.getElementById("gift-box") ||
                document.getElementById("early-gift-box") ||
                document.querySelector(".gift-box");

    if (box) {
        box.style.transform = "scale(1.5) rotate(15deg)";
        box.style.filter = "drop-shadow(0 0 35px #ffd700)";
    }

    setTimeout(() => {
        nextScene();
    }, 900);
}


// ==========================================
// 10. EASTER EGG MODAL
// ==========================================
function triggerEasterEggPopup() {
    const modal = document.getElementById("easter-modal");

    if (!modal) {
        nextScene();
        return;
    }

    modal.innerHTML = `
        <div class="glass-card text-center">
            <div class="secret-unlocked-icon">🎉</div>
            <h2 class="mt-15">Secret Unlocked!</h2>
            <p class="mt-15">You discovered a hidden piece of our journey. ❤️</p>
            <h3 class="gold-subtitle mt-15">+100 Brotherhood Points 🌟</h3>
            <button class="btn-glow mt-20" onclick="closeEasterModalAndContinue()">
                Continue ➡️
            </button>
        </div>
    `;

    modal.classList.remove("hidden");
}

function closeEasterModalAndContinue() {
    const modal = document.getElementById("easter-modal");
    if (modal) modal.classList.add("hidden");
    nextScene();
}

function closeEasterModal() {
    const modal = document.getElementById("easter-modal");
    if (modal) modal.classList.add("hidden");
}


// ==========================================
// 11. MAGIC CARD
// ==========================================
function flipMagicCard() {
    const card = document.getElementById("magic-card");
    if (card) card.classList.toggle("flipped");
}


// ==========================================
// 12. QUESTIONS / QUIZ
// ==========================================
const customQuestions = [
    "Q1. What is the most memorable moment of our friendship?",
    "Q2. What is the best quality you have seen in me till today?",
    "Q3. What is the funniest memory you have of us?",
    "Q4. What is one thing you want me to improve in the coming year?"
];

const userAnswers = {};

function loadQuizQuestion() {
    const body = document.getElementById("quiz-body");
    if (!body) return;

    if (currentQuestionIdx >= customQuestions.length) {
        body.innerHTML = `
            <div class="gold-subtitle text-center">🔒 All Answers Locked!</div>
            <p class="mt-15 text-center">Thank you for sharing these precious memories. ❤️</p>
            <div class="text-center">
                <button class="btn-glow mt-15" onclick="nextScene()">Continue ➡️</button>
            </div>
        `;
        return;
    }

    const question = customQuestions[currentQuestionIdx];

    body.innerHTML = `
        <div id="question-card" class="question-container">
            <p class="question-title"><strong>${question}</strong></p>
            <textarea id="answer-input" rows="3" placeholder="Write your answer here..." class="custom-textarea"></textarea>
            <button id="lock-btn" class="btn-glow mt-15" onclick="submitAndLockAnswer()">
                🔒 Lock Answer & Next
            </button>
        </div>
    `;
}

function submitAndLockAnswer() {
    const input = document.getElementById("answer-input");
    const card = document.getElementById("question-card");

    if (!input || !input.value.trim()) {
        alert("Please write an answer before locking! ❤️");
        return;
    }

    userAnswers[`Q${currentQuestionIdx + 1}`] = input.value.trim();

    if (card) {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "0";
        card.style.transform = "translateY(-20px)";
    }

    setTimeout(() => {
        currentQuestionIdx++;
        loadQuizQuestion();
    }, 500);
}


// ==========================================
// 13. FLIP CARDS & ISSUE 1 OVERFLOW FIX
// ==========================================
function handleCardFlip(selectedCard) {
    if (!selectedCard) return;

    const allCards = document.querySelectorAll("#scene-10 .flip-card");
    const wasFlipped = selectedCard.classList.contains("flipped");

    allCards.forEach(card => card.classList.remove("flipped"));

    if (!wasFlipped) {
        selectedCard.classList.add("flipped");
    }
}

// Fix Issue 1: Prevent "Why You're So Special To Me" text overflow
function fixSpecialCardsOverflow() {
    const specialCards = document.querySelectorAll("#scene-10 .flip-card, #scene-10 .glass-card");
    specialCards.forEach(card => {
        card.style.maxHeight = "85vh";
        card.style.overflowY = "auto";
        card.style.boxSizing = "border-box";
        card.style.padding = "15px";
    });
}


// ==========================================
// 14. BROTHERHOOD OATH
// ==========================================
function acceptOath() {
    const button = document.getElementById("oath-btn");
    const status = document.getElementById("oath-status");

    if (button) button.classList.add("hidden");
    if (status) status.classList.remove("hidden");

    setTimeout(() => {
        nextScene();
    }, 1500);
}


// ==========================================
// 15. GALLERY
// ==========================================
function flipGalleryCard(element) {
    if (!element) return;
    element.classList.toggle("flipped");
}

// ==========================================
// 15B. MEMORY MATCH GAME LOGIC
// ==========================================

const memoryIcons = ["🎈", "⭐", "🎵", "💖", "🌸", "🔥", "👑", "💎"];
let gameCards = [];
let flippedCards = [];
let matchedPairs = 0;
let gameMoves = 0;
let canFlipCard = true;

function startMemoryMatchGame() {
    // Go to Game Board Scene
    goToScene("scene-12-game-board");

    // Reset Game Stats
    gameMoves = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlipCard = true;
    
    const movesEl = document.getElementById("game-moves-count");
    const matchesEl = document.getElementById("game-matches-count");
    if (movesEl) movesEl.innerText = "0";
    if (matchesEl) matchesEl.innerText = "0";
    
    const resultBox = document.getElementById("game-result-box");
    if (resultBox) resultBox.classList.add("hidden");

    // Prepare Cards Grid
    gameCards = [...memoryIcons, ...memoryIcons].sort(() => Math.random() - 0.5);

    const gridContainer = document.getElementById("memory-grid-container");
    if (!gridContainer) return;

    gridContainer.style.display = "grid";
    gridContainer.innerHTML = "";

    gameCards.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("mem-card");
        card.dataset.icon = icon;

        card.innerHTML = `
            <div class="mem-card-inner">
                <div class="mem-card-front">✦</div>
                <div class="mem-card-back">${icon}</div>
            </div>
        `;

        card.addEventListener("click", () => handleGameCardClick(card));
        gridContainer.appendChild(card);
    });
}

function handleGameCardClick(card) {
    if (!canFlipCard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        gameMoves++;
        const movesEl = document.getElementById("game-moves-count");
        if (movesEl) movesEl.innerText = gameMoves;
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    canFlipCard = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        
        const matchesEl = document.getElementById("game-matches-count");
        if (matchesEl) matchesEl.innerText = matchedPairs;

        flippedCards = [];
        canFlipCard = true;

        if (matchedPairs === 8) {
            setTimeout(showGameResultScreen, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            canFlipCard = true;
        }, 800);
    }
}

function showGameResultScreen() {
    const gridContainer = document.getElementById("memory-grid-container");
    if (gridContainer) gridContainer.style.display = "none";

    const scoreEl = document.getElementById("final-moves-score");
    if (scoreEl) scoreEl.innerText = gameMoves;

    const resultBox = document.getElementById("game-result-box");
    if (resultBox) resultBox.classList.remove("hidden");

    // Full Screen Fireworks trigger ONLY when Result Screen appears
    if (typeof confetti === "function") {
        // Left side blast
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 }
        });
        // Right side blast
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 }
        });
    }
}



// ==========================================
// VIDEO CONTROLS
// ==========================================
function handleVideoPlay() {
    const music = document.getElementById("bg-music");
    if (music) music.volume = 0.15;
}

function handleVideoPause() {
    const music = document.getElementById("bg-music");
    if (music) music.volume = 1;
}

function handleVideoEnd() {
    const music = document.getElementById("bg-music");
    if (music) music.volume = 1;
}

// ======================================================
// 16. 365 DAYS — OUR STORY (SCENE 13) - SEQUENTIAL + FIREWORKS
// ======================================================

// Helper function to handle background fireworks on Scene 13 canvas
function triggerScene13Fireworks() {
    const canvas = document.getElementById("fireworks-canvas-13");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createExplosion() {
        const x = Math.random() * canvas.width;
        // Fireworks ko Card ke upar Khali Aasman (Top 35%) mein explode karwane ke liye:
        const y = Math.random() * (canvas.height * 0.35) + 35;
        const colors = ["#ffd700", "#ff4b2b", "#ff416c", "#00f2fe", "#ffffff", "#00ff88"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 28; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                alpha: 1,
                color: color
            });
        }
    }

    // Spawn fireworks periodically while Scene 13 is active
    const fireworkInterval = setInterval(() => {
        const activeScene = document.getElementById("scene-13");
        if (activeScene && activeScene.classList.contains("active")) {
            createExplosion();
        } else {
            clearInterval(fireworkInterval);
        }
    }, 550);

    function renderFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.015;

            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        if (document.getElementById("scene-13")?.classList.contains("active")) {
            requestAnimationFrame(renderFireworks);
        }
    }

    renderFireworks();
}

// Helper function to animate a single counter sequentially
function animateSingleCounter(elementId, start, end, duration, isLast = false) {
    return new Promise((resolve) => {
        const el = document.getElementById(elementId);
        if (!el) {
            resolve();
            return;
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            // Format numbers with commas (e.g., 8,760)
            el.innerText = current.toLocaleString() + (isLast && progress === 1 ? '+' : '');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                resolve(); // Resolves promise when counter animation finishes
            }
        };
        window.requestAnimationFrame(step);
    });
}

// Main function to run the sequential animation with fireworks
async function start365DaysStory() {
    // Start background fireworks animation
    triggerScene13Fireworks();

    // Reset all counter values to 0 initially
    document.getElementById("count-days").innerText = "0";
    document.getElementById("count-hours").innerText = "0";
    document.getElementById("count-minutes").innerText = "0";
    document.getElementById("count-seconds").innerText = "0";

    // Step 1: Animate Days Counter
    await animateSingleCounter("count-days", 0, 365, 1000);

    // Step 2: Animate Hours Counter
    await animateSingleCounter("count-hours", 0, 8760, 1200);

    // Step 3: Animate Minutes Counter
    await animateSingleCounter("count-minutes", 0, 525600, 1500);

    // Step 4: Animate Seconds Counter
    await animateSingleCounter("count-seconds", 0, 31536000, 1800, true);

    // Step 5: Reveal Story Message
    const message = document.getElementById("days-story-message");
    if (message) {
        message.classList.remove("hidden");
        message.style.opacity = "0";
        message.style.transition = "opacity 1s ease";
        setTimeout(() => { message.style.opacity = "1"; }, 50);
    }

    // Step 6: Reveal Final Heart Symbol (M ❤️ M)
    const symbol = document.getElementById("days-final-symbol");
    if (symbol) {
        setTimeout(() => {
            symbol.classList.remove("hidden");
            symbol.style.opacity = "0";
            symbol.style.transition = "opacity 1s ease";
            setTimeout(() => { symbol.style.opacity = "1"; }, 50);
        }, 500);
    }
}



// ======================================================
// 17. MEMORY GALAXY (SCENE 13.5)
// ======================================================
const galaxyMemories = [
    "🌟 September 2025: The day our journey began.",
    "✨ Late Night Chats & Endless Laughs.",
    "🚀 Supporting each other's dreams every step of the way.",
    "🤝 Unbreakable Trust & Honesty.",
    "💎 Moments that money can't buy.",
    "🎉 Celebrating every big and small achievement together.",
    "🔥 Brother through thick and thin.",
    "❤️ One Year of Unforgettable Memories."
];

function initMemoryGalaxy() {
    galaxyStarsClicked = 0;
    clickedStarIndexHistory = [];

    const display = document.getElementById("galaxy-memory-display");
    const nextBtnContainer = document.getElementById("galaxy-next-container");
    const svg = document.getElementById("galaxy-lines-svg");

    if (display) display.innerText = "Tap on the stars to reveal our memories...";
    if (nextBtnContainer) nextBtnContainer.style.display = "none";
    if (svg) svg.innerHTML = "";

    document.querySelectorAll("#scene-13\\.5 .star, .star").forEach(star => {
        star.classList.remove("active-star");
    });
}

function revealGalaxyMemory(starElement, index) {
    if (!starElement) return;

    const memoryIndex = Number(index) - 1;
    const display = document.getElementById("galaxy-memory-display");

    if (display && galaxyMemories[memoryIndex]) {
        display.style.opacity = "0";

        setTimeout(() => {
            display.innerText = galaxyMemories[memoryIndex];
            display.style.opacity = "1";
        }, 200);
    }

    if (!starElement.classList.contains("active-star")) {
        starElement.classList.add("active-star");
        galaxyStarsClicked++;

        if (clickedStarIndexHistory.length > 0) {
            const previousIndex = clickedStarIndexHistory[clickedStarIndexHistory.length - 1];
            const previousStar = document.querySelector(`.star[data-index="${previousIndex}"]`);
            drawGalaxyLine(previousStar, starElement);
        }

        clickedStarIndexHistory.push(Number(index));

        if (galaxyStarsClicked >= 8) {
            connectAllGalaxyStars();

            const nextBtnContainer = document.getElementById("galaxy-next-container");
            if (nextBtnContainer) {
                setTimeout(() => {
                    nextBtnContainer.style.display = "block";
                }, 1200);
            }
        }
    }
}

function tapStar(starElement, text) {
    if (!starElement) return;
    const index = parseInt(starElement.getAttribute("data-index"));
    revealGalaxyMemory(starElement, index);
}

function drawGalaxyLine(star1, star2) {
    const svg = document.getElementById("galaxy-lines-svg");
    const container = document.querySelector("#scene-13\\.5 .galaxy-container") || document.querySelector(".galaxy-container");

    if (!svg || !container || !star1 || !star2) return;

    const rect1 = star1.getBoundingClientRect();
    const rect2 = star2.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - parentRect.left;
    const y1 = rect1.top + rect1.height / 2 - parentRect.top;
    const x2 = rect2.left + rect2.width / 2 - parentRect.left;
    const y2 = rect2.top + rect2.height / 2 - parentRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#ffd700");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-opacity", "0.8");
    line.setAttribute("stroke-dasharray", "4");

    svg.appendChild(line);
}

function connectAllGalaxyStars() {
    const stars = Array.from(document.querySelectorAll("#scene-13\\.5 .star"));
    if (stars.length < 2) return;

    const svg = document.getElementById("galaxy-lines-svg");
    if (!svg) return;

    svg.innerHTML = "";

    for (let i = 0; i < stars.length - 1; i++) {
        drawGalaxyLine(stars[i], stars[i + 1]);
    }

    const display = document.getElementById("galaxy-memory-display");
    if (display) {
        display.style.opacity = "0";

        setTimeout(() => {
            display.innerHTML = "<b>Mohsintariq</b> ❤️ <b>Muzammil Tanoli</b><br><small>One constellation. Countless memories.</small>";
            display.style.opacity = "1";
        }, 500);
    }
}


// ======================================================
// 18. SECRET LETTER (SCENE 14)
// ======================================================
const letterText = `Dear Muzammil,

If you're reading this, then congratulations… you have successfully unlocked a small world that I created just for you.

Every screen, every animation, every flower, and every little detail in this gift carries a small piece of my heart.

When we first became friends, I never imagined that one day our friendship would become such an important part of my life.

I never knew that an ordinary beginning could turn into something so beautiful.

The laughs, the random conversations, the silly moments, the serious talks, and all those little memories mean something to me.

Sometimes the heart has so much to say that words simply don't feel enough.

That's why I created this little journey for you.

You are genuinely important to me. ❤️

Thank you for every laugh we shared.
Thank you for every memory we created.
Thank you for every conversation.
Thank you for being someone whose friendship I can genuinely be grateful for.

If someday you wonder how much this friendship means to me, remember this little surprise.

I didn't create all of this because I had to.
I created it because you matter enough to me that I wanted to turn my feelings into something you could actually see, read, and remember.

Muzammil, you are not just a name in my memories.
You are a part of my journey.
A part of my happiest memories.
And a part of the person I have become.

Thank you for being my friend.
Thank you for being my brother.
And most importantly, thank you for simply being you. ❤️

May our friendship always remain filled with trust, respect, laughter, understanding, and countless beautiful memories.

This isn't the end of our story.

It's just another beautiful chapter in a friendship that still has so many pages left to write.

With endless respect, love, and brotherhood,

Your Brother,
Mohsintariq ❤️

Happy One Year of Brotherhood, Muzammil Tanoli. 🤝❤️`;

function startTypewriterLetter() {
    const element = document.getElementById("secret-typewriter-letter");
    if (!element) return;

    element.innerHTML = "";

    const button = document.getElementById("letter-next-btn");
    if (button) button.classList.add("hidden");

    let index = 0;

    function type() {
        const scene14 = document.getElementById("scene-14");
        if (!scene14 || !scene14.classList.contains("active")) return;

        if (index < letterText.length) {
            const char = letterText.charAt(index);
            element.innerHTML += (char === "\n") ? "<br>" : char;
            index++;
            element.scrollTop = element.scrollHeight;
            setTimeout(type, 25);
        } else {
            if (button) button.classList.remove("hidden");
        }
    }

    type();
}


// ==========================================
// 19. SILENT REFLECTION (SCENE 14b) - ISSUE 4 FIXED
// ==========================================
function startSilentReflection() {
    const scene = document.getElementById("scene-14b");
    if (!scene) return;

    // Find or target Next button inside scene 14b
    let nextBtn = scene.querySelector("button, .btn-glow, #reflection-next-btn");

    if (nextBtn) {
        nextBtn.classList.add("hidden");
        nextBtn.style.display = "none";
    }

    // Timer strictly set to 12 seconds
    setTimeout(() => {
        if (scene && scene.classList.contains("active")) {
            if (nextBtn) {
                nextBtn.classList.remove("hidden");
                nextBtn.style.display = "inline-block";
                nextBtn.style.opacity = "0";
                nextBtn.style.transition = "opacity 1s ease";
                setTimeout(() => { nextBtn.style.opacity = "1"; }, 50);
            } else {
                nextScene();
            }
        }
    }, 12000);
}


// ==========================================
// 20. GALAXY BACKGROUND
// ==========================================
function startGalaxyBackground(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];

    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }

    function render() {
        const scene = canvas.closest(".scene");
        if (scene && !scene.classList.contains("active")) {
            galaxyAnimationId = null;
            return;
        }

        ctx.fillStyle = "rgba(5,5,12,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.alpha += star.speed;

            if (star.alpha > 1 || star.alpha < 0) {
                star.speed = -star.speed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${Math.abs(star.alpha)})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#ffd700";
            ctx.fill();
        });

        galaxyAnimationId = requestAnimationFrame(render);
    }

    render();
}


// ==========================================
// 21. GRAND FIREWORKS (SCENE 16)
// ==========================================
function triggerFireworks() {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff0055", "#ffd700", "#00e5ff", "#ff9900", "#b026ff", "#00ff66", "#ffffff"];
    let particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.008;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function createExplosion() {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    let frame = 0;

    function loop() {
        const scene = document.getElementById("scene-16");
        if (!scene || !scene.classList.contains("active")) {
            fireworksAnimationId = null;
            return;
        }

        ctx.fillStyle = "rgba(5,5,8,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (frame % 20 === 0) {
            createExplosion();
        }

        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.alpha > 0;
        });

        frame++;
        fireworksAnimationId = requestAnimationFrame(loop);
    }

    loop();
}


// ==========================================
// 22. WISHES WALL FIREWORKS (SCENE 18)
// ==========================================
function startWishesFireworks() {
    const canvas = document.getElementById("wishes-fireworks-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ffd700", "#ff0055", "#00e5ff", "#ffaa00", "#ffffff", "#00ff66"];
    let particles = [];

    function createExplosion() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;

            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color
            });
        }
    }

    function render() {
        const scene = document.getElementById("scene-18");
        if (!scene || !scene.classList.contains("active")) return;

        ctx.fillStyle = "rgba(5,5,8,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.015;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            return p.alpha > 0;
        });

        ctx.globalAlpha = 1;
        fireworksAnimationId = requestAnimationFrame(render);
    }

    const interval = setInterval(() => {
        const scene = document.getElementById("scene-18");
        if (scene && scene.classList.contains("active")) {
            createExplosion();
        } else {
            clearInterval(interval);
        }
    }, 500);

    render();
}


// ======================================================
// 23. FINAL ENDING SEQUENCE (SCENE 19) - ISSUE 3 FIXED
// ======================================================
const finalMsgText = `Some friendships are not measured by days, months, or years…

They are measured by the happiness they bring, the memories they create, and the peace they leave in our hearts.

This journey was never just about celebrating one year.

It was about celebrating every smile, every laugh, and every moment that made our brotherhood stronger.

Thank you, Muzammil, for being one of the most precious parts of my life. ❤️`;

function startFinalEndingSequence() {
    stopBackgroundAnimations();

    const element = document.getElementById("final-cinematic-text");
    const signature = document.getElementById("final-signature");

    if (!element) return;

    if (signature) signature.classList.add("hidden");

    element.innerHTML = "";
    element.style.display = "block";
    element.style.opacity = "1";

    let index = 0;

    function typeFinal() {
        if (index < finalMsgText.length) {
            const char = finalMsgText.charAt(index);
            element.innerHTML += (char === "\n") ? "<br>" : char;
            index++;
            setTimeout(typeFinal, 35);
        } else {
            setTimeout(() => {
                element.style.transition = "opacity 1s ease";
                element.style.opacity = "0";

                setTimeout(() => {
                    element.style.display = "none";
                    startWaitOneLastThing();
                }, 1000);

            }, 2000);
        }
    }

    typeFinal();
}

function startWaitOneLastThing() {
    const signature = document.getElementById("final-signature");
    if (!signature) return;

    signature.classList.remove("hidden");
    // Issue 3 Fixed: Added heart-touching emotional lines above the signature
    signature.innerHTML = `
        <div class="final-wait-message">
            <div class="emotional-quote-top" style="margin-bottom: 25px; font-style: italic; color: #ffd700; font-size: 1.1rem; line-height: 1.6; text-shadow: 0 0 8px rgba(255,215,0,0.5);">
                "In the story of my life, your name is written in the brightest ink.<br>
                Some friendships don't need time — they create time." ❤️
            </div>
            <div class="wait-line">THE END</div>
            <div class="wait-one" style="opacity:0;">Wait…</div>
            <div class="wait-last" style="opacity:0;">One last thing.</div>
            <div class="wait-story" style="opacity:0;">
                This wasn't the end of our story.<br><br>
                It was only another beautiful chapter.
            </div>
            <div class="wait-names" style="opacity:0;">
                <b>Mohsintariq</b> ❤️ <b>Muzammil Tanoli</b>
            </div>
        </div>
    `;

    signature.style.opacity = "1";

    const waitLine = signature.querySelector(".wait-line");
    const waitOne = signature.querySelector(".wait-one");
    const waitLast = signature.querySelector(".wait-last");
    const waitStory = signature.querySelector(".wait-story");
    const waitNames = signature.querySelector(".wait-names");

    if (waitLine) {
        waitLine.style.transition = "opacity 1s ease";
        waitLine.style.opacity = "1";
    }

    setTimeout(() => {
        if (waitLine) waitLine.style.opacity = "0";
        setTimeout(() => {
            if (waitOne) {
                waitOne.style.transition = "opacity 1.2s ease";
                waitOne.style.opacity = "1";
            }
        }, 500);
    }, 2500);

    setTimeout(() => {
        if (waitOne) waitOne.style.opacity = "0";
        setTimeout(() => {
            if (waitLast) {
                waitLast.style.transition = "opacity 1.2s ease";
                waitLast.style.opacity = "1";
            }
        }, 500);
    }, 5000);

    setTimeout(() => {
        if (waitLast) waitLast.style.opacity = "0";
        setTimeout(() => {
            if (waitStory) {
                waitStory.style.transition = "opacity 1.5s ease";
                waitStory.style.opacity = "1";
            }
        }, 500);
    }, 7500);

    setTimeout(() => {
        if (waitStory) waitStory.style.opacity = "0";
        setTimeout(() => {
            if (waitNames) {
                waitNames.style.transition = "opacity 1.5s ease";
                waitNames.style.opacity = "1";
                waitNames.style.textShadow = "0 0 10px #ffd700, 0 0 25px #ffd700";
            }
        }, 500);
    }, 10500);

    setTimeout(() => {
        const fade = document.getElementById("black-fade-overlay");
        if (fade) fade.style.opacity = "1";
    }, 14500);
}


// ==========================================
// 24. EASTER EGG CLICK COUNTER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("secret-easter-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", event => {
        event.stopPropagation();
        easterClickCount++;

        if (easterClickCount >= 5) {
            triggerEasterEggPopup();
            easterClickCount = 0;
        }
    });
});


// ==========================================
// 25. RESTART JOURNEY
// ==========================================
function restartJourney() {
    stopBackgroundAnimations();

    currentScene = 1;
    currentQuestionIdx = 0;

    galaxyStarsClicked = 0;
    clickedStarIndexHistory = [];

    document.body.style.opacity = "1";
    document.querySelectorAll(".scene").forEach(scene => scene.classList.remove("active"));

    const firstScene = document.getElementById("scene-1");
    if (firstScene) {
        firstScene.classList.add("active");
    }

    startScene1Animation();
}


// ==========================================
// 26. WINDOW RESIZE HANDLER
// ==========================================
window.addEventListener("resize", () => {
    const canvases = [
        "canvas-scene-1",
        "heart-canvas",
        "galaxy-canvas-14b",
        "galaxy-canvas-15",
        "fireworks-canvas",
        "wishes-fireworks-canvas",
        "ending-stars-canvas",
        "letter-fireworks-canvas"
    ];

    canvases.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

    if (galaxyStarsClicked >= 2) {
        const svg = document.getElementById("galaxy-lines-svg");
        if (svg) {
            svg.innerHTML = "";
            const stars = clickedStarIndexHistory
                .map(index => document.querySelector(`.star[data-index="${index}"]`))
                .filter(Boolean);

            for (let i = 0; i < stars.length - 1; i++) {
                drawGalaxyLine(stars[i], stars[i + 1]);
            }
        }
    }
});


// ==========================================
// INITIALIZATION ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const firstScene = document.getElementById("scene-1");
    if (firstScene) {
        firstScene.classList.add("active");
    }
});
