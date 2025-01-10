const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../');

const clientFilePath = path.join(rootDir, 'client/src/app/environments/dev-env.local.ts');
const serverFilePath = path.join(rootDir, 'server/.env');

function createClientIpFile(ip) {
  fs.writeFileSync(clientFilePath, `export const SERVER_IP = "${ip}";`);
  console.log('Created dev-env.local.ts file!');
}

function modifyServerDotEnv(ip) {
  if (!fs.existsSync(serverFilePath)) {
    console.log(".env file doesn't exist.");
    return;
  }
  const content = fs.readFileSync(serverFilePath, { encoding: 'utf-8' });

  if (!/ENVIRONMENT="local"/.test(content)) return;

  console.log(content);

  const newContent = content
    .replace(/APP_URL=.+/, `APP_URL="http://${ip}:6021"`)
    .replace(/IPV4=.+/, `IPV4="${ip}"`);

  fs.writeFileSync(serverFilePath, newContent);
  console.log('Modified .env file!');
}

module.exports = {
  createIpFiles(ip) {
    createClientIpFile(ip);
    modifyServerDotEnv(ip);
  },
};
