// @ts-nocheck
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const isDark = today.getHours() <= 7 || today.getHours() >= 19;
const body = document.getElementById('body');

setupHomepage();

function setupHomepage() {
    selectBackgroundImage();
    document.getElementById("today").innerText = today.toLocaleDateString('en-US', options);
    if(isDark) { body.classList.add('dark'); }
}

function selectBackgroundImage() {
    const night = ["twilight-01.png", "twilight-02.png", "twilight-03.png"];
    const day = ["morning-01.png", "morning-02.png", "morning-03.png"];
    
    let index = Math.floor(Math.random()*night.length);
    fileName = isDark ? night[index] : day[index];
    body.style.backgroundImage=`url(images/${fileName})`;
}


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





