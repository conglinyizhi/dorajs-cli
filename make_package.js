const uuid = require("uuid")
module.exports = {
    create() {
        return package_json
    }
}

let package_json = {
    uuid: uuid.v4(),
    name: `dorajs-${global.data.Package_Name}`,
    version: "0.0.1",
    displayName: global.data.Addon_Name,
    icon: "assets/icon.png",
    prefs: "assets/prefs.png",
    main: "main.js",
    license: "UNLICENSED",
    author: {
        name: global.data.Author
    },
    homepage: "",
    keywords: ["Dora.js"],
    engines: `>=${global.data.FarmeworkVersion}`,
    contributes: {
        search: null
    },
    dependencies: {}
}