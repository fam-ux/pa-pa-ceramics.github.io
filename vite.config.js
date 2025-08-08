import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Configure base path for GitHub Pages when building in CI.
// - For user/org pages (repo name ends with ".github.io"), base should be "/".
// - For project pages, base should be "/<repo>/".
// - For local dev or custom domains, base should be "/".
const [repositoryOwner = '', repositoryName = ''] = process.env.GITHUB_REPOSITORY?.split('/') ?? []
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const isUserOrOrgPagesRepo =
  repositoryOwner && repositoryName && repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`
const explicitBase = process.env.VITE_BASE && process.env.VITE_BASE.length > 0 ? process.env.VITE_BASE : undefined
const computedBase =
  explicitBase ?? (isGithubActions ? (isUserOrOrgPagesRepo ? '/' : `/${repositoryName}/`) : '/')

export default defineConfig({
  base: computedBase,
  plugins: [react()],
})


