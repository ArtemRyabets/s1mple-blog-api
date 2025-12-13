import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:3000/api/v1/posts';
  const res = http.get(url);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}