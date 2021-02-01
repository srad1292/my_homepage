const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("today").innerText = today.toLocaleDateString('en-US', options);

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


