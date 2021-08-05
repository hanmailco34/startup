var exec = require('child_process').exec;
var argv = process.argv[2];

async function run() {
    await execFunc('git add .');
    await execFunc(`git commit -m '${argv}'`);
    await execFunc('git push heroku main');
    await execFunc('git push origin main');
}

function execFunc(cmd) {
    return new Promise((res,rej)=>{
        exec(cmd,(err,stdout,stderr)=>{
            if(err) console.error(err);
            res(stdout? stdout : stderr);
        })
    })
}

run();
console.log(5);