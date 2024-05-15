const backButton = document.getElementById('backButton');

backButton.addEventListener('click', function (event) {
    event.preventDefault();

    window.location.href = 'index.html';

});
