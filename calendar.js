const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarTable = document.getElementById("calendar").getElementsByTagName("tbody")[0];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function showCalendar(month, year) {
	calendarTable.innerHTML = "";

	
	let calendarHeader = document.createElement("h2");
	calendarHeader.innerText = months[month] + " " + year;
	document.body.insertBefore(calendarHeader, calendarTable);


