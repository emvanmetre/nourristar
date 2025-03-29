const sass = require('sass')
const path = require('path')
const fs = require('fs')
const { writeFile } = require('node:fs/promises')

const saveTokens = async (result) => {
    try {
        await writeFile(`build/style.css`, result)
        await writeFile(`src/style.css`, result)
    } catch (e) {
        console.log('There was an error while saving a file.\n', e)
    }
}

try {
    let result = '@import "./tokens.css";'
    fs.readdir(path.join('src/styles/'), function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            result =
                result +
                sass.compile(`src/styles/${file}`, { style: 'compressed' }).css
        })

        saveTokens(result)
    })
} catch (e) {
    console.log('error getting files')
}
