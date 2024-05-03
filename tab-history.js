function addTab(tabName) {
    var tabsList = document.getElementById('tabs-list');
    var newTabButton = document.createElement('button');
    newTabButton.className = 'tab-button';
    newTabButton.textContent = tabName;
    tabsList.appendChild(newTabButton);
}