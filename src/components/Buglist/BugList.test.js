import { render } from '@testing-library/react'
import BugList from './BugList.js';

it('renders without crashing', () => {
    const bugs = JSON.parse('[{"id":"GnH2131kZgAwq4XEJIjD","priority":"High","status":"under-review","description":"","assignedTo":"kevin","dateAdded":{"seconds":1659044855,"nanoseconds":441000000},"bugTitle":"Issue setting state buglist onload"}]');
    render(<BugList bugList={bugs}/>);
});