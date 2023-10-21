import { expect, test, describe } from "bun:test"
import { v1 } from "../src/"

describe("v1", () => {
	test("/event", async () => {
		let result: v1.EventInformationResponse | undefined

		expect(async () => {
			result = await v1.getCurrentEventCycle()
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(typeof result.data.date).toBe("object") // Date is an object internally
		expect(result.code).toBe(200)
	})

	test("/rundown", async () => {
		let result: v1.RundownResponse | undefined

		expect(async () => {
			result = await v1.getRecentEventRundown()
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(result.data.dodgeboltData.NONE).toBeUndefined()
		expect(result.data.dodgeboltData.SPECTATORS).toBeUndefined()
		expect(result.code).toBe(200)
	})

	test("/rundown/:event", async () => {
		expect(async () => {
			await v1.getEventRundown(
				"BOGUS_EVENT_NAME_THAT_SHOULD_NEVER_HAPPEN_UNLESS_NOXCREW_HATE_ME_AND_MY_MENTAL_WELLBEING"
			)
		}).toThrow()

		let result: v1.RundownResponse | undefined
		expect(async () => {
			result = await v1.getEventRundown("1")
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		// Validate that the data is formatted as expected
		expect(result.data.dodgeboltData.NONE).toBeUndefined()
		expect(result.data.dodgeboltData.SPECTATORS).toBeUndefined()
		expect(result.code).toBe(200)

		// Validate known, fixed, data for MCC1
		expect(result.data.dodgeboltData.LIME).toBe(1)
		expect(result.data.eventPlacements.PURPLE).toBe(0)
		expect(result.data.eventScores.PINK).toBe(14941)
		expect(result.data.individualScores["JackSucksAtMC"]).toBe(1208)
		expect(result.data.history[0].multiplier).toBe(1)
		expect(result.data.history[7].game).toBe("MG_SURVIVAL_GAMES")
	})

	test("/participants", async () => {
		let result: v1.ParticipantResponse | undefined

		expect(async () => {
			result = await v1.getParticipants()
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(result.data.AQUA).not.toBeUndefined()
		expect(
			result.data[
				"BOGUS_TEAM_NAME_THAT_SHOULD_NEVER_HAPPEN_UNLESS_NOXCREW_HATE_ME_AND_MY_MENTAL_WELLBEING"
			]
		).toBeUndefined()
		expect(result.code).toBe(200)
	})

	test("/participants/:team", async () => {
		let result: v1.ParticipantTeamResponse | undefined

		expect(async () => {
			result = await v1.getParticipantsOfTeam(v1.Team.AQUA)
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(result.code).toBe(200)

		// Make sure it's an array, that can be empty
		expect(typeof result.data).toBe("object")
		expect(result.data.length).toBeNumber()
	})

	test("/halloffame", async () => {
		let result: v1.HallOfFameResponse | undefined

		expect(async () => {
			result = await v1.getHallOfFame()
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(result.code).toBe(200)
	})

	test("/halloffame/:game", async () => {
		let result: v1.HallOfFameGameResponse | undefined

		expect(async () => {
			result = await v1.getHallOfFameGame(v1.HOFGame.GLOBAL_STATISTICS)
		}).not.toThrow()

		if (result === undefined)
			throw new Error("Result was undefined... somehow") // should never happen (unless something absolutely crazy happens), but stops me from having to put `!!` everywhere

		expect(result.code).toBe(200)
	})
})
