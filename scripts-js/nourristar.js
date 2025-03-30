const { writeFile } = require('node:fs/promises')
const tokens = require('../build/tokens/index')

const tokensToCss = (object = {}, base = `-`) =>
    Object.entries(object).reduce((css, [key, value]) => {
        let newBase = base + `-${key}`
        if (typeof value !== 'object') {
            return css + newBase + `: ${value};\n`
        }
        return css + tokensToCss(value, newBase)
    }, ``)

const saveTokens = async (filepath, filename, tokens, filetype) => {
    try {
        await writeFile(`${filepath}/${filename}.${filetype}`, tokens)
    } catch (e) {
        console.log('There was an error while saving a file.\n', e)
    }
}

try {
    const cssVariables = tokensToCss(tokens)
    const cssClass = `:root {\n${cssVariables.replaceAll('--', '  --')}}\n`
    saveTokens('build', 'tokens', cssClass, 'css')
    saveTokens('src', 'tokens', cssClass, 'css')
    const scssTokenClass = cssVariables
        .replace(/:.*$/gm, '')
        .replace(/^(?=-).*$/gm, (line) => {
            return '$' + line.replace(/--/, '') + ': var(' + line + ');'
        })
    const scssMapClass = `$token-map: (\n${cssVariables
        .replace(/:.*$/gm, '')
        .replace(/^(?=-).*$/gm, (line) => {
            return "'-" + line.replace(/--/, '') + "': var(" + line + '),'
        })}\n)`
    saveTokens('src/styles', 'tokens', scssTokenClass, 'scss')
    saveTokens('src/styles', 'token-map', scssMapClass, 'scss')
} catch (e) {
    console.log(
        'Provide a correct argument - a relative path to design tokens.\n',
        e
    )
}
