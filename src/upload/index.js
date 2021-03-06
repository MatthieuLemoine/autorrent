import request from 'request-promise';

const URL = `https://u2.seedbox.fr/v/${process.env.SEEDBOX}/rpc`;
const Authorization = `Basic ${toBase64(`${process.env.USERNAME}:${process.env.PASSWORD}`)}`;

export default upload;

async function upload(torrents) {
  const sessionId = await getSessionId();
  return Promise.all(
    torrents.map(torrent =>
      request({
        url: URL,
        method: 'POST',
        headers: {
          Authorization,
          Referer: 'https://u2.seedbox.fr/v/seedbox59dc9c18cddf3/web/',
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/61.0.3163.100 Chrome/61.0.3163.100 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Transmission-Session-Id': sessionId,
        },
        body: JSON.stringify({
          method: 'torrent-add',
          arguments: {
            filename: torrent.url,
            'download-dir': `/home/${process.env.USERNAME}`,
            paused: false,
          },
          tag: '',
        }),
      }),
    ),
  );
}

function toBase64(string) {
  return Buffer.from(string).toString('base64');
}

function getSessionId() {
  return request({
    url: URL,
    method: 'POST',
    headers: {
      Authorization,
      Referer: 'https://u2.seedbox.fr/v/seedbox59dc9c18cddf3/web/',
    },
    resolveWithFullResponse: true,
  })
    .then(res => res.response.headers['x-transmission-session-id'])
    .catch(res => res.response.headers['x-transmission-session-id']);
}
