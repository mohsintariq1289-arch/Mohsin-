// ==========================================
// GLOBAL STATE & VARIABLES
// ==========================================
let currentScene = 1;
const totalScenes = 20;
let isMusicPlaying = false;
let galaxyAnimationId = null;
let fireworksAnimationId = null;

// ==========================================
// 1. CLOCK FUNCTION
// ==========================================
function updateClock() {
    const clockElem = document.getElementById('clock');
    if (clockElem) {
        const now = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        clockElem.innerText = now.toLocaleDateString('en-GB', options);
    }
}
setInterval(updateClock, 1000);
updateClock();

// ==========================================
// 2. MUSIC TOGGLE
// ==========================================
function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle-btn');
    if (!bgMusic) return;

    if (isMusicPlaying) {
        bgMusic.pause();
        if (btn) btn.innerText = '🎵 Play Music';
        isMusicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            if (btn) btn.innerText = '⏸ Pause Music';
            isMusicPlaying = true;
        }).catch((err) => {
            console.log("Audio play error:", err);
        });
    }
}

// ==========================================
// 3. PRELOADER LOGIC
// ==========================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
            startScene1Animation();
        }, 800);
    }
}

if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 1500);
} else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 1500));
    setTimeout(hidePreloader, 2500);
}

// ==========================================
// 4. NAVIGATION SYSTEM
// ==========================================
function nextScene() {
    if (galaxyAnimationId) { cancelAnimationFrame(galaxyAnimationId); galaxyAnimationId = null; }
    if (fireworksAnimationId) { cancelAnimationFrame(fireworksAnimationId); fireworksAnimationId = null; }

    const currentElem = document.getElementById(`scene-${currentScene}`);
    if (currentElem) currentElem.classList.remove('active');

    if (currentScene === 14) {
        currentScene = '14b';
    } else if (currentScene === '14b') {
        currentScene = 15;
    } else {
        currentScene++;
    }

    const nextElem = document.getElementById(`scene-${currentScene}`);
    if (nextElem) {
        nextElem.classList.add('active');
        initSceneLogic(currentScene);
    }
}

function initSceneLogic(sceneId) {
    if (sceneId === 3) initBalloonGame();
    if (sceneId === 9) loadQuizQuestion();
    if (sceneId === 14) startTypewriterLetter();
    if (sceneId === '14b') { startSilentReflection(); startGalaxyBackground('galaxy-canvas-14b'); }
    if (sceneId === 15) { startGalaxyBackground('galaxy-canvas-15'); }
    if (sceneId === 16) triggerFireworks();
    if (sceneId === 18) startWishesFireworks();
    if (sceneId === 19) { startFinalEndingSequence(); }
}

// ==========================================
// 5. SCENE 1: CINEMATIC QUOTES
// ==========================================
function startScene1Animation() {
    const q1 = document.getElementById('quote-1');
    const q2 = document.getElementById('quote-2');

    if (!q1 || !q2) return;

    q1.classList.remove('hidden');
    setTimeout(() => {
        q1.classList.add('hidden');
        setTimeout(() => {
            q2.classList.remove('hidden');
            setTimeout(() => {
                q2.classList.add('hidden');
                setTimeout(nextScene, 1000);
            }, 4000);
        }, 1000);
    }, 4000);
}

// ==========================================
// 6. SCENE 3: BALLOON GAME
// ==========================================
const balloonWords = ["Trust", "Brotherhood", "Respect", "Loyalty", "Kindness", "Support", "Care", "Memories", "Smile", "Family"];
let poppedCount = 0;

function initBalloonGame() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    container.innerHTML = '';
    poppedCount = 0;
    const popElem = document.getElementById('pop-count');
    const revealedList = document.getElementById('revealed-words-list');
    if (popElem) popElem.innerText = 0;
    if (revealedList) revealedList.innerHTML = '';

    balloonWords.forEach((word, idx) => {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = `${10 + (idx * 8)}%`;
        b.style.animationDelay = `${Math.random() * 2}s`;
        b.onclick = () => popBalloon(b, word);
        container.appendChild(b);
    });
}

function popBalloon(elem, word) {
    elem.remove();
    poppedCount++;
    const popElem = document.getElementById('pop-count');
    if (popElem) popElem.innerText = poppedCount;

    const badge = document.createElement('span');
    badge.className = 'word-badge';
    badge.innerText = word;
    const list = document.getElementById('revealed-words-list');
    if (list) list.appendChild(badge);

    if (poppedCount >= balloonWords.length) {
        const nextBtn = document.getElementById('balloon-next-btn');
        if (nextBtn) nextBtn.classList.remove('hidden');
    }
}

// ==========================================
// 7. SCENE 4: HEART EXPLOSION
// ==========================================
function explodeHeart() {
    nextScene();
}

