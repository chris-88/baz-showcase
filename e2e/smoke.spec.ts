import { expect, test } from '@playwright/test'

/** The three routes render and carry their headings. Not a pixel comparison. */

test('showcase opens on its title and start button', async ({ page }) => {
  await page.goto('/#/')
  await expect(
    page.getByRole('heading', { level: 1, name: /what if banking started with a conversation/i }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: /start the experience/i })).toBeVisible()
})

test('how it works renders its chapters', async ({ page }) => {
  await page.goto('/#/how-it-works')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
})

test('article renders its title and sources', async ({ page }) => {
  await page.goto('/#/article')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: /sources/i })).toBeVisible()
})
