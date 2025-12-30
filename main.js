document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }

    // 平滑滚动功能
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight || 80;
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