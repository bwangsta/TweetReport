function countActivityTypes(tweet_array) {
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
        "swim": 0,
        "activity": 0,
        "skate": 0,
        "row": 0,
        "chair ride": 0,
        "freestyle": 0,
        "pilates": 0,
        "boxing": 0,
        "sports": 0,
        "snowboard": 0,
        "dance": 0,
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
            case "swim":
                counts["swim"]++;
                break;
            case "activity":
                counts["activity"]++;
                break;
            case "skate":
                counts["skate"]++;
                break;
            case "row":
                counts["row"]++;
                break;
            case "chair ride":
                counts["chair ride"]++;
                break;
            case "freestyle":
                counts["freestyle"]++;
                break;
            case "pilates":
                counts["pilates"]++;
                break;
            case "boxing":
                counts["boxing"]++;
                break;
            case "sports":
                counts["sports"]++;
                break;
            case "snowboard":
                counts["snowboard"]++;
                break;
            case "dance":
                counts["dance"]++;
                break;
            case "unknown":
                counts["unknown"]++;
        }
    });

    return counts;
}


// gets the top 3 activities
function top3Activities(activityCounts) {
    const sortedCounts = Object.entries(activityCounts).sort(([, a], [, b]) => b - a);

    return sortedCounts.slice(0, 3);
}


function createDistancesArray(tweet_array, top3) {
    let distancesArray = []
    tweet_array.forEach((tweet) => {
        distancesObject = {};
        switch (tweet.activityType) {
            case top3[0][0]:
            case top3[1][0]:
            case top3[2][0]:
                distancesObject["activity_type"] = tweet.activityType;
                distancesObject["distance"] = tweet.distance
                distancesObject["day"] = tweet.time.toLocaleString("en-US", { weekday: "short" });
                distancesArray.push(distancesObject);
                break;
        }
    });

    return distancesArray;
}


function findMaxMin(distancesArray) {
    let maxObj = { "type": "", "distance": Number.NEGATIVE_INFINITY };
    let minObj = { "type": "", "distance": Number.POSITIVE_INFINITY };

    distancesArray.forEach((distances) => {
        if (distances["distance"] > maxObj["distance"]) {
            maxObj = distances;
        }
        else if (distances["distance"] < minObj["distance"] && distances["distance"] !== 0) {
            minObj = distances;
        }
    });

    return [minObj, maxObj];
}


function longestActivityDay(tweet_array, type) {
    let weekdayCount = 0;
    let weekendCount = 0;
    tweet_array.forEach((tweet) => {
        if (tweet.activityType === type) {
            if (tweet.typeOfDay === "weekend") {
                weekendCount++;
            }
            else {
                weekdayCount++;
            }
        }
    });

    return weekdayCount > weekendCount ? "weekdays" : "weekends";
}


function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }

    tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    let counts = countActivityTypes(tweet_array);
    document.querySelector("#numberActivities").textContent = Object.keys(counts).length - 1;

    let top3 = top3Activities(counts);
    document.querySelector("#firstMost").textContent = top3[0][0];
    document.querySelector("#secondMost").textContent = top3[1][0];
    document.querySelector("#thirdMost").textContent = top3[2][0];

    let distancesArray = createDistancesArray(tweet_array, top3);
    console.log(distancesArray);
    let minMaxArray = findMaxMin(distancesArray);

    document.querySelector("#shortestActivityType").textContent = minMaxArray[0]["activity_type"];
    document.querySelector("#longestActivityType").textContent = minMaxArray[1]["activity_type"];

    let day = longestActivityDay(tweet_array, minMaxArray[1]["activity_type"]);
    document.querySelector("#weekdayOrWeekendLonger").textContent = day;


    //TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
    let activities_array = [];
    tweet_array.forEach((tweet) => {
        if (tweet.source === "completed_event") {
            activities_array.push({ "activity_type": tweet.activityType });
        }
    });

    activity_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A graph of the number of Tweets containing each type of activity.",
        "data": {
            "values": activities_array
        },
        //TODO: Add mark and encoding
        "mark": "bar",
        "encoding": {
            "x": { "field": "activity_type", "type": "nominal", "title": "Types of Activities" },
            "y": { "aggregate": "count", "field": "activity_type", "type": "quantitative", "title": "Count" }
        }
    };

    distance_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A graph of the number of Tweets containing each type of activity.",
        "data": {
            "values": distancesArray
        },
        //TODO: Add mark and encoding
        "mark": "point",
        "encoding": {
            "x": { "field": "day", "type": "ordinal", "title": "Time (day)", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
            "y": { "field": "distance", "type": "quantitative" },
            "color": { "field": "activity_type" }
        }
    };

    mean_distance_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A graph of the number of Tweets containing each type of activity.",
        "data": {
            "values": distancesArray
        },
        //TODO: Add mark and encoding
        "mark": "point",
        "encoding": {
            "x": { "field": "day", "type": "ordinal", "title": "Time (day)", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
            "y": { "field": "distance", "type": "quantitative", "aggregate": "mean" },
            "color": { "field": "activity_type" }
        }
    };


    vegaEmbed('#activityVis', activity_vis_spec, { actions: false });
    vegaEmbed('#distanceVis', distance_vis_spec, { actions: false });
    vegaEmbed('#distanceVisAggregated', mean_distance_vis_spec, { actions: false });

    //TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
    //Use those visualizations to answer the questions about which activities tended to be longest and when.

    let btn = document.querySelector("#aggregate");
    let distanceGraph = document.querySelector("#distanceVis");
    let meanDistanceGraph = document.querySelector("#distanceVisAggregated");
    distanceGraph.style.display = "none";
    meanDistanceGraph.style.display = "none";

    btn.addEventListener("click", function () {
        if (distanceGraph.style.display === "none" && meanDistanceGraph.style.display === "none") {
            distanceGraph.style.display = "block";
            btn.textContent = "Show All Activities";
        }
        else if (distanceGraph.style.display === "block") {
            distanceGraph.style.display = "none";
            meanDistanceGraph.style.display = "block";
            btn.textContent = "Show means";
        }
        else {
            distanceGraph.style.display = "block";
            meanDistanceGraph.style.display = "none";
            btn.textContent = "Show All Activities";
        }
    })
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedRunkeeperTweets().then(parseTweets);
});