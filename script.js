// ============================================================
// MOHSIN ❤️ MUZAMMIL — FINAL JOURNEY ENGINE
// ============================================================

let currentScene = 1;
const sceneSequence = [1,2,3,4,20,5,6,7,8,9,10,11,12,21,13,14,"14b",15,16,17,18,19];
let isMusicPlaying = false;
let galaxyAnimationId = null;
let fireworksAnimationId = null;
let statsTimer = null;
let finalStarted = false;

// CLOCK
function updateClock(){
    const el=document.getElementById("clock");
    if(el){
        const now=new Date();
        el.textContent=now.toLocaleString("en-GB",{
            day:"2-digit",month:"short",year:"numeric",
            hour:"2-digit",minute:"2-digit",second:"2-digit"
        });
    }
}
setInterval(updateClock,1000); updateClock();

// MUSIC
function toggleMusic(){
    const audio=document.getElementById("bg-music"),btn=document.getElementById("music-toggle-btn");
    if(!audio)return;
    if(isMusicPlaying){
        audio.pause(); isMusicPlaying=false;
        if(btn)btn.textContent="🎵 Play Music";
    }else{
        audio.play().then(()=>{
            isMusicPlaying=true;
            if(btn)btn.textContent="⏸ Pause Music";
        }).catch(()=>alert("Tap the music button again to start the music."));
    }
}

// PRELOADER
function hidePreloader(){
    const p=document.getElementById("preloader");
    if(!p)return;
    p.style.opacity="0";p.style.visibility="hidden";
    setTimeout(()=>{p.style.display="none";startScene1Animation()},800);
}
window.addEventListener("load",()=>setTimeout(hidePreloader,1200));
setTimeout(hidePreloader,3000);

// NAVIGATION — explicit sequence prevents scene numbering bugs
function nextScene(){
    stopBackgroundAnimations();
    const index=sceneSequence.indexOf(currentScene);
    if(index<0 || index>=sceneSequence.length-1)return;
    const old=document.getElementById(`scene-${currentScene}`);
    if(old)old.classList.remove("active");
    currentScene=sceneSequence[index+1];
    const next=document.getElementById(`scene-${currentScene}`);
    if(next){
        next.classList.add("active");
        initSceneLogic(currentScene);
    }
}
function stopBackgroundAnimations(){
    if(galaxyAnimationId){cancelAnimationFrame(galaxyAnimationId);galaxyAnimationId=null}
    if(fireworksAnimationId){cancelAnimationFrame(fireworksAnimationId);fireworksAnimationId=null}
}
function initSceneLogic(id){
    if(id===3)initBalloonGame();
    if(id===20)start365Days();
    if(id===9)loadQuizQuestion();
    if(id===21)startMemoryGalaxy();
    if(id===14)startTypewriterLetter();
    if(id==="14b"){startSilentReflection();startGalaxyBackground("galaxy-canvas-14b")}
    if(id===15)startGalaxyBackground("galaxy-canvas-15");
    if(id===16)triggerFireworks();
    if(id===18)startWishesFireworks();
    if(id===19)startFinalEndingSequence();
}

// SCENE 1
function startScene1Animation(){
    const q1=document.getElementById("quote-1"),q2=document.getElementById("quote-2");
    if(!q1||!q2)return;
    q1.classList.remove("hidden");
    setTimeout(()=>{
        q1.classList.add("hidden");
        setTimeout(()=>{
            q2.classList.remove("hidden");
            setTimeout(()=>{
                q2.classList.add("hidden");
                setTimeout(nextScene,900);
            },4000);
        },900);
    },4000);
}

