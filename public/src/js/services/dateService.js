angular
  .module("asteroidsApp")
  .service("DateService", DateService);

function DateService() {
  this.getDate = getDate;

  function getDate(days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 86400000);

    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1 ).toString();
    var day = date.getDate().toString();

    day = day.length < 2 ? "0" + day : day;
    month = month.length < 2 ? "0" + month : month;

    return year + '-' + month + '-' + day;
  }

}