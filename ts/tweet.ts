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
        if (this.text.toLowerCase().includes("completed") || this.text.toLowerCase().includes("just")) {
            return "completed_event";
        }
        else if (this.text.toLowerCase().includes("live")) {
            return "live_event";
        }
        else if (this.text.toLowerCase().includes("achieved")) {
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
        if (this.source != 'completed_event') {
            return "unknown";
        }

        if (this.text.toLowerCase().includes("ski run")) {
            return "ski run";
        }
        else if (this.text.toLowerCase().includes(" run")) {
            return "run";
        }
        else if (this.text.toLowerCase().includes("walk")) {
            return "walk";
        }
        else if (this.text.toLowerCase().includes("bike")) {
            return "bike";
        }
        else if (this.text.toLowerCase().includes("hike")) {
            return "hike";
        }
        else if (this.text.toLowerCase().includes("workout")) {
            return "workout";
        }
        else if (this.text.toLowerCase().includes("meditation")) {
            return "meditation";
        }
        else if (this.text.toLowerCase().includes("yoga")) {
            return "yoga";
        }
        else if (this.text.toLowerCase().includes("health graph")) {
            return "health graph";
        }
        else if (this.text.toLowerCase().includes("gym")) {
            return "gym";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance(): number {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}