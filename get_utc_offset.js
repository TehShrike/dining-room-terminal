import tz_tokenize_date from './tz_tokenize_date.js'

// from https://github.com/bsvetlik/date-fns-tz/blob/eb2bb6209931c5abe1cfcdf2faaa41de5493648a/src/_lib/tzParseTimezone/index.js#L86-L98
export const get_timezone_offset_for_point_in_time = (iana_timezone_string, date_object) => {
	const [ year, month, day, hour, minute, second ] = tz_tokenize_date(
		date_object,
		iana_timezone_string,
	)

	const asUTC = Date.UTC(year, month - 1, day, hour, minute, second, date_object.getMilliseconds())

	return asUTC - date_object.getTime()
}