// BALLOONS
const balloonWords=["Trust","Brotherhood","Respect","Loyalty","Kindness","Support","Care","Memories","Smile","Family"];
let poppedCount=0;
function initBalloonGame(){
    const c=document.getElementById("balloon-container"); if(!c)return;
    c.innerHTML="";poppedCount=0;
    document.getElementById("pop-count").textContent="0";
    document.getElementById("revealed-words-list").innerHTML="";
    balloonWords.forEach((word,i)=>{
        const b=document.createElement("div");b.className="balloon";
        b.style.left=`${5+i*9}%`;b.style.animationDelay=`${Math.random()*2}s`;
        b.onclick=()=>popBalloon(b,word);c.appendChild(b);
    });
}
function popBalloon(el,word){
    if(!el||!el.parentNode)return;
    el.remove();poppedCount++;
    document.getElementById("pop-count").textContent=poppedCount;
    const badge=document.createElement("span");badge.className="word-badge";badge.textContent=word;
    document.getElementById("revealed-words-list").appendChild(badge);
    if(poppedCount===balloonWords.length)document.getElementById("balloon-next-btn").classList.remove("hidden");
}

// EASTER EGGS
function triggerEasterEggPopup(){
    const modal=document.getElementById("easter-modal");
    if(!modal)return;
    modal.innerHTML=`<div class="glass-card text-center">
        <h2>🎉 Secret Unlocked!</h2>
        <p class="mt-15">You found a hidden piece of the journey. 🌟</p>
        <h3 class="gold-subtitle mt-15">+100 Brotherhood Points ❤️</h3>
        <button class="btn-glow mt-20" onclick="closeEasterModalAndContinue()">Continue ➡️</button>
    </div>`;
    modal.classList.remove("hidden");
}
function closeEasterModalAndContinue(){
    document.getElementById("easter-modal").classList.add("hidden");
    nextScene();
}
function verifySecretPin(){
    const input=document.getElementById("pin-input");if(!input)return;
    const ok=["160926","2026","16","786"].includes(input.value.trim());
    if(ok){
        document.getElementById("pin-error-text").classList.add("hidden");
        triggerEasterEggPopup();
    }else document.getElementById("pin-error-text").classList.remove("hidden");
}

// MAGIC CARD
function flipMagicCard(){document.getElementById("magic-card")?.classList.toggle("flipped")}

// HEART
function explodeHeart(){nextScene()}

// ============================================================
// NEW FEATURE 1 — 365 DAYS
// ============================================================
function start365Days(){
    clearTimeout(statsTimer);
    const holder=document.getElementById("year-stats"),caption=document.getElementById("stats-caption"),heart=document.getElementById("stats-heart");
    if(!holder)return;
    holder.innerHTML="";
    caption.classList.remove("show");heart.classList.add("hidden");
    const stats=[
        ["365","DAYS"],
        ["8,760","HOURS"],
        ["525,600","MINUTES"],
        ["31,536,000+","SECONDS"]
    ];
    let i=0;
    function showNext(){
        if(i>=stats.length){
            caption.classList.add("show");
            statsTimer=setTimeout(()=>{
                holder.style.transition="1.2s";holder.style.opacity="0";
                caption.style.opacity="0";
                setTimeout(()=>{
                    holder.innerHTML="";
                    holder.style.opacity="1";
                    heart.classList.remove("hidden");
                    statsTimer=setTimeout(nextScene,3000);
                },1200);
            },3000);
            return;
        }
        const [num,label]=stats[i++];
        holder.innerHTML=`<div class="stat-line active-stat">${num} <span>${label}</span></div>`;
        statsTimer=setTimeout(()=>{
            const line=holder.querySelector(".stat-line");
            if(line)line.classList.remove("active-stat");
            setTimeout(showNext,500);
        },2100);
    }
    showNext();
}

// QUIZ + SPECIAL HEART QUESTION
const customQuestions=[
    "Q1. What is the most memorable moment of our friendship?",
    "Q2. What is the best quality you have seen in me till today?",
    "Q3. What is the funniest memory you have of us?",
    "Q4. What is one thing you want me to improve in the coming year?"
];
let currentQuestionIdx=0;
const userAnswers={};
let heartQuestionShown=false;

