import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import myProjectsReducer from 'state/myProjectsSlice'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { myProjects: myProjectsReducer }, preloadedState }),
    route = '/',
    history = ['/'],
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function renderWithStore(
    ui,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = configureStore({ reducer: { myProjects: myProjectsReducer }, preloadedState }),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }
  
export function renderWithRouter(ui, {
    route = '/',
    history = [],
  } = {}
  ) {
    function Wrapper({ children }) {
        <MemoryRouter initialEntries={route}>{children}</MemoryRouter>
    }
      
    return {
       ...render(ui, { wrapper: Wrapper }), history,
    };
  }

