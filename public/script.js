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

    // Notice board functionality
    const postTableBody = document.getElementById('postTableBody');

    // Fetch existing posts from the server
    fetch('http://localhost:3000/notices')
        .then(response => response.json())
        .then(savedPosts => {
            savedPosts.forEach((postData, index) => {
                const row = document.createElement('tr');
                row.classList.add('body');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td class="title">${postData.title}</td>
                    <td>작성자</td>
                    <td>${postData.date}</td>
                `;
                row.addEventListener('click', () => {
                    alert(`제목: ${postData.title}\n내용: ${postData.content}`);
                });
                postTableBody.appendChild(row);
            });
        });

    // Restrict posting to the owner
    const owner = 'owner@example.com'; // Replace with the owner's email
    const currentUser = localStorage.getItem('currentUser'); // Assume currentUser is stored in localStorage

    if (currentUser !== owner) {
        const writeButton = document.querySelector('button[onclick="location.href=\'write.html\'"]');
        writeButton.style.display = 'none';
    }
};

function closePopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function dontShowAgain() {
    localStorage.setItem('dontShowPopup', true);
    closePopup();
}
