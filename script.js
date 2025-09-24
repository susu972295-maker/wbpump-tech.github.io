// 導航功能
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToContact() {
    scrollToSection('contact');
}

function openLineOfficial() {
    // Line 官方帳號連結
    window.open('https://line.me/R/ti/p/@367ezjsl', '_blank');
}

// 表單處理功能
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');
    
    // 手機版導航選單
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 點擊選單項目後關閉選單
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 表單提交處理 - 暫時停用，使用 Formspree
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     
    //     // 收集表單數據
    //     const formData = {
    //         name: document.getElementById('name').value,
    //         company: document.getElementById('company').value,
    //         email: document.getElementById('email').value,
    //         phone: document.getElementById('phone').value,
    //         message: document.getElementById('message').value,
    //         timestamp: new Date().toLocaleString('zh-TW')
    //     };

    //     // 顯示載入狀態
    //     const submitBtn = form.querySelector('button[type="submit"]');
    //     const originalText = submitBtn.textContent;
    //     submitBtn.textContent = '送出中...';
    //     submitBtn.disabled = true;

    //     // 發送詢價資料
    //     sendInquiry(formData);
        
    //     // 重置表單
    //     form.reset();
        
    //     // 恢復按鈕狀態
    //     submitBtn.textContent = originalText;
    //     submitBtn.disabled = false;
        
    //     // 顯示成功提示
    //     showSuccessModal();
    // });

    // 關閉模態框
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });

    // 點擊模態框外部關閉
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});

// 發送詢價資料 - EmailJS
function sendInquiry(formData) {
    console.log('開始發送郵件...', formData);
    
    // 使用 EmailJS 發送郵件
    emailjs.send('service_93j2zf8', 'template_nzjuawo', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            console.log('郵件發送成功！');
            // 發送成功
        }, function(error) {
            console.log('FAILED...', error);
            console.log('錯誤詳情：', error);
            alert('發送失敗：' + error.text + '。請稍後再試或直接聯繫我們');
        });
    
    // 備份到本地儲存
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push(formData);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    console.log('資料已備份到本地儲存');
}

// 顯示成功提示
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
}

// 表單驗證
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !company || !email || !phone || !message) {
        alert('請填寫所有必填欄位');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('請輸入有效的 Email 地址');
        return false;
    }

    if (!isValidPhone(phone)) {
        alert('請輸入有效的電話號碼');
        return false;
    }

    return true;
}

// Email 驗證
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 電話驗證
function isValidPhone(phone) {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    return phoneRegex.test(phone) && phone.length >= 8;
}
