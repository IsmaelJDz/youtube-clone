import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ReactElement } from 'react';
import HomePageLayout from '../../layout/Home';
import { useVideo } from '../../context/videos';
import VideoTeaser from '../../components/VideoTeaser';
import { SimpleGrid } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const { videos } = useVideo();

  return (
    <>
      <p className={inter.className}>
        Youtube clone built with Next.js, Mantine, and React Query by
        @Ismaeljdz @ismaelJdz7
      </p>
      <SimpleGrid cols={3}>
        {(videos || []).map(video => {
          return <VideoTeaser video={video} key={video.videoId} />;
        })}
      </SimpleGrid>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
