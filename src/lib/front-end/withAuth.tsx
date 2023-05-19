import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const token: any = router.query.token;

  useEffect(() => {
    let userInfo: any = localStorage.getItem('userInfo')
    let finalData = JSON.parse(userInfo)
    let userToken = finalData?.token

    if (!userToken) {
      if (router.pathname === '/') {
        router.push('/');
      }
      else if (router.pathname === '/signup') {
        router.push('/signup');
      }
      else if (router.pathname === '/forgot-password') {
        router.push('/forgot-password');
      }
      else if (router.pathname === `/reset-password`) {
        if (token) {
          router.push(`/reset-password?token=${token}`);
        }
      }
      else {
        router.push('/');
      }
    } else if (userToken) {

      if (router.pathname === '/dashboard') {
        router.push('/dashboard');
      }
      else if (router.pathname === '/users') {
        router.push('/users');
      }
      else if (router.pathname === '/users/add') {
        router.push('/users/add');
      }
      else if (router.pathname === `/users/[id]`) {
        if (id) {
          router.push(`/users/${id}`);
        }
      }
      else if (router.pathname === `/users/edit/[id]`) {
        if (id) {
          router.push(`/users/edit/${id}`);
        }
      }
      else {
        router.push('/dashboard');
      }
    }
  }, []);

  return children;
};

export default PrivateRoute;
