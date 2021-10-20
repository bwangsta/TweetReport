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
        if (this.text.toLowerCase().includes("just")) {
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
        if (this.source === 'completed_event') {
            if (this.text.toLowerCase().includes("ski run")) {
                return "ski run";
            }
            else if (this.text.toLowerCase().includes(" run") || (this.text.toLowerCase().includes("ran"))) {
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
            else if (this.text.toLowerCase().includes("swim")) {
                return "swim";
            }
            else if (this.text.toLowerCase().includes("activity")) {
                return "activity";
            }
            else if (this.text.toLowerCase().includes("skate")) {
                return "skate";
            }
            else if (this.text.toLowerCase().includes("row")) {
                return "row";
            }
            else if (this.text.toLowerCase().includes("chair ride")) {
                return "chair ride";
            }
            else if (this.text.toLowerCase().includes("freestyle")) {
                return "free style";
            }
            else if (this.text.toLowerCase().includes("pilates")) {
                return "pilates";
            }
            else if (this.text.toLowerCase().includes("boxing")) {
                return "boxing";
            }
            else if (this.text.toLowerCase().includes("sports")) {
                return "sports";
            }
            else if (this.text.toLowerCase().includes("snowboard")) {
                return "snowboard";
            }
            else if (this.text.toLowerCase().includes("dance")) {
                return "dance";
            }
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

    get getDayName(): string {
        let day = "";

        switch (this.time.getDay()) {
            case 0:
                day = "Sunday";
            case 1:
                day = "Monday";
            case 2:
                day = "Tuesday";
            case 3:
                day = "Wednesday";
            case 4:
                day = "Thursday";
            case 5:
                day = "Friday";
            case 6:
                day = "Saturday";
        }

        return day;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}