function loadQuizQuestion(){
    const body=document.getElementById("quiz-body");if(!body)return;
    if(currentQuestionIdx<customQuestions.length){
        const q=customQuestions[currentQuestionIdx];
        body.innerHTML=`<div id="question-card" class="question-container">
            <p class="question-title"><strong>${q}</strong></p>
            <textarea id="answer-input" rows="3" placeholder="Write your answer here..." class="custom-textarea mt-15"></textarea>
            <button class="btn-glow mt-15" onclick="submitAndLockAnswer()">🔒 Lock Answer & Next</button>
        </div>`;
        return;
    }
    if(!heartQuestionShown){
        heartQuestionShown=true;
        body.innerHTML=`<div id="heart-question-card" class="question-container">
            <p class="question-title"><strong>❤️ After everything we've shared… what does our friendship mean to you?</strong></p>
            <p class="hint">This one is different. Write whatever your heart wants to say.</p>
            <textarea id="heart-answer-input" rows="5" placeholder="Write From Your Heart..." class="custom-textarea mt-15"></textarea>
            <button class="btn-glow mt-15" onclick="keepHeartMemory()">💌 Write From Your Heart</button>
        </div>`;
        return;
    }
    body.innerHTML=`<div class="gold-subtitle text-center">🔒 All Answers Locked!</div>
        <p class="mt-15 text-center">Your memories have been safely kept inside this journey. ❤️</p>
        <button class="btn-glow mt-15" onclick="nextScene()">Next ➡️</button>`;
}
function submitAndLockAnswer(){
    const input=document.getElementById("answer-input");
    if(!input||!input.value.trim()){alert("Please write an answer before locking! ❤️");return}
    userAnswers["Q"+(currentQuestionIdx+1)]=input.value.trim();
    const card=document.getElementById("question-card");
    card.style.opacity="0";card.style.transform="translateY(-20px)";
    setTimeout(()=>{currentQuestionIdx++;loadQuizQuestion()},500);
}
function keepHeartMemory(){
    const input=document.getElementById("heart-answer-input");
    if(!input||!input.value.trim()){alert("Write something from your heart first. ❤️");return}
    userAnswers.heart=input.value.trim();
    const body=document.getElementById("quiz-body");
    body.innerHTML=`<div class="heart-memory-saved">
        <div style="font-size:3rem">🔒❤️</div>
        <p class="mt-15">Some answers don't need to be shared…<br>they simply deserve to be remembered. ❤️</p>
        <button class="btn-glow mt-20" onclick="nextScene()">Continue Journey ➡️</button>
    </div>`;
}

// CARDS
function handleCardFlip(card){
    document.querySelectorAll("#scene-10 .flip-card").forEach(c=>c.classList.remove("flipped"));
    card.classList.add("flipped");
}
function acceptOath(){
    document.getElementById("oath-btn").classList.add("hidden");
    document.getElementById("oath-status").classList.remove("hidden");
    setTimeout(nextScene,1500);
}
function flipGalleryCard(el){el.classList.toggle("flipped")}

// VIDEO
function handleVideoPlay(){
    const a=document.getElementById("bg-music");if(isMusicPlaying&&a)a.volume=.2;
}
function handleVideoEnd(){
    const a=document.getElementById("bg-music");if(isMusicPlaying&&a)a.volume=1;
}

// ============================================================
// NEW FEATURE 2 — MEMORY GALAXY
// ============================================================
const galaxyMemories=[
    "That one conversation we still remember… ❤️",
    "That random moment that became a beautiful memory… ✨",
    "The laughs that made ordinary days special… 😂",
    "A simple message that somehow changed the whole day… 💬",
    "The moments when friendship felt like family… 🤝",
    "The memories we never planned but will never forget… 📸",
    "Every difficult day that became easier because we had each other… 🌙",
    "One beautiful year — and so many pages still waiting to be written… ❤️"
];
let galaxyFound=new Set(),galaxyStars=[],galaxyLines=[],galaxyCanvasAnimation=null;

