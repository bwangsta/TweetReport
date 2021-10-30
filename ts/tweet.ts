class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source(): string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        let tweet = this.text.toLowerCase();
        if (tweet.includes("just completed") || tweet.includes("just posted")) {
            return "completed_event";
        }
        else if (tweet.includes("live")) {
            return "live_event";
        }
        else if (tweet.includes("achieved")) {
            return "achievement";
        }

        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written(): boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes("@Runkeeper")) {
            return false;
        }

        return true;
    }

    get writtenText(): string {
        if (!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType(): string {
        if (this.source === 'completed_event') {
            let activityIndex = 0;
            let splitTweet = this.text.toLowerCase().split(" ");

            if (splitTweet.includes("km")) {
                activityIndex = splitTweet.indexOf("km") + 1;
            }
            else if (splitTweet.includes("mi")) {
                activityIndex = splitTweet.indexOf("mi") + 1;
            }
            else if (splitTweet.includes("in")) {
                activityIndex = splitTweet.indexOf("in") - 1;
            }
            else if (splitTweet.includes("with")) {
                activityIndex = splitTweet.indexOf("with") - 1;
            }

            return splitTweet[activityIndex];
        }
        //TODO: parse the activity type from the text of the tweet
        return "unknown";
    }

    get distance(): number {
        if (this.source === 'completed_event') {
            //TODO: parse the distance from the text of the tweet
            const regex = /\d+\.\d{2}/g;
            let dist = this.text.match(regex);

            if (dist !== null) {
                if (dist[0] !== null) {
                    if (this.text.includes(" km ")) {
                        let miDist = parseFloat(dist[0]) / 1.609;
                        return miDist;
                    }
                    else {
                        return parseFloat(dist[0]);
                    }
                }
            }
        }

        return 0;
    }

    get typeOfDay(): string {
        let day = this.time.getDay();

        if (day === 0 || day === 6) {
            return "weekend";
        }

        return "weekday";
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        const regex = /https:\/\/t.co\/[a-zA-Z0-9]{10}/g;

        let index = `<td>${rowNumber}</td>`;
        let activity_type = `<td>${this.activityType}</td>`;
        let tweet = `<td>${this.text}</td>`;

        let linkPattern = this.text.match(regex);
        if (linkPattern !== null) {
            linkPattern.forEach((link) => {
                tweet = tweet.replace(link, `<a href=${link}>${link}</a>`);
            });
        }

        return `<tr>${index}${activity_type}${tweet}</tr>`;
    }
}