/// <reference types="cypress" />

const { Given, Then, When, And } = require('cypress-cucumber-preprocessor/steps')
const loginLocators = require('../../support/elements/login-page.json')
const signupLocators = require('../../support/elements/signup-page.json')
const dashboardLocators = require('../../support/elements/dashboard-page.json')


// Cadastro //
Given('que acessei a página de cadastro', () => {
	cy.visit('/signup')
	cy.title().should('include', 'Signup')
})

When('preencher o formulário corretamente', () => {
	const userId = Math.floor(Math.random() * 100)
	const email = `automated.test${userId}@email.test`
	const password = Math.random().toString(16).substring(2)

	cy.get(signupLocators.INPUT_FIRST_NAME).click()
	cy.get(signupLocators.INPUT_FIRST_NAME).type('Automated')

	cy.get(signupLocators.INPUT_LAST_NAME).click()
	cy.get(signupLocators.INPUT_LAST_NAME).type(`USER-${userId}`)

	cy.get(signupLocators.INPUT_EMAIL).click()
	cy.get(signupLocators.INPUT_EMAIL).type(email)
	
	cy.get(signupLocators.INPUT_PASSWORD).click()
	cy.get(signupLocators.INPUT_PASSWORD).type(password)

	Cypress.env('AUTOMATED_USER', email)
	Cypress.env('USER_SECRET', password)
})

And('clicar em Cadastrar-se', () => {
	cy.get(signupLocators.BTN_SIGNUP).click()
})

Then('o usuário deve ser cadastrado com sucesso', () => {
	cy.get(signupLocators.MSG_SIGNUP_SUCCESS).should('be.visible')
})

//Login //

Given('que acessei a página de login', () => {
	cy.visit('/')
		.title()
		.should('include', 'Login')
})

When('inserir as credenciais', () => {
	const email = Cypress.env('AUTOMATED_USER')
	const password = Cypress.env('USER_SECRET')

	cy.get(loginLocators.INPUT_EMAIL).click()
	cy.get(loginLocators.INPUT_EMAIL).type(email)

	cy.get(loginLocators.INPUT_PASSWORD).click()
	cy.get(loginLocators.INPUT_PASSWORD).type(password)
})

And('clicar em Login', () => {
	cy.get(loginLocators.BTN_LOGIN).click()
})

Then('devo ser redirecionado ao dashboard para upload de vídeo', () => {
	cy.url().should('include', '/upload')
})

// Logout //
Given('que estou logado na plataforma', () => {
	const email = Cypress.env('AUTOMATED_USER')
	const password = Cypress.env('USER_SECRET')

	cy.visit('/')
		.title()
		.should('include', 'Login')

	cy.get(loginLocators.INPUT_EMAIL).click()
	cy.get(loginLocators.INPUT_EMAIL).type(email)
	
	cy.get(loginLocators.INPUT_PASSWORD).click()
	cy.get(loginLocators.INPUT_PASSWORD).type(password)
	
	cy.get(loginLocators.BTN_LOGIN).click()
})

When('clicar em Sair', () => {
	cy.get(dashboardLocators.LINK_LOGOUT).first().click()
})

Then('devo ser redirecionado à página de login', () => {
	cy.title().should('include', 'Login')
})

// Acesso não autorizado //
Given('que acessei a página de upload sem autorização', () => {
	cy.visit('/')
		.title()
		.should('include', 'Login')

	cy.get(loginLocators.INPUT_EMAIL).click()
	cy.get(loginLocators.INPUT_EMAIL).type('automated.invalid@email.com')

	cy.get(loginLocators.INPUT_PASSWORD).click()
	cy.get(loginLocators.INPUT_PASSWORD).type('Inv4lidP@ss')

	cy.get(loginLocators.BTN_LOGIN).click()
})

Then('o sistema deve me negar meu acesso', () => {
	cy.get(loginLocators.MSG_LOGIN_FAILD).should('be.visible')
})