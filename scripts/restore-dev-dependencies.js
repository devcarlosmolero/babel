import { writeFileSync } from 'fs'
import path from 'path'
import packageJson from '../package.json' with { type: 'json' }
import { cwd } from 'process'

const packageJsonPath = path.join(cwd(), 'package.json')

const dependenciesToRestore = {
    '@cloudflare/workerd-windows-64': '^1.20250313.0',
    '@rollup/rollup-win32-x64-msvc': '^4.35.0',
    'esbuild-windows-64': '^0.15.18',
}

Object.assign(packageJson.devDependencies, dependenciesToRestore)

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
    encoding: 'utf8',
    flag: 'w',
})
console.log('Restored platform dependant dependencies.')