function startMemoryGalaxy(){
    const scene=document.getElementById("scene-21"),canvas=document.getElementById("memory-galaxy-canvas");
    const memory=document.getElementById("galaxy-memory");
    const progress=document.getElementById("galaxy-progress");
    const next=document.getElementById("galaxy-next-btn");
    if(!canvas)return;
    galaxyFound=new Set();galaxyStars=[];galaxyLines=[];
    memory.classList.remove("show");memory.textContent="Tap a star ✨";next.classList.add("hidden");
    progress.textContent="Memories discovered: 0 / 8";
    canvas.width=innerWidth;canvas.height=innerHeight;
    const ctx=canvas.getContext("2d");
    const bgStars=Array.from({length:190},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+.3,a:Math.random()}));
    const positions=[
        [.15,.28],[.33,.18],[.58,.25],[.78,.18],
        [.22,.57],[.46,.68],[.72,.55],[.84,.72]
    ];
    positions.forEach((p,i)=>{
        const s=document.createElement("div");s.className="galaxy-star";
        s.style.left=`${p[0]*100}%`;s.style.top=`${p[1]*100}%`;
        const size=7+Math.random()*5;s.style.width=size+"px";s.style.height=size+"px";
        s.title="Tap to discover memory";
        s.onclick=()=>discoverGalaxyStar(i,s);
        scene.appendChild(s);galaxyStars.push(s);
    });
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bgStars.forEach(st=>{
            st.a+=.01*(Math.random()>.5?1:-1);st.a=Math.max(.15,Math.min(1,st.a));
            ctx.fillStyle=`rgba(255,255,255,${st.a})`;ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fill();
        });
        galaxyLines.forEach(l=>{
            ctx.strokeStyle="rgba(255,215,0,.5)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(l.x1,l.y1);ctx.lineTo(l.x2,l.y2);ctx.stroke();
        });
        galaxyCanvasAnimation=requestAnimationFrame(draw);
    }
    draw();
}
function discoverGalaxyStar(i,el){
    if(galaxyFound.has(i))return;
    galaxyFound.add(i);el.classList.add("found");
    const box=document.getElementById("galaxy-memory");
    box.textContent=galaxyMemories[i];box.classList.remove("show");
    setTimeout(()=>box.classList.add("show"),30);
    document.getElementById("galaxy-progress").textContent=`Memories discovered: ${galaxyFound.size} / 8`;
    if(galaxyFound.size===galaxyMemories.length){
        connectGalaxyStars();
        setTimeout(()=>{
            box.innerHTML=`<strong style="font-size:2rem">M ❤️ M</strong><br><small>One Heart • One Brotherhood</small>`;
            document.getElementById("galaxy-next-btn").classList.remove("hidden");
        },1200);
    }
}
function connectGalaxyStars(){
    const canvas=document.getElementById("memory-galaxy-canvas");
    if(!canvas)return;
    const rect=canvas.getBoundingClientRect();
    galaxyStars.forEach((s,i)=>{
        const a=s.getBoundingClientRect(),b=galaxyStars[(i+1)%galaxyStars.length].getBoundingClientRect();
        galaxyLines.push({
            x1:a.left+a.width/2-rect.left,y1:a.top+a.height/2-rect.top,
            x2:b.left+b.width/2-rect.left,y2:b.top+b.height/2-rect.top
        });
    });
}

