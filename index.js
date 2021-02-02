const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("today").innerText = today.toLocaleDateString('en-US', options);

/**
 * Get cat facts and choose which one to display based on the day of the week
 */
fetch("https://cat-fact.herokuapp.com/facts")
.then(response => response.json())
.then(catFacts => {
    let date = new Date().getDate();
    let catFact = catFacts[date] ? catFacts[date].text : catFacts[0].text;
    document.getElementById("cat-fact").innerText = catFact ? catFact : "No Fact Today.";
})
.catch(error => {
    console.log("Error retrieving cat fact.");
    console.log(error);
    document.getElementById("cat-fact").innerText = "No Fact Today.";
});

/**
 * Get a random programming quote to display
 */
fetch("http://quotes.stormconsultancy.co.uk/random.json")
.then(response => response.json())
.then(programmingQuote => {
    console.log({programmingQuote});
    document.getElementById("programming-quote").innerText = programmingQuote ? programmingQuote.quote || "No Fact Today." : "No Fact Today.";
})
.catch(error => {
    console.log("Error retrieving programming quote.");
    console.log(error);
    document.getElementById("programming-quote").innerText = "No Fact Today.";
});

/**
 * Get the list of IDs for new stories from Hacker News and then 
 * call a function to retrieve the actual story data and display it
 */
const currentsUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
let newStories;
fetch(currentsUrl)
.then(response => response.json())
.then(storyIds => {
    newStories = storyIds;
    loadNewStories(0, 5);
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
                    let link = document.createElement("a");
                    link.appendChild(document.createTextNode(story.title));
                    link.href = story.url;
                    link.target = "blank";
                    storyList.appendChild(link);
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

