/**
 * The event information of the current event cycle.
 *
 * @returns {EventInformationResponse} current event cycle information
 */
async function getCurrentEventCycle(): Promise<EventInformationResponse> {
	const response = await fetch("https://api.mcchampionship.com/v1/event", {
		headers: { Accept: "application/json" },
	})

	if (response.status === 200) {
		const json = await response.json()
		json.data.date = new Date(json.data.date)
		return json as EventInformationResponse
	} else {
		throw new Error(
			`Failed to get current event: got status code ${response.status}`
		)
	}
}

type EventInformationResponse = {
	/** The HTTP Response Code */
	code: number
	/** The reason for the response, if applicable */
	reason: null | string
	/** An object containing the event information */
	data: EventInformationData
}

type EventInformationData = {
	/** The date of the next MCC in the form of a JavaScript `Date` object */
	date: Date
	/** The episode number (or name) of the next MCC */
	event: string
	/** URL to the YouTube embed of the update video published by Noxcrew */
	updateVideo: string
}

export { getCurrentEventCycle, EventInformationResponse, EventInformationData }
