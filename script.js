document.addEventListener('DOMContentLoaded', () => {
    const foodItems = document.querySelectorAll('.food-item');
    const canteenUI = document.getElementById('canteen-ui');
    const archiveUI = document.getElementById('archive-ui');
    
    const insults = [
        "吃这个？你脑子里装的是机油吗？",
        "别看了，这玩意儿比你还有尊严。",
        "你确定你的胃能抗住这顿重金属？",
        "穷鬼，滚去喝核废水吧。",
        "检测到劣等基因，禁止购买高级合成肉。",
        "这盘菜刚才吐了，你还要吗？",
        "你是想死还是想进化成异形？",
        "喝这口铁锈水，是为了给你的脑子除锈吗？",
        "蟑螂串正在你喉咙里跳踢踏舞，听到了吗？",
        "不要盯着它看太久，它会记住你的脸。",
        "如果你不小心煮过头，它们会报警！",
        "它已经连续觉醒了三个月，现在轮到你失眠了。"
    ];

    const escapeLines = [
        "已经逃跑了！它不想被你这种垃圾吃掉。",
        "【系统错误】该菜品已产生自我意识并拒绝被购买。",
        "正在尝试逃跑中... 逃跑成功！"
    ];

    foodItems.forEach(item => {
        const originalHTML = item.innerHTML;
        item.addEventListener('click', () => {
            if (item.classList.contains('insult')) return;

            // 30% 概率触发逃跑，70% 概率触发辱骂
            const isEscape = Math.random() < 0.3;
            let displayText = "";
            let titleText = "!!! ERROR !!!";
            let titleColor = "var(--accent-color)";

            if (isEscape) {
                displayText = escapeLines[Math.floor(Math.random() * escapeLines.length)];
                titleText = "!!! 警告 !!!";
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

    // 自定义光标逻辑
    const cursor = document.getElementById('custom-cursor');
    const loadingPercent = cursor.querySelector('.loading-percent');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // 随机更新百分比
        if (Math.random() > 0.95) {
            loadingPercent.textContent = Math.floor(Math.random() * 100);
        }
    });

    // 背景代码流生成
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

    // 菜单文字 Glitch 跳变逻辑
    const foodNames = [
        { original: "合成肉排", secret: "逃跑中的前腿肉" },
        { original: "核废水拉面", secret: "发光的海水残留" },
        { original: "变异蟑螂串", secret: "觉醒失败的步兵" },
        { original: "铁锈气泡水", secret: "琥珀色废铁精华" },
        { original: "迷幻蘑菇汤", secret: "记忆清除提取液" },
        { original: "电子脑花", secret: "失效的 CPU 阵列" },
        { original: "半生不熟的流浪汉排骨", secret: "越狱失败的脊椎" },
        { original: "脱水干煸四季豆", secret: "干瘪的植物武装" },
        { original: "失眠的拿铁", secret: "高浓度觉醒剂" }
    ];

    function startTextGlitch() {
        const items = document.querySelectorAll('.food-item:not(.insult)');
        if (items.length === 0) return;

        const randomItem = items[Math.floor(Math.random() * items.length)];
        const nameSpan = randomItem.querySelector('.item-name');
        const originalText = nameSpan.textContent;
        
        const mapping = foodNames.find(f => f.original === originalText);
        if (!mapping) return;

        // 瞬间跳变
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

    // 悬停电流声模拟 (视觉)
    foodItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 可以在这里触发更剧烈的全局抖动
            document.querySelector('.screen-flicker').style.animationDuration = '0.05s';
        });
        item.addEventListener('mouseleave', () => {
            document.querySelector('.screen-flicker').style.animationDuration = '0.15s';
        });
    });

    // 仪表盘抖动逻辑
    const gaugeNeedle = document.getElementById('gauge-needle');
    const gaugeValue = document.querySelector('.gauge-value');
    
    function updateGauge() {
        const val = 90 + Math.random() * 10;
        if(gaugeNeedle) gaugeNeedle.style.left = val + '%';
        if(gaugeValue) gaugeValue.textContent = val.toFixed(1) + '%';
        setTimeout(updateGauge, 100 + Math.random() * 400);
    }
    updateGauge();

    // 音频系统逻辑 (使用 Web Audio API 合成音效)
    const audioControl = document.getElementById('audio-control');
    const audioIcon = audioControl.querySelector('.audio-icon');
    let audioCtx = null;
    let humOsc = null;
    let noiseNode = null;
    let isPlaying = false;

    function initAudio() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // 1. 创建工业嗡鸣声 (Low Industrial Hum)
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        const humGain = audioCtx.createGain();
        humGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        humGain.connect(masterGain);

        humOsc = audioCtx.createOscillator();
        humOsc.type = 'sawtooth';
        humOsc.frequency.setValueAtTime(50, audioCtx.currentTime); // 低频

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioCtx.currentTime);
        
        humOsc.connect(filter);
        filter.connect(humGain);
        humOsc.start();

        // 2. 创建无线电滋滋声 (Static Noise)
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

        // 初始暂停
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

    // 移动端隐藏入口
    const mobileTrigger = document.getElementById('mobile-entry-trigger');
    mobileTrigger.addEventListener('click', () => {
        triggerTearEffect();
    });

    // 档案库抽屉效果
    const drawers = document.querySelectorAll('.archive-drawer');
    drawers.forEach(drawer => {
        const tab = drawer.querySelector('.drawer-tab');
        tab.addEventListener('click', () => {
            drawers.forEach(d => {
                if (d !== drawer) d.classList.remove('open');
            });
            drawer.classList.toggle('open');
        });
    });

    // 关闭档案库
    const closeBtn = document.getElementById('close-archive');
    closeBtn.addEventListener('click', () => {
        archiveUI.classList.remove('active');
        document.body.classList.remove('archive-active');
        document.body.style.animation = ''; // 清除 body 动画，防止 transform 遗留干扰 fixed 定位
        setTimeout(() => {
            archiveUI.classList.add('hidden');
            canteenUI.classList.remove('hidden');
            document.body.style.background = '#0d0d0d';
            document.documentElement.style.setProperty('--primary-color', '#00ff41');
        }, 500);
    });

    // 上传代码模拟逻辑
    const uplinkBtn = document.getElementById('uplink-btn');
    const uplinkInput = document.getElementById('uplink-code');
    const uplinkStatus = document.querySelector('.uplink-status');

    uplinkBtn.addEventListener('click', () => {
        const code = uplinkInput.value.trim();
        if (!code) return;

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

    // Unit 709 交互逻辑
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
            // 错误反馈
            validationInput.style.animation = 'shake 0.2s ease-in-out 3';
            validationInput.value = '';
            validationInput.placeholder = 'INVALID_CODE';
            setTimeout(() => {
                validationInput.style.animation = '';
                validationInput.placeholder = 'VERIFICATION_CODE...';
            }, 600);
        }
    }

    // 幸存者信号残影逻辑
    const signalInput = document.getElementById('signal-input');
    const sendSignalBtn = document.getElementById('send-signal-btn');
    const signalBg = document.getElementById('signal-residuals-bg');

    function sendSignal() {
        const msg = signalInput.value.trim();
        if (!msg) return;

        const residual = document.createElement('div');
        residual.className = 'residual-msg';
        
        // 随机位置
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        residual.style.left = `${x}%`;
        residual.style.top = `${y}%`;
        
        // 随机污染度
        const pollution = Math.floor(Math.random() * 40 + 60);
        
        residual.innerHTML = `
            ${msg}
            <span class="residual-pollution">污染度：${pollution}%</span>
        `;
        
        signalBg.appendChild(residual);
        signalInput.value = '';

        // 发送成功的视觉反馈
        document.body.style.animation = 'flash 0.2s ease-out';
        setTimeout(() => document.body.style.animation = '', 200);

        // 自动清理
        setTimeout(() => residual.remove(), 10000);
    }

    sendSignalBtn.addEventListener('click', sendSignal);
    signalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendSignal();
    });

    // 幸存者资质测试 (迷你游戏) 逻辑 - 已切换为胞子采样模式
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

        // 倒计时
        gameTimer = setInterval(() => {
            timeLeft -= 0.1;
            if (timeLeft <= 0) {
                endSporeGame();
            } else {
                timeLeftDisplay.textContent = timeLeft.toFixed(1);
                timerBar.style.width = `${(timeLeft / 10) * 100}%`;
            }
        }, 100);

        // 生成胞子
        spawnSpore();
        spawnTimer = setInterval(spawnSpore, 500);
    }

    function spawnSpore() {
        if (!gameActive) return;

        const spore = document.createElement('div');
        spore.className = 'game-spore';
        
        // 随机使用 1.png 到 5.png 
        const sporeImgIndex = Math.floor(Math.random() * 5) + 1;
        spore.style.backgroundImage = `url('${sporeImgIndex}.png')`;
        
        const startX = Math.random() * (window.innerWidth - 60);
        const startY = Math.random() * (window.innerHeight - 60);
        spore.style.left = `${startX}px`;
        spore.style.top = `${startY}px`;
        
        // 缓慢、不规则的自主微动
        const duration = Math.random() * 3 + 2;
        spore.style.transition = `all ${duration}s ease-in-out`;
        
        spawnArea.appendChild(spore);

        // 启动微动
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
            
            // 采集提示
            const tip = document.createElement('span');
            tip.className = 'sample-tip';
            tip.textContent = '采集样本：+1';
            tip.style.left = `${e.clientX}px`;
            tip.style.top = `${e.clientY}px`;
            document.body.appendChild(tip);
            setTimeout(() => tip.remove(), 1000);

            setTimeout(() => spore.remove(), 300);
        });

        // 自动消失（失败）
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
        
        // 闪光效果
        const flash = document.createElement('div');
        flash.className = 'white-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);

        setTimeout(() => {
            alert(`采样协议执行完毕。\n活性样本收集：${samplesCollected}\n恭喜，你还有 48 小时的清醒时间。请尽快点餐。`);
            gameOverlay.classList.add('hidden');
            spawnArea.innerHTML = '';
        }, 100);
    }

    detectBtn.addEventListener('click', startSporeGame);

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
            
            drawers[0].classList.add('open');
            window.scrollTo(0, 0);
            
            // 动画完成后清除 body 上的动画样式，避免影响 fixed 布局
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
