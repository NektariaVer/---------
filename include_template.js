function includeHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}

includeHTML('header.html', 'header');
includeHTML('menu.html', 'menu');
