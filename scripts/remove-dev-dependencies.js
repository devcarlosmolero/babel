import { writeFileSync } from 'fs'
import path from 'path'
import packageJson from '../package.json' with { type: 'json' }
import { cwd } from 'process'

const packageJsonPath = path.join(cwd(), 'package.json')

const dependenciesToRemove = [
    '@cloudflare/workerd-windows-64',
    '@rollup/rollup-win32-x64-msvc',
    'esbuild-windows-64',
]

dependenciesToRemove.forEach((dep) => {
    delete packageJson.devDependencies[dep]
})

console.log(packageJsonPath)
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
    encoding: 'utf8',
    flag: 'w',
})
console.log('Removed platform dependant dependencies.')
