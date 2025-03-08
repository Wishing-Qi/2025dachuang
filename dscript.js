document.addEventListener('DOMContentLoaded', () => {
    // 获取所有事件节点
    const events = document.querySelectorAll('.event');

    // 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 如果元素进入视口，设置透明度为1
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            } else {
                // 如果元素离开视口，设置透明度为0.5
                entry.target.style.opacity = 0.3;
            }
        });
    }, {
        root: null, // 使用浏览器视口作为参考
        rootMargin: '20px', // 不增加额外的边界
        threshold: 0.5 // 元素至少50%可见时触发
    });

    // 将每个事件节点添加到观察器中
    events.forEach(event => {
        observer.observe(event);
    });
});