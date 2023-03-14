import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/hooks';
import { useMutation } from 'react-query';
import { registerUser } from '../../../api';
import { AxiosError } from 'axios';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import {
  showNotification,
  updateNotification,
} from '@mantine/notifications';

function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>['0']
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Registering user',
        message: 'Please wait...',
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Success',
        message: 'Successfully registered user',
      });

      router.push('/auth/login');
    },
    onError: () => {
      updateNotification({
        id: 'register',
        title: 'Error',
        message: 'Could not register user',
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register user</title>
      </Head>
      <Container>
        <Title>Register</Title>

        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form
            onSubmit={form.onSubmit(values =>
              mutation.mutate(values)
            )}>
            <Stack>
              <TextInput
                label='Email'
                placeholder='jane@example.com'
                required
                {...form.getInputProps('email')}
              />

              <TextInput
                label='Username'
                placeholder='ismael_jdz7'
                required
                {...form.getInputProps('username')}
              />

              <PasswordInput
                label='Password'
                placeholder='your strong password'
                required
                {...form.getInputProps('password')}
              />

              <PasswordInput
                label='Confirm password'
                placeholder='your strong password'
                required
                {...form.getInputProps('confirmPassword')}
              />

              <Button type='submit'>Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
