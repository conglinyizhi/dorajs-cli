const uuid = require("uuid")
module.exports = {
    create({
        Package_Name, Addon_Name, Author, FarmeworkVersion
    }) {
        return JSON.stringify({
            uuid: uuid.v4(),
            name: `dorajs-${Package_Name || Addon_Name}`,
            version: "0.0.1",
            displayName: Addon_Name,
            icon: "assets/icon.png",
            prefs: "assets/prefs.png",
            main: "main.js",
            license: "UNLICENSED",
            description:"描述？那是啥？ —— 使用脚手架生成的插件",
            author: {
                name: Author
            },
            homepage: "",
            keywords: ["Dora.js"],
            engines: `>=${FarmeworkVersion}`,
            contributes: {
                search: null
            },
            dependencies: {}
        })
    }
}