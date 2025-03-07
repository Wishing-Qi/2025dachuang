function toggleStacked(element) {
    const section = element.parentElement;
    const currentId = section.id;

    if (currentId === 'image1') {
        return;
    }

    const sections = Array.from(document.querySelectorAll('.image-section'));
    const isExpanded = section.classList.contains('expanded');

    // 隐藏第一张图片
    const firstSection = document.querySelector('#image1');
    firstSection.style.display = isExpanded ? 'flex' : 'none';

    // 清除之前的堆叠状态
    sections.forEach(s => {
        s.classList.remove('expanded', 'stacked');
        s.style.transform = '';
        const textElement = s.querySelector('.image-text');
        if (textElement) {
            textElement.style.left = '30%'; // 恢复默认位置
        }
    });

    if (!isExpanded) {
        // 设置当前点击的图片为展开状态
        section.classList.add('expanded');

        // 获取当前图片的索引
        const currentIndex = sections.indexOf(section);

        // 处理左侧堆叠的图片
        sections.slice(1, currentIndex + 1).forEach((s, index) => {
            s.classList.add('stacked');
            s.style.transform = `translateX(-${(index) * 20}vw)`;
        });

        // 处理右侧堆叠的图片
        sections.slice(currentIndex + 1).reverse().forEach((s, index) => {
            s.classList.add('stacked');
            s.style.transform = `translateX(${(index)*20 + 15}vw)`;
        });
        sections.forEach(s => {
            const textElement = s.querySelector('.image-text');
            if (textElement) {
                textElement.style.left = '10%'; // 向左移动
            }
        });
    }
}