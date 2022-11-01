// lifted/trimmed from https://github.com/marnusw/date-fns-tz/blob/1d871f2c7ca76733552d5e22371a5fedcbe3c49f/src/_lib/tzTokenizeDate/index.js

/**
 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
 * `date` as it will be rendered in the `timeZone`.
 */
export default (date, timeZone) => partsOffset(getDateTimeFormat(timeZone), date)

const typeToPos = {
	year: 0,
	month: 1,
	day: 2,
	hour: 3,
	minute: 4,
	second: 5,
}

function partsOffset(dtf, date) {
	const formatted = dtf.formatToParts(date)
	const filled = []
	for (let i = 0; i < formatted.length; i++) {
		const pos = typeToPos[formatted[i].type]

		if (pos >= 0) {
			filled[pos] = parseInt(formatted[i].value, 10)
		}
	}
	return filled
}

// Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
// to get deterministic local date/time output according to the `en-US` locale which
// can be used to extract local time parts as necessary.
const dtfCache = {}
function getDateTimeFormat(timeZone) {
	if (!dtfCache[timeZone]) {
		dtfCache[timeZone] = new Intl.DateTimeFormat(`en-US`, {
			hourCycle: `h23`,
			timeZone,
			year: `numeric`,
			month: `2-digit`,
			day: `2-digit`,
			hour: `2-digit`,
			minute: `2-digit`,
			second: `2-digit`,
		})
	}

	return dtfCache[timeZone]
}
