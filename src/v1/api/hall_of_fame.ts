import { HOFGame } from "../types"

/**
 * The entire legacy Hall of Fame.
 *
 * @deprecated since API v1.3.0 - https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.3.0
 * @returns {HallOfFameResponse} the entire legacy Hall of Fame
 */
async function getHallOfFame(): Promise<HallOfFameResponse> {
	const response = await fetch(
		"https://api.mcchampionship.com/v1/halloffame",
		{ headers: { Accept: "application/json" } }
	)

	if (response.status === 200) {
		return await response.json()
	} else {
		throw new Error(
			`Failed to get Hall of Fame: got status code ${response.status}`
		)
	}
}

/**
 * All statistics in the legacy Hall of Fame for the given game
 *
 * @deprecated since API v1.3.0 - https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.3.0
 * @param {HOFGame} game
 * @returns {HallOfFameGameResponse} all statistics in the legacy Hall of Fame for the given game
 */
async function getHallOfFameGame(
	game: HOFGame
): Promise<HallOfFameGameResponse> {
	const response = await fetch(
		`https://api.mcchampionship.com/v1/halloffame/${game}`,
		{ headers: { Accept: "application/json" } }
	)

	if (response.status === 200) {
		return await response.json()
	} else {
		throw new Error(
			`Failed to get Hall of Fame for game "${game}": got status code ${response.status}`
		)
	}
}

type HallOfFameResponse = {
	/** The HTTP Response Code */
	code: number
	/** The reason for the response, if applicable */
	reason: null | string
	/** An object containing the statistics for the whole event as displayed in the Hall of Fame */
	data: HallOfFameData
}

type HallOfFameGameResponse = {
	/** The HTTP Response Code */
	code: number
	/** The reason for the response, if applicable */
	reason: null | string
	/** An object containing the statistics for the given game */
	data: HallOfFameItem
}

type HallOfFameData = {
	[key in HOFGame]: HallOfFameItem
}

type HallOfFameItem = {
	[key in string]: {
		/** Whether the record has changed hands */
		changedHands: boolean
		/** Honestly, not a clue */
		placement: number
		/** Player username that currently holds the record */
		player: string
		/** The value of the record */
		value: number
	}
}

export {
	getHallOfFame,
	getHallOfFameGame,
	HallOfFameResponse,
	HallOfFameGameResponse,
	HallOfFameData,
	HallOfFameItem,
}
