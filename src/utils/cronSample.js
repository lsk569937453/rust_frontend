export default class expressionUtils {
    static arr = [
        {"cron": "0 0 2 1 * ? *", "desc": "Indicates that the task is adjusted at 2 am on the 1st of each month."},
        {"cron": "0 15 10 ? *", "desc": "MON-FRI means to perform homework every day from 10:15 am Monday to Friday."},
        {
            "cron": "0 15 10 ? 6L 2002-2006",
            "desc": "Represents the implementation of the last Friday of each month of 2002-2006 at 10:15 am"
        },
        {"cron": "0 0 10,14,16 * * ?", "desc": "Every day at 10 am, 2 pm, 4 pm"},
        {"cron": "0 0/30 9-17 * * ?", "desc": "Every half hour during nine to five working hours"},
        {"cron": "0 0 12 ? *", "desc": "WED means every Wednesday at 12 noon"},
        {"cron": "0 0 12 * * ?", "desc": "Trigger every day at 12 noon"},
        {"cron": "0 15 10 ? * *", "desc": "Trigger every day at 10:15 am"},
        {"cron": "0 15 10 * * ? 2005", "desc": "2005 every day at 10:15 am"},
        {"cron": "0 * 14 * * ?", "desc": "Trigger every 1 minute between 2 pm and 2:59 pm"},
        {"cron": "0 0/5 14 * * ?", "desc": "Trigger every 5 minutes between 2 pm and 2:55 pm"},
        {"cron": "0 0/5 14,18 * * ?", "desc": "Trigger every 5 minutes between 2 pm and 2:55 pm and 6 pm to 6:55 pm"},
        {"cron": "0 15 10 L * ?", "desc": "Trigger at 10:15 am on the last day of each month"},
        {"cron": "0 15 10 ? * 6L", "desc": "Trigger at 10:15 am on the last Friday of each month"},
        {"cron": "0 15 10 ? * 6#3", "desc": "Trigger at 10:15 am on the third Friday of each month"},


    ];

    static getAllExpression() {
        return expressionUtils.arr

    }
}
