
const htmlMap = {
    'image2': 'detail-1.html',
    'image3': 'detail-2.html',
    'image4': 'detail-3.html',
    'image5': 'detail-4.html',
    // 添加其他图片对应的HTML文件路径
};

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

        // 显示详情容器
        const detailContainer = document.querySelector('.detail-container');
        const detailContent = document.querySelector('.detail-content');
        detailContainer.style.display = 'block';

        // 获取当前图片的元素
        const imageSection = section.querySelector('img');

        // 添加 transitionend 事件监听器
        // 手动检查图片的位置变化
        let previousRect;
        const checkPosition = () => {
            const rect = imageSection.getBoundingClientRect();

            if (!previousRect ||
                previousRect.left !== rect.left ||
                previousRect.top !== rect.top) {
                previousRect = rect;
                setTimeout(checkPosition, 100);
            } else {
                // 位置稳定，显示详情容器
                // 获取容器的位置
                const containerRect = document.querySelector('.container').getBoundingClientRect();
                const containerX = containerRect.left;
                const containerY = containerRect.top;

                // 计算详情容器的位置
                const detailLeft = rect.right - containerX - rect.width * 0.7 ;
                const detailTop = rect.top - containerY;

                // 应用到详情容器
                detailContainer.style.width = `${rect.width*2.8}px`;
                detailContainer.style.left = `${detailLeft}px`;
                detailContainer.style.top = `${detailTop}px`;

                // 加载对应的 HTML 文件
                const htmlPath = htmlMap[currentId];
                if (htmlPath) {
                    detailContent.src = htmlPath;
                } else {
                    detailContent.src = '#';
                    console.error('未找到对应的 HTML 文件路径。');
                }
            }
        };

        checkPosition();
    } else {
        // 折叠详情容器
        const detailContainer = document.querySelector('.detail-container');
        detailContainer.style.width = '0';
        detailContainer.style.left = '0';
        detailContainer.style.top = '0';
        detailContainer.style.display = 'none';

        // 清空内容
        const detailContent = document.querySelector('.detail-content');
        detailContent.src = '';
    }
}