// ==========================================
// 8. SCENE 7: PASSCODE LOGIC
// ==========================================
function verifySecretPin() {
    const pinInput = document.getElementById('pin-input');
    if (!pinInput) return;
    
    const pin = pinInput.value.trim();
    if (pin === "160926" || pin === "2026" || pin === "16" || pin === "786") {
        triggerEasterEggPopup();
    } else {
        const err = document.getElementById('pin-error-text');
        if (err) err.classList.remove('hidden');
    }
}

function triggerEasterEggPopup() {
    const modal = document.getElementById('easter-modal');
    if (modal) {
        modal.innerHTML = `
            <div class="glass-card text-center">
                <h2>🎉 Wow! We found Easter Egg!</h2>
                <p class="mt-15">You unlocked the secret point! 🌟 (+100 Brotherhood Points)</p>
                <button class="btn-glow mt-20" onclick="closeEasterModalAndContinue()">Continue ➡️</button>
            </div>
        `;
        modal.classList.remove('hidden');
    } else {
        nextScene();
    }
}

function closeEasterModalAndContinue() {
    const modal = document.getElementById('easter-modal');
    if (modal) modal.classList.add('hidden');
    nextScene();
}

// ==========================================
// 9. SCENE 8: MAGIC CARD FLIP
// ==========================================
function flipMagicCard() {
    const card = document.getElementById('magic-card');
    if (card) card.classList.toggle('flipped');
}

// ==========================================
// 10. SCENE 9: QUESTION SYSTEM
// ==========================================
const customQuestions = [
    "Q1. What is the most memorable moment of our friendship?",
    "Q2. What is the best quality you have seen in me till today?",
    "Q3. What is the funniest memory you have of us?",
    "Q4. What is one thing you want me to improve in the coming year?"
];

let currentQuestionIdx = 0;
const userAnswers = {};

function loadQuizQuestion() {
    const body = document.getElementById('quiz-body');
    if (!body) return;

    if (currentQuestionIdx >= customQuestions.length) {
        body.innerHTML = `
            <div class="gold-subtitle text-center">🔒 All Answers Locked!</div>
            <p class="mt-15 text-center">Thank you for sharing these precious memories.</p>
            <div class="text-center">
                <button class="btn-glow mt-15" onclick="nextScene()">Next ➡️</button>
            </div>
        `;
        return;
    }

    const qText = customQuestions[currentQuestionIdx];
    
    body.innerHTML = `
        <div id="question-card" class="question-container">
            <p class="question-title"><strong>${qText}</strong></p>
            <div class="input-lock-wrapper mt-15">
                <textarea id="answer-input" rows="3" placeholder="Write your answer here..." class="custom-textarea"></textarea>
                <button id="lock-btn" class="btn-glow mt-15" onclick="submitAndLockAnswer()">🔒 Lock Answer & Next</button>
            </div>
        </div>
    `;
}

function submitAndLockAnswer() {
    const inputElem = document.getElementById('answer-input');
    const qCard = document.getElementById('question-card');
    
    if (!inputElem || !inputElem.value.trim()) {
        alert("Please write an answer before locking! ❤️");
        return;
    }

    userAnswers[`Q${currentQuestionIdx + 1}`] = inputElem.value.trim();

    if (qCard) {
        qCard.style.transition = "all 0.5s ease";
        qCard.style.opacity = "0";
        qCard.style.transform = "translateY(-20px)";
    }

    setTimeout(() => {
        currentQuestionIdx++;
        loadQuizQuestion();
    }, 500);
}

// ==========================================
// 11. AUTO-RESET CARD FLIP SYSTEM FOR SCENE 10
// ==========================================
function handleCardFlip(selectedCard) {
    const allCards = document.querySelectorAll('#scene-10 .flip-card');
    const isAlreadyFlipped = selectedCard.classList.contains('flipped');
    
    allCards.forEach(card => {
        card.classList.remove('flipped');
    });
    
    if (!isAlreadyFlipped) {
        selectedCard.classList.add('flipped');
    }
}

// ==========================================
// 12. SCENE 11: OATH
// ==========================================
function acceptOath() {
    const btn = document.getElementById('oath-btn');
    const status = document.getElementById('oath-status');
    if (btn) btn.classList.add('hidden');
    if (status) status.classList.remove('hidden');
    setTimeout(nextScene, 1500);
}

// ==========================================
// 13. SCENE 12: GALLERY FLIP
// ==========================================
function flipGalleryCard(elem) {
    if (elem) elem.classList.toggle('flipped');
}

// ==========================================
// 14. SCENE 13: VIDEO CONTROLS
// ==========================================
function handleVideoPlay() {
    const bgMusic = document.getElementById('bg-music');
    if (isMusicPlaying && bgMusic) bgMusic.volume = 0.2;
}

