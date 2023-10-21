import { Team } from "../types"

/**
 * A list of all participants in this event cycle
 *
 * @returns {ParticipantResponse} all participants in this event cycle
 */
async function getParticipants(): Promise<ParticipantResponse> {
	const response = await fetch(
		"https://api.mcchampionship.com/v1/participants",
		{ headers: { Accept: "application/json" } }
	)

	if (response.status === 200) {
		return await response.json()
	} else {
		throw new Error(
			`Failed to get participants: got status code ${response.status}`
		)
	}
}

/**
 * A list of all participants in the given team in this event cycle
 *
 * @param {Team} team
 * @returns {ParticipantTeamResponse} all participants in the given team in this event cycle
 */
async function getParticipantsOfTeam(
	team: Team
): Promise<ParticipantTeamResponse> {
	const response = await fetch(
		`https://api.mcchampionship.com/v1/participants/${team}`,
		{ headers: { Accept: "application/json" } }
	)

	if (response.status === 200) {
		return await response.json()
	} else {
		throw new Error(
			`Failed to get participants of team "${team}": got status code ${response.status}`
		)
	}
}

type ParticipantResponse = {
	/** The HTTP Response Code */
	code: number
	/** The reason for the response, if applicable */
	reason: null | string
	/** An object containing the participants */
	data: ParticipantData
}

type ParticipantData = {
	[key in Team]: IndividualParticipantData[]
}

type IndividualParticipantData = {
	/** The participant's Minecraft username */
	username: string
	/** The participant's Minecraft UUID */
	uuid: string
	/** The link to the participant's livestream */
	stream: string
}

type ParticipantTeamResponse = {
	/** The HTTP Response Code */
	code: number
	/** The reason for the response, if applicable */
	reason: null | string
	/** An array containing the participants */
	data: IndividualParticipantData[]
}

export {
	getParticipants,
	getParticipantsOfTeam,
	ParticipantResponse,
	ParticipantData,
	IndividualParticipantData,
	ParticipantTeamResponse,
}
