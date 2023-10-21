import { expect, test, describe } from "bun:test"
import { v1 } from "../src"

describe("v1", () => {
	test("/event", async () => {
		const result = await v1.getCurrentEventCycle()

		expect(typeof result.data.date).toBe("object") // Date is an object internally
		expect(result.code).toBe(200)
	})

	test("/rundown", async () => {
		const result = await v1.getRecentEventRundown()

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

	interface GenericUsernameScoreboard {
		[key: string]: number
	}
})
