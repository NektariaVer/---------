// Make a GET request to the server to fetch the home page
fetch('http://localhost:8000/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    document.body.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching home page:', error);
  });
