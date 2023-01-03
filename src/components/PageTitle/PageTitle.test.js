import { screen } from '@testing-library/react';
import PageTitle from './PageTitle';
import { renderWithProviders, renderWithStore } from 'utility/test-utils';

import { Route, Routes } from 'react-router-dom'


it('Renders with text prop', () => {
    renderWithStore(<PageTitle title="Dashboard"/>);
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard');
});

it('Displays current project title', () => {

    const initialState = [{ id: "DamxBc6xfj5qu1srBu0x", 
                            projectName: "Buggly",
                            users : ["e8Nv4pJsMKWRVXaIjAnt"]}];

    renderWithProviders(
        <Routes>
          <Route path="/project/:projectID" element={<PageTitle />} />
        </Routes>, 
        { preloadedState: {myProjects: initialState}, 
        route: '/project/DamxBc6xfj5qu1srBu0x'
    });

    //screen.debug();
    expect(screen.getByRole('heading')).toHaveTextContent('Buggly');
});