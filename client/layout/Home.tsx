import Image from 'next/image';
import { AppShell, Navbar, Header, Box } from '@mantine/core';

function HomePageLayout({ children }: { children: React.ReactNode }) {
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
          </Box>
        </Header>
      }>
      {children}
    </AppShell>
  );
}

export default HomePageLayout;
