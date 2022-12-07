// @ts-nocheck
const today = new Date();

// const isDark = today.getHours() <= 7 || today.getHours() >= 19;
const isDark = false;
if(isDark) {
    const body = document.getElementById('body');
    body.classList.add('dark');
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("today").innerText = today.toLocaleDateString('en-US', options);

document.getElementById('body').style.backgroundImage="url(images/morning-03.png)";


// Perform web search 
function handleSearchKeyPress(event) {
    if (event.key === "Enter") {
        const search = document.getElementById('search');
        console.log({search});
        let text = search.value;
        if(!text) { return; }
        console.log('current search: ', text);
        text = text.trim();
        if(!text) { return; }
        text = text.replace(/ +/g, '+');
        console.log('sanitized search: ', text);
        window.open(`http://google.com/search?q=${text}`, '_blank');
        search.value = '';
    }
}





