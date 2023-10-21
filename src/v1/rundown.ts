import { Game, GenericTeamScoreboard, GenericUsernameScoreboard, Team } from "./types"

/**
 * A rundown of the most recent event.
 * 
 * @returns {RundownResponse} recent event rundown
 */
async function getRecentEventRundown(): Promise<RundownResponse> {
    const response = await fetch("https://api.mcchampionship.com/v1/rundown", { headers: { "Accept": "application/json" } })

    if(response.status === 200) {
        return await response.json()
    }

    else {
        throw new Error(`Failed to get recent event rundown: got status code ${response.status}`)
    }
}

async function getEventRundown(event: string): Promise<RundownResponse> {
    const response = await fetch(`https://api.mcchampionship.com/v1/rundown/${event}`, { headers: { "Accept": "application/json" } })

    if(response.status === 200) {
        return await response.json()
    }

    else {
        throw new Error(`Failed to get event rundown for event "${event}": got status code ${response.status}`)
    }
}

type RundownResponse = {
    /** The HTTP Response Code */
    code: number,
    /** The reason for the response, if applicable */
    reason: null | string,
    /** An object containing a rundown of scores and the played games from the given event cycle */
    data: RundownData
}

type RundownData = {
    /** The scores of the two participants of Dodgebolt */
    dodgeboltData: {
        [key in Team]: number
    },
    /** The placement of all 10 teams in the whole event */
    eventPlacements: GenericTeamScoreboard,
    /** The scores of all 10 teams in the whole event */
    eventScores: GenericTeamScoreboard
    /** The scores of each individual in the whole event */
    individualScores: GenericUsernameScoreboard,
    /** 
     * The games played during the event and a breakdown of scores for each one.
     * Note that this list appears to have the possibility of being unsorted, so you may want to sort it by the `index` property for prosperity.
     */
    history: HistoryData[],
    /** The creators who played in the event */
    creators: {
        [key in Team]: string[]
    }
}

type HistoryData = {
    /** The game that was played */
    game: Game
    /** The score multiplier for the given game */
    multiplier: number,
    /** The index for the given game */
    index: number,
    /** The placement of all 10 teams in the whole event. **Some early events did not record this data** */
    eventPlacements?: GenericTeamScoreboard,
    /** The scores of all 10 teams in the whole event. **Some early events did not record this data** */
    eventScores?: GenericTeamScoreboard
    /** The placement of all 10 teams in this game. **Some early events did not record this data** */
    gamePlacements?: GenericTeamScoreboard,
    /** The scores of all 10 teams in this game. **Some early events did not record this data** */
    gameScores?: GenericTeamScoreboard,
    /** The scores of all individuals in this game. **Some early events did not record this data** */
    individualScores?: GenericUsernameScoreboard
}

export {
    getRecentEventRundown,
    getEventRundown,

    RundownResponse,
    RundownData
}