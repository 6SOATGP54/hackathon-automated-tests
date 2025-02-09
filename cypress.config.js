const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		baseUrl: 'http://localhost:5000',
		specPattern: 'cypress/e2e/**/*.feature',
		log: true,
		setupNodeEvents(on, config) {
			on('file:preprocessor', cucumber())
			return config
		},
	},
})