// LETTER
const letterText=`Dear Muzammil,

If you're reading this, then congratulations… you have successfully unlocked a small world that I created just for you. Every screen, every animation, every flower, and every little detail in this gift carries a small piece of my heart.

When we first became friends, I never imagined that one day our friendship would become such an important part of my life. I never knew that an ordinary beginning could turn into something so beautiful, something that would give me so many memories, smiles, laughs, conversations, and moments that I would always want to keep close to my heart.

Our friendship isn't just about the conversations we've had or the memories we've created. It's about the comfort of knowing that there is someone whose presence makes life feel a little more complete.

You have been a part of so many ordinary moments that somehow became extraordinary just because we shared them together.

And honestly, there are some feelings that are difficult to say face to face. That's why I created this little journey for you.

You are genuinely important to me. ❤️

Thank you for every laugh we shared, every memory we created, every conversation, and every moment that became a part of our story.

If someday you ever wonder how much this friendship means to me, just remember this little surprise. I created it because you matter enough to me that I wanted to turn my feelings into something you could actually see, read, and remember.

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

function startTypewriterLetter(){
    const el=document.getElementById("secret-typewriter-letter");if(!el)return;
    el.innerHTML="";document.getElementById("letter-next-btn").classList.add("hidden");
    let i=0;
    function type(){
        if(i<letterText.length){
            el.innerHTML+=letterText[i]==="\n"?"<br>":letterText[i++];
            el.scrollTop=el.scrollHeight;setTimeout(type,25);
        }else document.getElementById("letter-next-btn").classList.remove("hidden");
    } type();
}
function startSilentReflection(){setTimeout(nextScene,6000)}
function openGiftBox(){
    const b=document.getElementById("gift-box");if(b)b.style.transform="scale(1.3) rotate(10deg)";
    setTimeout(nextScene,1000);
}

// GALAXY BACKGROUND
function startGalaxyBackground(id){
    const c=document.getElementById(id);if(!c)return;
    const ctx=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
    const stars=Array.from({length:180},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.5+.5,a:Math.random(),s:Math.random()*.02+.005}));
    function render(){
        ctx.fillStyle="rgba(5,5,12,.3)";ctx.fillRect(0,0,c.width,c.height);
        stars.forEach(s=>{s.a+=s.s;if(s.a>1||s.a<0)s.s=-s.s;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${Math.abs(s.a)})`;ctx.shadowBlur=8;ctx.shadowColor="#ffd700";ctx.fill()});
        galaxyAnimationId=requestAnimationFrame(render);
    }render();
}

// FIREWORKS
function triggerFireworks(){
    const c=document.getElementById("fireworks-canvas");if(!c)return;
    const ctx=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
    const colors=["#ff0055","#ffd700","#00e5ff","#ff9900","#b026ff","#00ff66","#ffffff"];
    let particles=[];
    class P{
        constructor(x,y,color){this.x=x;this.y=y;this.color=color;const a=Math.random()*Math.PI*2,s=Math.random()*6+2;this.vx=Math.cos(a)*s;this.vy=Math.sin(a)*s;this.alpha=1;this.decay=Math.random()*.015+.008}
        update(){this.x+=this.vx;this.y+=this.vy;this.vy+=.05;this.alpha-=this.decay}
        draw(){ctx.globalAlpha=this.alpha;ctx.fillStyle=this.color;ctx.beginPath();ctx.arc(this.x,this.y,2.5,0,Math.PI*2);ctx.shadowBlur=10;ctx.shadowColor=this.color;ctx.fill();ctx.globalAlpha=1}
    }
    let frame=0;
    function loop(){
        ctx.fillStyle="rgba(5,5,8,.2)";ctx.fillRect(0,0,c.width,c.height);
        if(frame%20===0){const x=Math.random()*c.width*.8+c.width*.1,y=Math.random()*c.height*.5+c.height*.1,col=colors[Math.floor(Math.random()*colors.length)];for(let i=0;i<50;i++)particles.push(new P(x,y,col))}
        particles=particles.filter(p=>{p.update();p.draw();return p.alpha>0});frame++;fireworksAnimationId=requestAnimationFrame(loop);
    }loop();
}

// WISHES FIREWORKS
function startWishesFireworks(){
    const c=document.getElementById("wishes-fireworks-canvas");if(!c)return;
    const ctx=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
    let particles=[];
    function boom(){const x=Math.random()*c.width,y=Math.random()*c.height*.5;for(let i=0;i<30;i++){const a=Math.random()*Math.PI*2,s=Math.random()*4+1;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,a:1})}}
    const interval=setInterval(()=>{if(document.getElementById("scene-18")?.classList.contains("active"))boom();else clearInterval(interval)},500);
    function render(){if(!document.getElementById("scene-18")?.classList.contains("active"))return;ctx.fillStyle="rgba(5,5,8,.2)";ctx.fillRect(0,0,c.width,c.height);particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.a-=.015;ctx.globalAlpha=p.a;ctx.fillStyle="#ffd700";ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();return p.a>0});ctx.globalAlpha=1;requestAnimationFrame(render)}render();
}

