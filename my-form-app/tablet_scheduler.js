const schedule = require('node-schedule');
const sendEmail=require("./send_email");
const emailTemplate=require("./email_template");

const tabletScheduler = (data) => {
    const { 'start-date': startDate, 'start-time': startTime, tablet1, tablet2, tablet3, 'tablet1-time': tablet1Time, 'tablet2-time': tablet2Time, 'tablet3-time': tablet3Time } = data;

    if (!startDate || !startTime) {
        console.error('Invalid date or time input');
        return;
    }

    const [year, month, day] = startDate.split('-').map(Number);
    const [hour, minute] = startTime.split(':').map(Number);

    const dateTime = new Date(year, month - 1, day, hour, minute, 0);

    console.log('Scheduled time:', dateTime);
    console.log('Tablet 1:', tablet1, 'Times:', tablet1Time);
    console.log('Tablet 2:', tablet2, 'Times:', tablet2Time);
    console.log('Tablet 3:', tablet3, 'Times:', tablet3Time);

    schedule.scheduleJob(dateTime, function () {
        console.log('Scheduled job executed at:', new Date());
        const html=emailTemplate();
        sendEmail("eppranavudupa@gmail.com","remainder",html);
    });
};

module.exports = tabletScheduler;
