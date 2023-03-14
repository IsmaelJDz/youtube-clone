import { createContext, ReactNode, useContext } from 'react';
import {
  useQuery,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { Me, QueryKeys } from '../types/index';
import { getMe } from '../api';

const MeContext = createContext<{
  user: Me;
  refetch: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined
  ) => any;
  // @ts-ignore</TPageData>
}>(null);

function MeContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.me, getMe);

  return (
    <MeContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <div>Loading...</div> : children}
    </MeContext.Provider>
  );
}

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
