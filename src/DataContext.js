import React from 'react';
import {createContext, useContext} from 'react';

const DataContext = createContext(null);

export function DataProvider({children, data}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const fakeData = [{
  name: 'Thomas'
}, {
  name: 'Dom'
}, {
  name: 'Kevin'
}, {
  name: 'Leo'
}, {
  name: 'Nathan'
}];

export function useData() {
  const ctx = useContext(DataContext);
  if (ctx !== null) {
    ctx.read();
  }
  return fakeData;
};