import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ReactElement } from 'react';
import HomePageLayout from '../../layout/Home';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <>
      <p className={inter.className}>
        Discover and deploy boilerplate example Next.js&nbsp;projects.
      </p>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