// ============================================================
// NEW FEATURE 4 — WAIT... ONE LAST THING
// ============================================================
const finalMsgText=`Some friendships are not measured by days, months, or years… They are measured by the happiness they bring, the memories they create, and the peace they leave in our hearts.

This journey was never just about celebrating one year. It was about celebrating every smile, every laugh, and every moment that made our brotherhood stronger.

Thank you, Muzammil, for being one of the most precious parts of my life. ❤️`;

function startFinalEndingSequence(){
    if(finalStarted)return;finalStarted=true;
    const elem=document.getElementById("final-cinematic-text"),sig=document.getElementById("final-signature"),wait=document.getElementById("wait-last-thing");
    elem.innerHTML="";sig.classList.add("hidden");wait.classList.add("hidden");
    let i=0;
    function type(){
        if(i<finalMsgText.length){
            elem.innerHTML+=finalMsgText[i]==="\n"?"<br>":finalMsgText[i++];
            setTimeout(type,32);
        }else{
            setTimeout(()=>fadeToEndCard(),2200);
        }
    }
    function fadeToEndCard(){
        elem.style.transition="opacity 1s";elem.style.opacity="0";
        setTimeout(()=>{
            elem.innerHTML="";
            elem.style.opacity="1";
            sig.innerHTML=`<div class="glass-card text-center">
                <p>Thank you for being one of the most valuable parts of my life.<br>This journey became beautiful because you were a part of it.</p>
                <h3 style="color:var(--gold-primary);margin:15px 0 5px">Mohsin Tariq ❤️ Muzammil Tanoli</h3>
                <p style="font-size:.8rem;color:var(--gold-primary)">One Heart • One Brotherhood • Countless Memories</p>
            </div>`;
            sig.classList.remove("hidden");
            setTimeout(()=>fadeSignatureToTheEnd(),5200);
        },1000);
    }
    function fadeSignatureToTheEnd(){
        sig.style.transition="opacity 1s";sig.style.opacity="0";
        setTimeout(()=>{
            sig.classList.add("hidden");
            sig.innerHTML=`<h1 class="the-end-title">THE END</h1>`;
            sig.classList.remove("hidden");sig.style.opacity="1";
            setTimeout(()=>beginWaitSequence(),3000);
        },1000);
    }
    function beginWaitSequence(){
        const card=document.getElementById("ending-card");
        card.style.transition="opacity 1s";card.style.opacity="0";
        setTimeout(()=>{
            card.style.opacity="1";
            card.innerHTML=`<div id="wait-last-thing" class="wait-last-thing">
                <div class="wait-small">Wait…</div>
                <div id="one-last" class="wait-big hidden">One last thing.</div>
                <div id="last-message" class="hidden">
                    <div class="wait-message">This wasn't the end of our story.<br>It was only another beautiful chapter.</div>
                    <div class="wait-name">Mohsin ❤️ Muzammil</div>
                </div>
            </div>`;
            const box=document.getElementById("wait-last-thing");
            setTimeout(()=>document.getElementById("one-last").classList.remove("hidden"),2200);
            setTimeout(()=>document.getElementById("last-message").classList.remove("hidden"),4700);
            setTimeout(()=>{
                card.style.transition="opacity 3s";
                card.style.opacity="0";
                document.body.style.transition="opacity 3s";
                document.body.style.opacity="0";
            },9500);
        },1200);
    }
    type();
}

// Restart support
function restartJourney(){
    location.reload();
}

// Easter egg counter — fixed valid JavaScript comment
let easterClickCount=0;
document.addEventListener("DOMContentLoaded",()=>{
    const trigger=document.getElementById("secret-easter-trigger");
    if(trigger){
        trigger.addEventListener("click",e=>{
            e.stopPropagation();easterClickCount++;
            if(easterClickCount>=5){triggerEasterEggPopup();easterClickCount=0}
        });
    }
    // Make bouquet card itself advance, except name
    const card=document.querySelector("#scene-2 .bouquet-card");
    if(card)card.addEventListener("click",e=>{if(e.target.id!=="secret-easter-trigger")nextScene()});
});
