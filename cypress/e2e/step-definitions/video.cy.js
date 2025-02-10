/// <reference types="cypress" />

const { Then, When, And } = require('cypress-cucumber-preprocessor/steps')
const dashboardLocators = require('../../support/elements/dashboard-page.json')

// Upload - Sucesso //

When('carregar um arquivo válido', () => {
	cy.get('#file').selectFile('cypress/fixtures/video_automated_test.mp4', { action: 'drag-drop' })
})

And('clicar em Extrair Imagens', () => {
	cy.get(dashboardLocators.BNT_EXTRACT_FILES).click()
	cy.intercept('/upload').as('upload')
})

Then('o botão de Extrair Imagens deve ficar desabilitado', () => {
	cy.get(dashboardLocators.BNT_EXTRACT_FILES)
		.should('have.attr', 'class')
		.and('contain', 'disabled')
})

And('um arquivo zipado das imagens deve ser retornado para download', () => {
	cy.wait('@upload').then(() => {
		const downloadsFolder = Cypress.config('downloadsFolder')
		cy.readFile(`${downloadsFolder}/download.zip`).should('exist')
	})
})

And('o dashboard deve ser atualizado com o status do arquivo', () => {
	cy.get(dashboardLocators.SECTION_VIDEO_HISTORY).should('contain', 'video_automated_test.mp4')
})

// Upload - Falha //

When('carregar um arquivo inválido', () => {
	cy.get('#file').selectFile('cypress/fixtures/video_automated_test.mpg', { action: 'drag-drop' })
})

And('uma mensagem de erro deve ser apresentada', () => {
	//TODO
})