var exec = require('child_process').exec;
var argv = process.argv[2];

async function run() {
    var t= await execFunc('ssh-agent -s');
    console.log(t);
    var env = {
        SSH_AUTH_SOCK: '/tmp/ssh-6aJm9YfpNpl8/agent.1883',
        SSH_AGENT_PID: '1884'
    }
    await execFunc('ssh-add ~/.ssh/linkprice',env);
    await execFunc('git add .');
    await execFunc(`git commit -m '${argv}'`);
    await execFunc('git push heroku master');
    await execFunc('git push origin master');
}

function execFunc(cmd,param) {
    return new Promise((res,rej)=>{
        exec(cmd,param,(err,stdout,stderr)=>{
            if(err) console.error(err);
            res(stdout? stdout : stderr);
        })
    })
}

run();
console.log(8);