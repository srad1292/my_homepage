// @ts-nocheck
const today = new Date();
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


/**
 * Get the list of IDs for new stories from Hacker News and then 
 * call a function to retrieve the actual story data and display it
 */
const currentsUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
let newStories;
fetch(currentsUrl)
.then(response => response.json())
.then(storyIds => {
    newStories = storyIds;
    loadNewStories(0, 16);
})
.catch(error => {
    console.log('Error Getting Story Ids');
    console.log(error);
});

/**
 * Get a list of stories from Hacker News and display them as links on the page.
 * @param {number} start - The index of the first story to retrieve 
 * @param {number} end -  The index of the last story to retrieve
 */
function loadNewStories(start, end) {
    let requests = [];
    while(start <= end) {
        if(newStories[start]) {
            requests.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${newStories[start]}.json?print=pretty`));
        }
        start++;
    }
    if(requests.length) {
        Promise.all(requests)
        .then(responses => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }));
        })
        .then(stories => {
            let storyList = document.getElementById("tech-stories-list");
            stories.forEach(story => {
                if(story && story.url) {
                    // https://news.ycombinator.com/item?id=29414763
                    let link = document.createElement("a");
                    link.appendChild(document.createTextNode(story.title));
                    link.href = `https://news.ycombinator.com/item?id=${story.id}`;
                    link.target = "blank";
                    let item = document.createElement("li");
                    item.appendChild(link);
                    storyList.appendChild(item);
                }
            });
        })
        .catch(error => {
            console.log("Error retrieving stories.");
            console.log(error);
            let storyContainer = document.getElementById("tech-stories-container");
            storyContainer.style.display = 'none';
        })
    }
}

