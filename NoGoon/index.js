document.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'zoom-in';

    img.onclick = (e) => {
        e.stopPropagation();
        const isEnlarged = img.style.transform.includes('scale(1.5)');
        if (isEnlarged) {
            img.style.position = '';
            img.style.top = '';
            img.style.left = '';
            img.style.transform = '';
            img.style.zIndex = '';
            img.style.cursor = 'zoom-in';
            const backdrop = document.getElementById('backdrop');
            if (backdrop) 
                backdrop.remove();
            
        } else {
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -20%) scale(2)';
            img.style.zIndex = '1001';
            img.style.cursor = 'zoom-out';

            if (!document.getElementById('backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.style.position = 'fixed';
                backdrop.style.top = '0';
                backdrop.style.left = '0';
                backdrop.style.width = '100%';
                backdrop.style.height = '100%';
                backdrop.style.background = 'rgba(0,0,0,0.5)';
                backdrop.style.backdropFilter = 'blur(15px)';
                backdrop.style.zIndex = '1000';
                backdrop.id = 'backdrop';
                document.body.appendChild(backdrop);
            }
        }
    };
});

document.body.onclick = () => {
    const backdrop = document.getElementById('backdrop');
    if (backdrop) 
        backdrop.remove();
    
    document.querySelectorAll('img').forEach(img => {
        img.style.position = '';
        img.style.top = '';
        img.style.left = '';
        img.style.transform = '';
        img.style.zIndex = '';
        img.style.cursor = 'zoom-in';
    });
};
