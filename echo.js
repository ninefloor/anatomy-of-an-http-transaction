const http = require('http');

// * 받은 요청을 그대로 응답하는 에코서버
http.createServer((request, response) => {
  // ? 요청 스트림에서 오류 발생시 처리가 필요
  // ? 오류를 stderr에 로깅하고 Bad Request(400) 상태 코드 송신
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  })
  if (request.method === 'POST' && request.url === '/echo') {
    // * 기존 방식
    // let body = [];
    // request.on('data', (chunk) => {
    //   body.push(chunk);
    // }).on('end', () => {
    //   body = Buffer.concat(body).toString();
    //   response.end(body);
    // });
    // ? request 객체는 ReadableStream, response 객체는 WritableStream이기 때문에
    // ? 데이터를 한 스트림에서 다른 스트림으로 직접 연결하는 pipe를 사용할 수 있다.
    request.pipe(response);
  } else {
    // ! 메소드가 POST 이면서 엔드포인트가 /echo가 아니라면 오류 코드 응답
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);