export default {
	addMinutes(minutes) {
		const date = new Date;
		date.setMinutes(date.getMinutes() + minutes);
		return date;
	},
	expiredDate(compareDate, currentDate = new Date) {
		return compareDate < currentDate
	}
}