function handleVideoEnd() {
    const bgMusic = document.getElementById('bg-music');
    if (isMusicPlaying && bgMusic) bgMusic.volume = 1.0;
}

// ==========================================
// 15. SCENE 14: TYPEWRITER LETTER
// ==========================================
const letterText = `Dear Muzammil,

If you're reading this, then congratulations… you have successfully unlocked a small world that I created just for you. Every screen, every animation, every flower, and every little detail in this gift carries a small piece of my heart.

When we first became friends, I never imagined that one day our friendship would become such an important part of my life. I never knew that an ordinary beginning could turn into something so beautiful, something that would give me so many memories, smiles, laughs, conversations, and moments that I would always want to keep close to my heart.

Our friendship isn't just about the conversations we've had or the memories we've created. It's about the comfort of knowing that there is someone whose presence makes life feel a little more complete. There are moments when I realize that if you weren't a part of my life, something would genuinely feel incomplete.

You have been a part of so many ordinary moments that somehow became extraordinary just because we shared them together. The laughs, the random conversations, the silly moments, the serious talks, the little memories that might seem small to someone else—all of them mean something to me.

And honestly, there are some feelings that are difficult to say face to face. Sometimes the heart has so much to say that words simply don't feel enough. That's why I created this little journey for you. Every flower, every card, every animation and every message is my way of saying something that I might not always be able to say aloud:

You are genuinely important to me. ❤️

Thank you for every laugh we shared, every memory we created, every conversation, and every moment that became a part of our story. Thank you for being someone whose friendship I can look back on and feel genuinely grateful for.

If someday you ever wonder how much this friendship means to me, just remember this little surprise. I didn't create all of this because I had to. I created it because you matter enough to me that I wanted to turn my feelings into something you could actually see, read, and remember.

And maybe years from now, when we look back at these days, we won't remember every conversation or every little detail. But I hope we'll remember the feeling—the happiness, the laughter, and the beautiful bond we shared.

Muzammil, you are not just a name in my memories. You are a part of my journey, a part of my happiest memories, and a part of the person I have become.

Thank you for being my friend.
Thank you for being my brother.
And most importantly, thank you for simply being you. ❤️

May our friendship always remain filled with trust, respect, laughter, understanding, and countless beautiful memories.

This isn't the end of our story.
It's just another beautiful chapter in a friendship that still has so many pages left to write.

With endless respect, love, and brotherhood,
Your Brother,
Mohsin Tariq ❤️

Happy One Year of Brotherhood, Muzammil. 🤝❤️`;

function startTypewriterLetter() {
    const elem = document.getElementById('secret-typewriter-letter');
    if (!elem) return;
    elem.innerHTML = '';
    let i = 0;

    function type() {
        if (i < letterText.length) {
            const char = letterText.charAt(i);
            elem.innerHTML += char === '\n' ? '<br>' : char;
            i++;
            elem.scrollTop = elem.scrollHeight;
            setTimeout(type, 30);
        } else {
            const nextBtn = document.getElementById('letter-next-btn');
            if (nextBtn) {
                nextBtn.classList.remove('hidden');
            } else {
                setTimeout(nextScene, 4000);
            }
        }
    }
    type();
}

// ==========================================
// 16. SCENE 14B: SILENT REFLECTION
// ==========================================
function startSilentReflection() {
    setTimeout(() => {
        nextScene();
    }, 6000);
}

// ==========================================
// 17. SCENE 15: OPEN GIFT BOX
// ==========================================
function openGiftBox() {
    const box = document.getElementById('gift-box');
    if (box) box.style.transform = 'scale(1.3) rotate(10deg)';
    setTimeout(nextScene, 1000);
}

// ==========================================
// 18. MILKY WAY & TWINKLING GALAXY BG
// ==========================================
function startGalaxyBackground(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 180;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }

    function renderGalaxy() {
        ctx.fillStyle = 'rgba(5, 5, 12, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffd700';
            ctx.fill();
        });

        galaxyAnimationId = requestAnimationFrame(renderGalaxy);
    }
    renderGalaxy();
}

// ==========================================
// 19. HIGH-QUALITY 7-COLOR FIREWORKS
// ==========================================
function triggerFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        '#ff0055', '#ffd700', '#00e5ff', '#ff9900', '#b026ff', '#00ff66', '#ffffff'
    ];

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

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
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

    let frameCount = 0;
    function loop() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (frameCount % 20 === 0) {
            createExplosion();
        }

        particles.forEach((p, index) => {
            if (p.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                p.update();
                p.draw();
            }
        });

        frameCount++;
        fireworksAnimationId = requestAnimationFrame(loop);
    }

    loop();
}
// ==========================================
// 20. CINEMATIC FINAL SCENE SEQUENCE
// ==========================================
const finalMsgText = "Some friendships are not measured by days, months, or years… They are measured by the happiness they bring, the memories they create, and the peace they leave in our hearts.\n\nThis journey was never just about celebrating one year. It was about celebrating every smile, every laugh, and every moment that made our brotherhood stronger.\n\nThank you, Muzammil, for being one of the most precious parts of my life. ❤️";

