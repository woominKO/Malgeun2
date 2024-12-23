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
        threshold: 0.5,
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    const section4 = document.getElementById('section4');
    const section3 = document.getElementById('section3');

    const section4Observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section3.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5,
    });

    section4Observer.observe(section4);
};

function closePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function dontShowAgain() {
    localStorage.setItem('dontShowPopup', true);
    closePopup();
}
