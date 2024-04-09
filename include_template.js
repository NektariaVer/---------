function includeHTML(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}

includeHTML('pages_template.html');