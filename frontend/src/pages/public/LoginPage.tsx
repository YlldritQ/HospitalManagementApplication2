import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ILoginDto } from '../../types/auth.types';
import InputField from '../../components/general/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/useAuth.hook';
import Button from '../../components/general/Button';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_PUBLIC } from '../../routes/paths';
import { TbActivityHeartbeat } from "react-icons/tb";
import { getRedirectPathByRole } from "../../utils/globalConfig";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(PATH_DASHBOARD.user);
  //   }
  // });
  //
  useEffect(() => {
    if (isAuthenticated && user?.roles) {
      navigate(getRedirectPathByRole(user.roles));
    }
  }, [isAuthenticated, user, navigate]);

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmitLoginForm = async (data: ILoginDto) => {
    try {
      setLoading(true);
      await login(data.userName, data.password, rememberMe);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 401) {
        toast.error('Invalid Username or Password');
      } else {
        toast.error('An error occurred. Please contact admins');
      }
    }
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-cover bg-center'
    >

      <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-8 w-96'>
        {/* Logo Section */}
        <div className='flex flex-col items-center mb-8'>
          <div className='bg-blue-600 text-white w-16 h-16 flex justify-center items-center rounded-full'>
            <TbActivityHeartbeat className="text-white-400 w-12 h-12" />
          </div>
          <h1 className='mt-4 text-3xl font-bold text-blue-800'>Welcome</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className='space-y-8'>
          <InputField
            control={control}
            label='Username'
            inputName='userName'
            icon='user'
            error={errors.userName?.message}
          />
          <InputField
            control={control}
            label='Password'
            inputName='password'
            inputType='password'
            icon='lock'
            error={errors.password?.message}
          />

          {/* Improved Remember Me UI */}
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='rememberMe'
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className='form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2'
            />
            <label htmlFor='rememberMe' className='text-sm text-gray-700 select-none cursor-pointer'>Remember Me</label>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <Button
              variant='secondary'
              type='button'
              label='Reset'
              onClick={() => reset()}
              className='w-full bg-gray-200 text-gray-700 hover:bg-gray-300'
            />
            <Button
              variant='primary'
              type='submit'
              label='Login'
              onClick={() => { }}
              loading={loading}
              className='w-full bg-blue-600 text-white hover:bg-blue-700'
            />
          </div>
        </form>

        {/* Register Link */}
        <div className='mt-6 text-center'>
          <span className='text-sm'>Don't have an account?</span>
          <Link
            to={PATH_PUBLIC.register}
            className='text-blue-600 font-semibold hover:underline ml-1'
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
