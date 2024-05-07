function includeHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}

includeHTML('../../views/header.html', 'header');
includeHTML('../../views/menu.html', 'menu');
