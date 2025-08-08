import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
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
// Fallback to package.json name when not building in Actions, so local builds for GH Pages get the right base
let packageNameBase = undefined
try {
  const pkgPath = path.resolve(process.cwd(), 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  if (pkg?.name && typeof pkg.name === 'string') {
    packageNameBase = `/${pkg.name.replace(/^\/+|\/+$/g, '')}/`
  }
} catch {}

const computedBase = (() => {
  if (explicitBase) return explicitBase
  if (isGithubActions) return isUserOrOrgPagesRepo ? '/' : `/${repositoryName}/`
  // Local dev/custom domains: always use root for predictable asset paths
  return '/'
})()

export default defineConfig({
  base: computedBase,
  plugins: [react()],
})


