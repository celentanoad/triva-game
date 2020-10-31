import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';

it("renders without crashing", () => {
  shallow(<App />);  
});


it("renders heading", () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Let's play trivia!</h2>;
  expect(wrapper.contains(welcome)).toEqual(true);
});
