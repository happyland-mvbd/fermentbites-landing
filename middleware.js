export const config = {
  matcher: '/((?!favicon.ico).*)',
};

const USER = 'fermentbites';
const PASS = 'uAcSv4aIPHN9hQ';

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === USER && pwd === PASS) {
      return;
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Fermentbites"',
    },
  });
}
