var cron = require('node-cron');
const moment = require("moment");

const { removeStory } = require('./stories');

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

//Node cron run Every 5 Second
cron.schedule("*/5 * * * * *", () => {
    // console.log("remove stories in 24 hours : ", moment().format("DD-MM-YYYY hh:mm:ss A"));
    removeStory();
});