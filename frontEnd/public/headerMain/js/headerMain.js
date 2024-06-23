document.addEventListener('DOMContentLoaded', function() {
    fetch('../../public/headerMain/headerMain.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Forçar a execução dos scripts após a inserção do HTML
            var scripts = document.querySelectorAll('#header-container script');
            scripts.forEach(script => {
                var newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.defer = script.defer;
                document.head.appendChild(newScript);
            });
        })
        .catch(error => console.error('Error loading header:', error));
});

//initializeNav();