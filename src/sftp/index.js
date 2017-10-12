const Client = require('ssh2-sftp-client');

const sftp = new Client();

module.export = send;

async function send() {
  await sftp.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
  });
  const data = sftp.list('/');
  console.log(data);
}
