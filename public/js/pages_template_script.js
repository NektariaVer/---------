document.addEventListener("DOMContentLoaded", function() {
    function handleButtonClick(url) {
        window.location.href = url;
    }

    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var url = button.getAttribute('onclick').replace("window.location.href='", "").replace("'", "");
            handleButtonClick(url);
        });
    });

    var pagesButtons = document.querySelectorAll('.pages-button');
    pagesButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var url = button.getAttribute('onclick').replace("window.location.href='", "").replace("'", "");
            handleButtonClick(url);
        });
    });

    function handleSearch() {
        var searchText = document.getElementById('search-input').value;
        console.log('Performing search for: ' + searchText);
    }

    var searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function() {
        handleSearch();
    });
});