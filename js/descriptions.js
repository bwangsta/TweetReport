let user_tweets = []

function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }

    let tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    //TODO: Filter to just the written tweets
    user_tweets = tweet_array.filter((tweet) => {
        return tweet.written;
    });

}

function addEventHandlerForSearch() {
    //TODO: Search the written tweets as text is entered into the search box, and add them to the table]
    let search = document.querySelector("#textFilter");
    document.querySelector("#searchText").textContent = search.value;

    let filtered_tweets = [];
    if (search.value !== '') {
        filtered_tweets = user_tweets.filter((tweets) => {
            return tweets.text.includes(search.value);
        });
    }

    document.querySelector("#searchCount").textContent = filtered_tweets.length;

    $("#tweetTable").empty();
    filtered_tweets.forEach((tweet, index) => {
        $("#tweetTable").append(tweet.getHTMLTableRow(index + 1));
    });
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector("#searchCount").textContent = 0;
    document.querySelector("#searchText").textContent = '';
    document.querySelector("#textFilter").addEventListener("keyup", (event) => {
        addEventHandlerForSearch();
    });
    loadSavedRunkeeperTweets().then(parseTweets);
});