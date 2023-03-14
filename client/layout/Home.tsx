import Image from 'next/image';
import { AppShell, Navbar, Header, Box, Anchor } from '@mantine/core';
import { useMe } from '../context/me';
import Link from 'next/link';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { refetch, user } = useMe();

  return (
    <AppShell
      // title="YouTube Clone"
      // description="YouTube Clone built with Next.js, Mantine, and React Query"
      // favicon="https://i.imgur.com/0v7QXgP.png"
      // theme={{
      //   colorScheme: "dark",
      // }}
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} height={500} p='xs'>
          Side items
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          <Box>
            <Box>
              <Image
                src='/logo.png'
                alt='logo'
                width={100}
                height={40}
              />
            </Box>

            {!user && (
              <>
                <Link href='/auth/login' passHref>
                  <Anchor>Login</Anchor>
                </Link>
                <Link href='/auth/register' passHref>
                  <Anchor>Register</Anchor>
                </Link>
              </>
            )}

            {user && <p>Upload a video</p>}
          </Box>
        </Header>
      }>
      {children}
    </AppShell>
  );
}

export default HomePageLayout;
