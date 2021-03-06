var exec = require('child_process').exec;
var argv = process.argv[2];

async function run() {
    //heroku login
    /* await execFunc('eval $(ssh-agent -s)');
    await execFunc('ssh-add ~/.ssh/linkprice');*/
    await execFunc('git pull');
    await execFunc('git add .');
    await execFunc(`git commit -m '${argv}'`);
    await execFunc('git push heroku master');
    await execFunc('git push origin master');
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