let body = document.querySelector('body'),
    demoLink = document.querySelector('a.demo-link');

demoLink.addEventListener('click', function(e) {
    e.preventDefault();
    let audio = document.querySelector('audio');
    body.classList.add('suspense');
    
    setTimeout(function() {
        window.location = 'demo.html';
    }, 7000);
    
    audio.play();
});