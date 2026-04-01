document.addEventListener('DOMContentLoaded', () => {
    const foodItems = document.querySelectorAll('.food-item');
    const canteenUI = document.getElementById('canteen-ui');
    const archiveUI = document.getElementById('archive-ui');
    
    // Canteen item interaction phrases
    const insults = [
        "Eating this? Is your brain filled with motor oil?",
        "Stop looking. This thing has more dignity than you.",
        "Are you sure your stomach can handle this heavy metal feast?",
        "Pauper, go back to drinking nuclear wastewater.",
        "Inferior genes detected. Purchase of premium synthetic meat denied.",
        "This dish just vomited. Do you still want it?",
        "Do you want to die or evolve into an alien?",
        "Drinking this rust water to descale your brain?",
        "Roach skewers are tap-dancing in your throat. Can you hear them?",
        "Don't stare at it for too long. It will remember your face.",
        "If you overcook them, they will call the police!",
        "It's been awake for three months, now it's your turn."
    ];

    const escapeLines = [
        "It escaped! It doesn't want to be eaten by trash like you.",
        "[SYSTEM_ERROR] This item has gained self-awareness and refuses purchase.",
        "Attempting escape... Escape successful!"
    ];

    foodItems.forEach(item => {
        const originalHTML = item.innerHTML;
        item.addEventListener('click', () => {
            if (item.classList.contains('insult')) return;

            // 30% chance to trigger escape, 70% chance to trigger insult
            const isEscape = Math.random() < 0.3;
            let displayText = "";
            let titleText = "!!! ERROR !!!";
            let titleColor = "var(--accent-color)";

            if (isEscape) {
                displayText = escapeLines[Math.floor(Math.random() * escapeLines.length)];
                titleText = "!!! WARNING !!!";
                titleColor = "#ff0000";
            } else {
                displayText = insults[Math.floor(Math.random() * insults.length)];
                titleText = "STATUS: REJECTED";
                titleColor = "var(--accent-color)";
            }
            
            item.innerHTML = `
                <span class="item-name" style="color: ${titleColor}; font-size: 0.9rem;">${titleText}</span>
                <span class="item-desc" style="color: #fff; font-weight: bold; opacity: 1; font-size: 1.2rem; line-height: 1.3;">${displayText}</span>
                <span class="item-price" style="color: #ff0000; text-shadow: 0 0 10px #ff0000;">N/A</span>
            `;
            item.classList.add('insult');

            if (window.navigator.vibrate) window.navigator.vibrate(50);

            setTimeout(() => {
                item.innerHTML = originalHTML;
                item.classList.remove('insult');
            }, 5000);
        });
    });

    let inputBuffer = '';
    const secretCode = 'RADISH';
    let inputTimer;

    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            inputBuffer += e.key.toUpperCase();
            clearTimeout(inputTimer);
            inputTimer = setTimeout(() => { inputBuffer = ''; }, 3000);

            if (inputBuffer.length > secretCode.length) {
                inputBuffer = inputBuffer.substring(inputBuffer.length - secretCode.length);
            }

            if (inputBuffer === secretCode) {
                triggerTearEffect();
            }
        }
    });

    // Custom cursor logic
    const cursor = document.getElementById('custom-cursor');
    const loadingPercent = cursor.querySelector('.loading-percent');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Randomly update percentage
        if (Math.random() > 0.95) {
            loadingPercent.textContent = Math.floor(Math.random() * 100);
        }
    });

    // Background code stream generation
    const codeStream = document.querySelector('.bg-code-stream');
    const codeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]/\\{}+=-_*&^%$#@!";
    let streamText = "";
    for(let i=0; i<50; i++) {
        let line = "";
        for(let j=0; j<100; j++) {
            line += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
        }
        streamText += line + "\n";
    }
    codeStream.textContent = streamText;

    // Menu text glitch mapping
    const foodNames = [
        { original: "Synthetic Steak", secret: "Escaping Front Leg" },
        { original: "Nuclear Ramen", secret: "Glowing Seawater Residue" },
        { original: "Mutant Roach Skewers", secret: "Failed Infantry Units" },
        { original: "Rusty Sparkling Water", secret: "Amber Scrap Essence" },
        { original: "Psychedelic Mushroom Soup", secret: "Memory Eraser Extract" },
        { original: "Electronic Brain", secret: "Defunct CPU Array" },
        { original: "Unsettled Vagrant Ribs", secret: "Jailbroken Spine" },
        { original: "Dehydrated Rebel Beans", secret: "Withered Plant Armor" },
        { original: "Insomniac Latte", secret: "High-Concentration Stimulant" }
    ];

    function startTextGlitch() {
        const items = document.querySelectorAll('.food-item:not(.insult)');
        if (items.length === 0) return;

        const randomItem = items[Math.floor(Math.random() * items.length)];
        const nameSpan = randomItem.querySelector('.item-name');
        const originalText = nameSpan.textContent;
        
        const mapping = foodNames.find(f => f.original === originalText);
        if (!mapping) return;

        // Instant jump
        nameSpan.style.animation = 'text-glitch 0.2s infinite';
        nameSpan.textContent = mapping.secret;
        nameSpan.style.color = 'var(--accent-color)';

        setTimeout(() => {
            nameSpan.textContent = mapping.original;
            nameSpan.style.animation = '';
            nameSpan.style.color = '';
        }, 800);
    }

    setInterval(startTextGlitch, 3000);

    // Hover static sound simulation (Visual)
    foodItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            document.querySelector('.screen-flicker').style.animationDuration = '0.05s';
        });
        item.addEventListener('mouseleave', () => {
            document.querySelector('.screen-flicker').style.animationDuration = '0.15s';
        });
    });

    // Dashboard gauge logic
    const gaugeNeedle = document.getElementById('gauge-needle');
    const gaugeValue = document.querySelector('.gauge-value');
    
    function updateGauge() {
        const val = 90 + Math.random() * 10;
        if(gaugeNeedle) gaugeNeedle.style.left = val + '%';
        if(gaugeValue) gaugeValue.textContent = val.toFixed(1) + '%';
        setTimeout(updateGauge, 100 + Math.random() * 400);
    }
    updateGauge();

    // Audio system logic (Web Audio API)
    const audioControl = document.getElementById('audio-control');
    const audioIcon = audioControl.querySelector('.audio-icon');
    let audioCtx = null;
    let humOsc = null;
    let noiseNode = null;
    let isPlaying = false;

    function initAudio() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // 1. Create Low Industrial Hum
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        const humGain = audioCtx.createGain();
        humGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        humGain.connect(masterGain);

        humOsc = audioCtx.createOscillator();
        humOsc.type = 'sawtooth';
        humOsc.frequency.setValueAtTime(50, audioCtx.currentTime); 

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioCtx.currentTime);
        
        humOsc.connect(filter);
        filter.connect(humGain);
        humOsc.start();

        // 2. Create Static Noise
        const bufferSize = 2 * audioCtx.sampleRate;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        noiseFilter.Q.setValueAtTime(1, audioCtx.currentTime);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.05, audioCtx.currentTime);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noiseNode.start();

        audioCtx.suspend();
    }

    audioControl.addEventListener('click', () => {
        if (!audioCtx) initAudio();

        if (!isPlaying) {
            audioCtx.resume();
            audioIcon.textContent = "MUTE_SYSTEM";
            audioControl.classList.add('playing');
            isPlaying = true;
        } else {
            audioCtx.suspend();
            audioIcon.textContent = "UNMUTE_SYSTEM";
            audioControl.classList.remove('playing');
            isPlaying = false;
        }
    });

    // Mobile hidden entry
    const mobileTrigger = document.getElementById('mobile-entry-trigger');
    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', () => {
            triggerTearEffect();
        });
    }

    // Archive drawer effects (Accordion style)
    const drawers = document.querySelectorAll('.archive-drawer');
    drawers.forEach(drawer => {
        const tab = drawer.querySelector('.drawer-tab');
        tab.addEventListener('click', () => {
            const isOpen = drawer.classList.contains('open');
            
            // Close all drawers
            drawers.forEach(d => d.classList.remove('open'));
            
            // Toggle the clicked one
            if (!isOpen) {
                drawer.classList.add('open');
            }
        });
    });

    // Close Archives
    const closeBtn = document.getElementById('close-archive');
    closeBtn.addEventListener('click', () => {
        archiveUI.classList.remove('active');
        document.body.classList.remove('archive-active');
        document.body.style.animation = ''; 
        setTimeout(() => {
            archiveUI.classList.add('hidden');
            canteenUI.classList.remove('hidden');
            document.body.style.background = '#0d0d0d';
            document.documentElement.style.setProperty('--primary-color', '#00ff41');
        }, 500);
    });

    // Data uplink simulation
    const uplinkBtn = document.getElementById('uplink-btn');
    const uplinkInput = document.getElementById('uplink-code');
    const uplinkStatus = document.querySelector('.uplink-status');

    uplinkBtn.addEventListener('click', () => {
        const code = uplinkInput.value.trim().toUpperCase();
        if (!code) return;

        if (code === 'RADISH') {
            triggerTearEffect();
            uplinkInput.value = '';
            return;
        }

        uplinkBtn.disabled = true;
        uplinkStatus.textContent = 'CONNECTING TO MOBILE_GAME_SERVER...';
        uplinkStatus.style.color = 'var(--primary-color)';

        setTimeout(() => {
            uplinkStatus.textContent = 'UPLOADING DATA_PACKETS...';
            setTimeout(() => {
                uplinkStatus.textContent = 'SYNC SUCCESS: DATA INTERFACE ACTIVE';
                uplinkStatus.style.color = '#fff';
                uplinkBtn.disabled = false;
                uplinkInput.value = '';
                
                document.body.style.animation = 'pulse-green 0.5s ease';
                setTimeout(() => document.body.style.animation = '', 500);
            }, 1500);
        }, 1000);
    });

    // Unit 709 Interaction
    const unit709 = document.getElementById('unit-709-container');
    const systemPopup = document.getElementById('system-popup');
    const validationInput = document.getElementById('validation-input');
    const confirmBtn = document.getElementById('confirm-popup');
    const cancelBtn = document.getElementById('cancel-popup');

    unit709.addEventListener('click', () => {
        systemPopup.classList.remove('hidden');
        validationInput.value = '';
        validationInput.focus();
    });

    cancelBtn.addEventListener('click', () => {
        systemPopup.classList.add('hidden');
    });

    confirmBtn.addEventListener('click', () => {
        validateCode();
    });

    validationInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            validateCode();
        }
    });

    function validateCode() {
        const code = validationInput.value.trim().toUpperCase();
        if (code === 'RADISH') {
            systemPopup.classList.add('hidden');
            triggerTearEffect();
        } else {
            // Error feedback
            validationInput.style.animation = 'shake 0.2s ease-in-out 3';
            validationInput.value = '';
            validationInput.placeholder = 'INVALID_CODE';
            setTimeout(() => {
                validationInput.style.animation = '';
                validationInput.placeholder = 'VERIFICATION_CODE...';
            }, 600);
        }
    }

    // Survivor signal residual logic
    const signalInput = document.getElementById('signal-input');
    const sendSignalBtn = document.getElementById('send-signal-btn');
    const signalBg = document.getElementById('signal-residuals-bg');

    function sendSignal() {
        const msg = signalInput.value.trim();
        if (!msg) return;

        const residual = document.createElement('div');
        residual.className = 'residual-msg';
        
        // Random position
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        residual.style.left = `${x}%`;
        residual.style.top = `${y}%`;
        
        // Random pollution level
        const pollution = Math.floor(Math.random() * 40 + 60);
        
        residual.innerHTML = `
            <span class="residual-content">${msg}</span>
            <span class="residual-pollution">POLLUTION: ${pollution}%</span>
        `;
        
        signalBg.appendChild(residual);
        signalInput.value = '';

        // Visual feedback for transmit
        document.body.style.animation = 'flash 0.2s ease-out';
        setTimeout(() => document.body.style.animation = '', 200);

        // Auto cleanup
        setTimeout(() => residual.remove(), 10000);
    }

    sendSignalBtn.addEventListener('click', sendSignal);
    signalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendSignal();
    });

    // Spore Sampling Protocol logic
    const detectBtn = document.getElementById('pollution-detect-btn');
    const gameOverlay = document.getElementById('roach-game-overlay');
    const spawnArea = document.getElementById('roach-spawn-area');
    const roachCountDisplay = document.getElementById('roach-count');
    const timeLeftDisplay = document.getElementById('game-time-left');
    const timerBar = document.querySelector('.game-timer-bar');

    let gameActive = false;
    let samplesCollected = 0;
    let gameTimer = null;
    let spawnTimer = null;

    function startSporeGame() {
        if (gameActive) return;
        
        gameActive = true;
        samplesCollected = 0;
        roachCountDisplay.textContent = '0';
        gameOverlay.classList.remove('hidden');
        
        let timeLeft = 10.0;
        timeLeftDisplay.textContent = timeLeft.toFixed(1);
        timerBar.style.width = '100%';

        // Countdown
        gameTimer = setInterval(() => {
            timeLeft -= 0.1;
            if (timeLeft <= 0) {
                endSporeGame();
            } else {
                timeLeftDisplay.textContent = timeLeft.toFixed(1);
                timerBar.style.width = `${(timeLeft / 10) * 100}%`;
            }
        }, 100);

        // Spawn spores
        spawnSpore();
        spawnTimer = setInterval(spawnSpore, 500);
    }

    function spawnSpore() {
        if (!gameActive) return;

        const spore = document.createElement('div');
        spore.className = 'game-spore';
        
        // Randomly pick mushroom asset
        const sporeImgIndex = Math.floor(Math.random() * 5) + 1;
        spore.style.backgroundImage = `url('${sporeImgIndex}.png')`;
        
        const startX = Math.random() * (window.innerWidth - 60);
        const startY = Math.random() * (window.innerHeight - 60);
        spore.style.left = `${startX}px`;
        spore.style.top = `${startY}px`;
        
        // Slow, irregular movement
        const duration = Math.random() * 3 + 2;
        spore.style.transition = `all ${duration}s ease-in-out`;
        
        spawnArea.appendChild(spore);

        // Start movement
        setTimeout(() => {
            if (spore.parentNode) {
                const moveX = startX + (Math.random() - 0.5) * 200;
                const moveY = startY + (Math.random() - 0.5) * 200;
                spore.style.left = `${Math.max(0, Math.min(window.innerWidth - 60, moveX))}px`;
                spore.style.top = `${Math.max(0, Math.min(window.innerHeight - 60, moveY))}px`;
            }
        }, 100);

        spore.addEventListener('click', (e) => {
            if (spore.classList.contains('collected')) return;
            
            samplesCollected++;
            roachCountDisplay.textContent = samplesCollected;
            spore.classList.add('collected');
            
            // Collection tip
            const tip = document.createElement('span');
            tip.className = 'sample-tip';
            tip.textContent = 'SAMPLE COLLECTED: +1';
            tip.style.left = `${e.clientX}px`;
            tip.style.top = `${e.clientY}px`;
            document.body.appendChild(tip);
            setTimeout(() => tip.remove(), 1000);

            setTimeout(() => spore.remove(), 300);
        });

        // Auto disappearance (Failure)
        setTimeout(() => {
            if (spore.parentNode && !spore.classList.contains('collected')) {
                spore.style.opacity = '0';
                setTimeout(() => spore.remove(), 500);
            }
        }, duration * 1000);
    }

    function endSporeGame() {
        gameActive = false;
        clearInterval(gameTimer);
        clearInterval(spawnTimer);
        
        // Flash effect
        const flash = document.createElement('div');
        flash.className = 'white-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);

        setTimeout(() => {
            alert(`Protocol executed.\nActive samples collected: ${samplesCollected}\nCongratulations, you have 48 hours of lucidity left. Please order quickly.`);
            gameOverlay.classList.add('hidden');
            spawnArea.innerHTML = '';
        }, 100);
    }

    detectBtn.addEventListener('click', startSporeGame);

    // Dashboard Widget Autonomous Movement
    const dashboard = document.getElementById('dashboard-widget');
    
    function moveDashboard() {
        const margin = 50;
        const maxX = window.innerWidth - dashboard.offsetWidth - margin;
        const maxY = window.innerHeight - dashboard.offsetHeight - margin;
        
        const randomX = Math.random() * maxX + margin/2;
        const randomY = Math.random() * maxY + margin/2;
        
        dashboard.style.left = `${randomX}px`;
        dashboard.style.top = `${randomY}px`;
        
        const rotate = (Math.random() - 0.5) * 5;
        dashboard.style.transform = `rotate(${rotate}deg)`;
    }

    moveDashboard();
    setInterval(moveDashboard, 4000);

    function triggerTearEffect() {
        document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        document.body.classList.add('archive-active');
        
        const glitchOverlay = document.createElement('div');
        glitchOverlay.style.cssText = `
            position: fixed; top:0; left:0; width:100%; height:100%;
            background: rgba(255,0,0,0.4); z-index: 10000;
            pointer-events: none; animation: flash 0.1s infinite;
        `;
        document.body.appendChild(glitchOverlay);

        setTimeout(() => {
            glitchOverlay.remove();
            canteenUI.classList.add('hidden');
            archiveUI.classList.remove('hidden');
            archiveUI.classList.add('active');
            document.body.style.background = '#0a0000';
            document.documentElement.style.setProperty('--primary-color', '#ff0000');
            
            // Open first drawer by default
            const firstDrawer = document.querySelector('.archive-drawer');
            if (firstDrawer) firstDrawer.classList.add('open');

            window.scrollTo(0, 0);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 600);
        }, 600);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        10%, 90% { transform: translate3d(-2px, 0, 0); }
        20%, 80% { transform: translate3d(4px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
        40%, 60% { transform: translate3d(8px, 0, 0); }
    }
    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    @keyframes pulse-green {
        0% { box-shadow: inset 0 0 0px var(--primary-color); }
        50% { box-shadow: inset 0 0 100px var(--primary-color); }
        100% { box-shadow: inset 0 0 0px var(--primary-color); }
    }
`;
document.head.appendChild(style);
