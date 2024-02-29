require('dotenv/config')

function exists(value) {
    return (value !== undefined) && (value !== null) && (value !== '')
}

function parseIfExists(value) {
    return exists(value) ? JSON.parse(value) : value
}

const CONFIGS = {
    APP_ID: process.env.APP_ID,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    GUILD_ID: process.env.GUILD_ID,
    ACTIVE_ROLE: process.env.ACTIVE_ROLE,
    ERROR_CHANNEL: process.env.ERROR_CHANNEL,
    DEVELOPER_ROLE: process.env.DEVELOPER_ROLE,
    USE_FIREBASE: parseIfExists(process.env.USE_FIREBASE),
    DATABASE_URL: process.env.DATABASE_URL,
}

function throwIfMissingConfig(name) {
    if (!exists(CONFIGS[name])) {
        throw new Error(`Missing env var: ${name}`)
    }
}

throwIfMissingConfig('DISCORD_TOKEN')
throwIfMissingConfig('PUBLIC_KEY')
throwIfMissingConfig('GUILD_ID')
throwIfMissingConfig('ACTIVE_ROLE')
throwIfMissingConfig('USE_FIREBASE')

if (CONFIGS.USE_FIREBASE) {
    throwIfMissingConfig('DATABASE_URL')
    console.log('Current storage: Firebase')
} else {
    console.log('Current storage: Local filesystem (CSV)')
}

module.exports = {
    CONFIGS,
}