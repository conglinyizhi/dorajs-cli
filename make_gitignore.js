module.exports = {
    create() {
        return data
    }
}

const data = `logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pids
*.pid
*.seed
*.pid.lock
lib-cov
coverage
.nyc_output
.grunt
bower_components
.lock-wscript
build/Release
node_modules/
jspm_packages/
typings/
.npm
.eslintcache
.node_repl_history
*.tgz
.yarn-integrity
.env`