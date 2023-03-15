import { createContext, useContext } from 'react';
import {
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from 'react-query';

import { QueryKeys, Video } from '../types';
import { getVideos } from '../api';
import { Loader } from '@mantine/core';

const VideoContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined
  ) => any;
  // @ts-ignore;
}>(null);

function VideosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, refetch } = useQuery(
    QueryKeys.videos,
    getVideos
  );

  return (
    <VideoContext.Provider value={{ videos: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </VideoContext.Provider>
  );
}

const useVideo = () => useContext(VideoContext);

export { VideosContextProvider, useVideo };
