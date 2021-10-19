function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }

    tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    let counts = {
        "ski run": 0,
        "run": 0,
        "walk": 0,
        "bike": 0,
        "hike": 0,
        "workout": 0,
        "meditation": 0,
        "yoga": 0,
        "health graph": 0,
        "gym": 0,
        "unknown": 0
    };

    tweet_array.forEach(tweet => {
        switch (tweet.activityType) {
            case "ski run":
                counts["ski run"]++;
                break;
            case "run":
                counts["run"]++;
                break;
            case "walk":
                counts["walk"]++;
                break;
            case "bike":
                counts["bike"]++;
                break;
            case "hike":
                counts["hike"]++;
                break;
            case "workout":
                counts["workout"]++;
                break;
            case "meditation":
                counts["meditation"]++;
                break;
            case "yoga":
                counts["yoga"]++;
                break;
            case "health graph":
                counts["health graph"]++;
                break;
            case "gym":
                counts["gym"]++;
                break;
            default:
                counts["unknown"]++;
        }
    });

    //TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

    activity_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A graph of the number of Tweets containing each type of activity.",
        "data": {
            "values": tweet_array
        }
        //TODO: Add mark and encoding
    };
    vegaEmbed('#activityVis', activity_vis_spec, { actions: false });

    //TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
    //Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedRunkeeperTweets().then(parseTweets);
});