window.onload = function() {
    if (!localStorage.getItem('dontShowPopup')) {
        let popup = document.getElementById('popup');
        popup.style.display = 'block';
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
