document.addEventListener('DOMContentLoaded', function() {
    // メニュートグルボタンの機能
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // サイドバーリンクのアクティブ状態
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');
    const sections = document.querySelectorAll('main section');
    
    // スクロール時のアクティブリンク更新
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // サイドバーリンククリック時のスムーススクロール
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // モバイル表示の場合、クリック後にサイドバーを閉じる
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // 画像のロード完了時にフェードイン効果
    const images = document.querySelectorAll('.image-container img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // すでにロード済みの画像に対応
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // スクロールに応じてヘッダーの表示/非表示
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 下にスクロール
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

