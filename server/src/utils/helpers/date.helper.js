export default {
	addMinutes(minutes) {
		const date = new Date;
		date.setMinutes(date.getMinutes() + minutes);
		return date;
	},
	addDays(days) {
		const date = new Date;
		date.setDate(date.getDate() + days);
		return date;
	},
	expiredDate(compareDate, currentDate = new Date) {
		return compareDate < currentDate
	}
}