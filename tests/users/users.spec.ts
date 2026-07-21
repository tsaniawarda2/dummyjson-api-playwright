import test, { expect } from "@playwright/test";
import { ENV } from "../../config/env";

test.describe('TS_USER_001: Get All Users', () => {
    test('TC_USERS_001 - Get All Users', async ({ request }) => {
        const response = await request.get('/users')

        const body = await response.json()

        expect(response.status()).toBe(200)
        expect(body.users.length).toBeGreaterThan(0)
        expect(body.total).toBeGreaterThan(0)
    });

    test('TC_USERS_002 - Get all users with parameter (limit, skip, select)', async ({ request }) => {
        const response = await request.get('/users?limit=2&skip=5&select=firstName,age')
        const body = await response.json()

        expect(response.status()).toBe(200)
        expect(body.limit).toBe(2)
        expect(body.skip).toBe(5)
        expect(body.users[0]).toHaveProperty('firstName')
        expect(body.users[0]).toHaveProperty('age')
    })
})

test.describe('TC_USER_002: Get Single User', () => {
    test('TC_USERS_003 - Get user with valid ID', async ({ request }) => {
        const response = await request.get('/users/3')
        const body = await response.json()

        expect(response.status()).toBe(200)
        expect(body.id).toBe(3)
        expect(body.firstName).toBeTruthy()
    })

    test('TC_USERS_004 - Get user with invalid ID', async ({ request }) => {
        const response = await request.get('/users/1000')
        const body = await response.json()

        expect(response.status()).toBe(404)
        expect(body.message).toBe(`User with id '1000' not found`)
    })
})

test.describe('TC_USER_003: Get Current User', () => {
    test('TC_USERS_005 - Get current user with valid token', async ({ request }) => {
        const response = await request.get('/users/me', {
            headers: {
                Authorization: `Bearer ${ENV.ACCESS_TOKEN}`
            }
        })
        const body = await response.json()

        expect(response.status()).toBe(200)
        expect(body.username).toBeTruthy()
    })
    test('TC_USERS_006 - Get current user with invalid token', async ({ request }) => {
        const response = await request.get('/users/me', {
            headers: {
                Authorization: `Bearer invalid-token`
            }
        })
        const body = await response.json()

        expect(response.status()).toBe(401)
        expect(body.message).toBe('Invalid/Expired Token!')
    })
})

