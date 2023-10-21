type GenericTeamScoreboard = {
    [key in Team]: number
}

type GenericUsernameScoreboard = {
    [key in string]: number
}

type Team = "AQUA" | "BLUE" | "CYAN" | "GREEN" | "LIME" | "ORANGE" | "PINK" | "PURPLE" | "RED" | "YELLOW" | "SPECTATORS" | "NONE" | string

type Game = "MG_ACE_RACE" | "MG_PARKOUR_WARRIOR" | "MG_FOOT_RACE" | "MG_ROCKET_SPLEEF_OLD" | "MG_LOCKOUT_BINGO" | "MG_HOLE_IN_THE_WALL" | "MG_SKYBLOCKLE" | "MG_TGTTOSAWAF" | "MG_BATTLE_BOX" | "MG_BUILD_MART" | "MG_BINGO_BUT_FAST" | "MG_SANDS_OF_TIME" | "MG_PARKOUR_TAG" | "MG_SKY_BATTLE" | "MG_GRID_RUNNERS" | "MG_ROCKET_SPLEEF" | "MG_MELTDOWN" | string

export {
    GenericTeamScoreboard,
    GenericUsernameScoreboard,
    Team,
    Game
}