function startFinalEndingSequence() {
    if (galaxyAnimationId) { 
        cancelAnimationFrame(galaxyAnimationId); 
        galaxyAnimationId = null; 
    }

    const elem = document.getElementById('final-cinematic-text');
    const sig = document.getElementById('final-signature');

    if (!elem) return;
    if (sig) sig.classList.add('hidden');
    
    elem.innerHTML = '';
    elem.style.display = "block";
    elem.style.opacity = "1";
    let i = 0;

    function typeFinal() {
        if (i < finalMsgText.length) {
            elem.innerHTML += finalMsgText.charAt(i) === '\n' ? '<br>' : finalMsgText.charAt(i);
            i++;
            setTimeout(typeFinal, 35);
        } else {
            setTimeout(() => {
                elem.style.transition = "opacity 0.8s ease";
                elem.style.opacity = "0";

                setTimeout(() => {
                    elem.style.display = "none";
                    
                    if (sig) {
                        sig.innerHTML = `
                            <div class="glass-card text-center" style="border-color: var(--border-gold);">
                                <p style="font-size: 0.95rem; color: #ffffff; line-height: 1.6;">
                                    Thank you for being one of the most valuable parts of my life.<br>
                                    This journey became beautiful because you were a part of it.
                                </p>
                                <h3 style="color: var(--gold-primary); font-size: 1.3rem; margin: 15px 0 5px 0;">
                                    Mohsin Tariq ❤️ Muzammil Tanoli
                                </h3>
                                <p style="font-size: 0.8rem; color: var(--gold-primary); letter-spacing: 1px;">
                                    One Heart • One Brotherhood • Countless Memories
                                </p>
                            </div>
                        `;
                        sig.style.opacity = "0";
                        sig.classList.remove('hidden');
                        
                        setTimeout(() => {
                            sig.style.transition = "opacity 1.2s ease";
                            sig.style.opacity = "1";

                            setTimeout(() => {
                                sig.style.transition = "opacity 1s ease";
                                sig.style.opacity = "0";

                                setTimeout(() => {
                                    sig.innerHTML = `
                                        <h1 class="the-end-title text-center" style="font-size: 2.8rem; color: var(--gold-primary); letter-spacing: 5px; text-shadow: 0 0 20px var(--gold-glow);">
                                            THE END
                                        </h1>
                                    `;
                                    sig.style.opacity = "1";

                                    setTimeout(() => {
                                        const appContainer = document.body;
                                        appContainer.style.transition = "opacity 3.5s ease";
                                        appContainer.style.opacity = "0";
                                    }, 3500);

                                }, 1000);
                            }, 5000);
                        }, 100);
                    }
                }, 1000);
            }, 2000);
        }
    }

    typeFinal();
}

function restartJourney() {
    currentScene = 1;
    currentQuestionIdx = 0;
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const s1 = document.getElementById('scene-1');
    if (s1) s1.classList.add('active');
    startScene1Animation();
}

// ==========================================
// 21. EASTER EGG POPUP LOGIC
// ==========================================
let easterClickCount = 0;
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('secret-easter-trigger');
    if (trigger) {
        trigger.addEventListener('click', () => {
            easterClickCount++;
            if (easterClickCount >= 5) {
                triggerEasterEggPopup();
                easterClickCount = 0;
            }
        });
    }
});

function closeEasterModal() {
    const modal = document.getElementById('easter-modal');
    if (modal) modal.classList.add('hidden');
}

// ==========================================
// 22. SCENE 18: WISHES WALL FIREWORKS
// ==========================================
function startWishesFireworks() {
    const canvas = document.getElementById('wishes-fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    const colors = ['#ffd700', '#ff0055', '#00e5ff', '#ffaa00', '#ffffff', '#00ff66'];

    function createExplosion() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.5);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: color
            });
        }
    }

    const fireInterval = setInterval(() => {
        const scene18 = document.getElementById('scene-18');
        if (scene18 && scene18.classList.contains('active')) {
            createExplosion();
        } else {
            clearInterval(fireInterval);
        }
    }, 500);

    function render() {
        const scene18 = document.getElementById('scene-18');
        if (!scene18 || !scene18.classList.contains('active')) return;

        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.015;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(render);
    }

    render();
}