document.addEventListener('DOMContentLoaded', () => {
    const foodItems = document.querySelectorAll('.food-item');
    const canteenUI = document.getElementById('canteen-ui');
    const archiveUI = document.getElementById('archive-ui');
    
    const insults = [
        "吃这个？你脑子里装的是机油吗？",
        "别看了，这玩意儿比你还有尊严。",
        "你确定你的胃能抗住这顿重金属？",
        "已经逃跑了！它不想被你这种垃圾吃掉。",
        "【系统错误】该菜品已产生自我意识并拒绝被购买。",
        "穷鬼，滚去喝核废水吧。",
        "正在尝试逃跑中... 逃跑成功！",
        "检测到劣等基因，禁止购买高级合成肉。",
        "这盘菜刚才吐了，你还要吗？",
        "你是想死还是想进化成异形？"
    ];

    foodItems.forEach(item => {
        const originalHTML = item.innerHTML;
        item.addEventListener('click', () => {
            if (item.classList.contains('insult')) return;

            const randomInsult = insults[Math.floor(Math.random() * insults.length)];
            
            item.innerHTML = `
                <span class="item-name" style="color: var(--accent-color); font-size: 1rem;">!!! 警告 !!!</span>
                <span class="item-desc" style="color: var(--accent-color); font-weight: bold;">${randomInsult}</span>
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

    // 档案库抽屉效果
    const drawers = document.querySelectorAll('.archive-drawer');
    drawers.forEach(drawer => {
        const tab = drawer.querySelector('.drawer-tab');
        tab.addEventListener('click', () => {
            // 关闭其他
            drawers.forEach(d => {
                if (d !== drawer) d.classList.remove('open');
            });
            // 切换当前
            drawer.classList.toggle('open');
        });
    });

    // 关闭档案库
    const closeBtn = document.getElementById('close-archive');
    closeBtn.addEventListener('click', () => {
        archiveUI.classList.remove('active');
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
                
                // 触发一个小的成功特效
                document.body.style.animation = 'pulse-green 0.5s ease';
                setTimeout(() => document.body.style.animation = '', 500);
            }, 1500);
        }, 1000);
    });

    function triggerTearEffect() {
        document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        
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
            
            // 默认打开第一个抽屉
            drawers[0].classList.add('open');
            
            window.scrollTo(0, 0);
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
