function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

    let lastTweet= tweet_array[0];
    let firstTweet = tweet_array[tweet_array.length-1];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#firstDate').text(firstTweet.time.toLocaleDateString('en-US', options));
    $('#lastDate').text(lastTweet.time.toLocaleDateString('en-US', options));

    let completed = 0;
    let live = 0;
    let achievements = 0;
    let miscellaneous = 0;
    let userTweets = 0;

    tweet_array.forEach((tweet) => {
        if (tweet.source === "completed_event") {
            completed++;

            if (tweet.written === true) {
                userTweets++;
            }
        }
        else if (tweet.source === "live_event") {
            live++;
        }
        else if (tweet.source === "achievement") {
            achievements++;
        }
        else {
            miscellaneous++;
        }
    });

    $(".completedEvents").text(completed);
    $(".liveEvents").text(live);
    $(".achievements").text(achievements);
    $(".miscellaneous").text(miscellaneous);
    $(".written").text(userTweets);

    let completedPct = ((completed / tweet_array.length) * 100).toFixed(2) + "%";
    let livePct = ((live / tweet_array.length) * 100).toFixed(2) + "%";
    let achievementsPct = ((achievements / tweet_array.length) * 100).toFixed(2) + "%";
    let miscellaneousPct = ((miscellaneous / tweet_array.length) * 100).toFixed(2) + "%";
    let userTweetsPct = ((userTweets / tweet_array.length) * 100).toFixed(2) + "%";

    $(".completedEventsPct").text(completedPct);
    $(".liveEventsPct").text(livePct);
    $(".achievementsPct").text(achievementsPct);
    $(".miscellaneousPct").text(miscellaneousPct);
    $(".writtenPct").text(userTweetsPct);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedRunkeeperTweets().then(parseTweets);
});