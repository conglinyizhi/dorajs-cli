const fs = require("fs");
const uuid = require("uuid");
const inquirer = require('inquirer');
const path = require("path")

console.log("欢迎使用 Dora.js 插件脚手架")
console.log("Welcome to use Dora.js Addons cil")
console.log("============================")

inquirer.prompt([
    input_text("Addon_Name", "插件展示的名字："),
    input_bool("Git", "是否创建 Git 仓库？"),
    input_checkbox("JSLibs", "使用几个常用的库吗？", ["cheerio", "axios", "art-template"]),
    input_list("FarmeworkVersion", "基于哪个版本的 Dora.js 进行开发？", ["1.8.1", "1.7.0", "1.6.1", "1.5.1", "1.4.0", "1.3.0", "1.2.4", "1.2.1", "1.1.2"]),
    input_text("Author", "作者昵称？")
]).then(answers => {
    let QList = [];
    if (answers.Addon_Name.match(/[^0-9a-z]/)) {
        QList.push({
            type: 'input',
            message: "请输入 URL 友好的名字，作为 npm 包名，我们将会添加 \"dora_\" 前缀（数字、小写字母、下划线）",
            name: "Package_Name",
            validate: input => {
                if (!input && !canNull) return '抱歉，不能为空';
                if (input.match(/[^0-9a-z_]/)) return '抱歉，只支持数字、小写字母、下划线';
                // config.name = input; // 更新对象中属性的数据
                return true;
            }
        })
    }
    if (answers.JSLibs.join(";;").match(/;?axios;?/)) {
        QList.push(input_bool("UseAxiosLib", "是否使用内部 $http 接口代替 axios？"))
    }
    global.data = answers;
    return inquirer.prompt(QList)
}).then(answers2 => {
    Object.keys(answers2).forEach(i => {
        global.data[i] = answers2[i]
    })
    console.log(global.data)
    // {
    //     Addon_Name: '丛林',
    //     Git: true,
    //     JSLibs: [ 'axios', 'art-template' ],   
    //     FarmeworkVersion: '1.8.1',
    //     Author: '丛林',
    //     Package_Name: 'clyzhi',
    //     UseAxiosLib: true
    //   }

    global.data.JSLibs = global.data.JSLibs.join(";").split(/;?axios;?/).join("").split(";")
    const fileRoot = path.join(process.cwd(), global.data.Package_Name || global.data.Addon_Name);
    fs.mkdirSync(fileRoot)
    fs.writeFileSync(path.join(fileRoot, "package.json"), require("./make_package").create(global.data),'utf8');
    fs.writeFileSync(path.join(fileRoot, ".gitignore"), require("./make_gitignore").create(),'utf8');
    fs.writeFileSync(path.join(fileRoot, "main.js"),require("./make_main").create(global.data),'utf8');
    fs.mkdirSync(path.join(fileRoot,"components"))
    fs.copyFileSync(path.join(__dirname,"make_index.js"),path.join(fileRoot,"components","index.js"))
    fs.mkdirSync(path.join(fileRoot,"assets"))
    fs.copyFileSync(path.join(__dirname,"icon.png"),path.join(fileRoot,"assets","icon.png"))
    fs.writeFileSync(path.join(fileRoot,"assets" ,"prefs.json"),"{}");
}).catch(error => {
    console.error("出错了……")
    console.log(error)
})

function input_text(name, message, canNull = false) {
    return {
        type: 'input',
        message,
        name,
        validate: input => {
            if (!input && !canNull) return '抱歉，但此项不能为空';
            // config.name = ; // 更新对象中属性的数据
            return true;
        }
    }
}

function input_bool(name, message) {
    return {
        type: 'confirm',
        message,
        name,
    }
}

function input_checkbox(name, message, list) {
    return { type: 'checkbox', message, name, choices: list }
}

function input_list(name, message, list) {
    return { type: 'list', message, name, choices: list }
}