document.addEventListener('DOMContentLoaded', function() {
    // 桌面端导航
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    // 移动端导航
    const mobileHeader = document.querySelector('.mobile-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    // 桌面端菜单切换函数
    function toggleMenu() {
        // 检查菜单当前状态
        const isOpen = nav.classList.contains('open');
        
        // 切换菜单状态
        nav.classList.toggle('open');
        
        // 为菜单切换添加过渡动画效果
        if (!isOpen) {
            // 菜单正在打开
            console.log('打开移动菜单');
        } else {
            // 菜单正在关闭
            console.log('关闭移动菜单');
        }
        
        // 防止事件冒泡
        return false;
    }

    // 桌面端关闭菜单函数
    function closeMenu() {
        nav.classList.remove('open');
    }

    // 移动端菜单切换函数
    function toggleMobileMenu() {
        mobileNav.classList.toggle('open');
        
        // 切换菜单按钮的图标
        if (mobileNav.classList.contains('open')) {
            mobileMenuToggle.textContent = '✕';
        } else {
            mobileMenuToggle.textContent = '☰';
        }
    }

    // 移动端关闭菜单函数
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        mobileMenuToggle.textContent = '☰';
    }

    // 桌面端菜单事件监听
    if (mobileMenu) {
        // 添加触摸设备支持
        mobileMenu.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu();
        }, {passive: false});
        
        // 添加普通点击事件
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            toggleMenu();
        });
    }

    // 移动端菜单事件监听
    if (mobileMenuToggle) {
        // 添加触摸设备支持
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        }, {passive: false});
        
        // 添加普通点击事件
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            toggleMobileMenu();
        });
    }

    // 点击桌面端菜单项后关闭菜单
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // 点击移动端菜单项后关闭菜单
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // 点击背景关闭菜单
    document.addEventListener('click', function(e) {
        // 桌面端菜单
        if (nav.classList.contains('open')) {
            // 获取菜单容器和按钮元素
            const navRight = document.querySelector('.nav-right');
            
            // 如果点击的不是菜单或按钮内部元素，则关闭菜单
            if (!nav.contains(e.target) && !navRight.contains(e.target)) {
                closeMenu();
            }
        }
        
        // 移动端菜单
        if (mobileNav.classList.contains('open')) {
            // 如果点击的不是移动菜单或菜单按钮，则关闭菜单
            if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (nav.classList.contains('open')) {
                closeMenu();
            }
            if (mobileNav.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    });

    // 获取当前设备类型的header高度
    function getHeaderHeight() {
        if (window.innerWidth <= 768) {
            // 移动端头部高度
            const mobileHeader = document.querySelector('.mobile-header');
            return mobileHeader ? mobileHeader.offsetHeight || 56 : 56;
        } else {
            // 桌面端头部高度
            const header = document.querySelector('header');
            return header ? header.offsetHeight || 80 : 80;
        }
    }

    // 平滑滚动功能
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = getHeaderHeight();
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // 为所有锚链接添加点击事件
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // 专门为banner按钮添加事件监听器
    const contactBtn = document.querySelector('a[href="#contact"]');
    const servicesBtn = document.querySelector('a[href="#services"]');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo('contact');
        });
    }
    
    if (servicesBtn) {
        servicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo('services');
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .case-card, .testimonial-card, .step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 回到顶部功能
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = '回到顶部';
    document.body.appendChild(backToTopBtn);

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});