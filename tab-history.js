function addTab(pageUrl, tabName) {
    let ul =  document.querySelector('.tabs-content ul');
    let newbutton = document.createElement('button');
    newbutton.className = 'tab-button';
    newbutton.textContent = tabName;
    ul.appendChild(newbutton);
}