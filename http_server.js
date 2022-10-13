const http = require('http');

const server = http.createServer((request, response) => {
  const { method, url, headers } = request;
  const userAgent = headers['user-agent'];

  let body = [];
  request.on('error', (err) => {
    // * 여기서 'stderr' 오류 메세지와 스택 트레이스를 출력한다.
    console.error(err.stack);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // * 여기에 'body'에 전체 요청 바디가 문자열로 담겨있다.
    // * 위의 코드를 통해 헤더, 메서드, url, body를 받아서 사용할 수 있음
  })
  
}).listen(8080) // 포트 8080으로 요청을 받음