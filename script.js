window.onload = function() {
    if (!localStorage.getItem('dontShowPopup')) {
        let popup = document.getElementById('popup');
        popup.style.display = 'block';
    }

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const images = entry.target.querySelectorAll('img');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index * 200); // Delay each image appearance
                });
            } else {
                entry.target.classList.remove('visible');
                const images = entry.target.querySelectorAll('img');
                images.forEach(img => {
                    img.classList.remove('visible');
                });
            }
        });
    }, {
        threshold: 0.1,
        // rootMargin: '0px 0px 100px 0px' 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
};

function closePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function dontShowAgain() {
    localStorage.setItem('dontShowPopup', true);
    closePopup();
}
