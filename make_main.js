module.exports = {
    create() {
        return data
    }
}
let lib = "";
if (global.data.data.UseAxiosLib) {
    lib = `//dora-cli make\n\nglobal.axios = $http;`
}
const data = `
if (typeof $dora == 'undefined') {
    console.error('This project runs only in Dora.js.')
    console.error('Please visit https://dorajs.com/ for more information.')
    process.exit(-1)
}
console.info('Congratulation, your addon runs successfully!')

${lib}
`
