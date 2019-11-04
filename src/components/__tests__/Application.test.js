import React from "react";

import { render, cleanup } from "@testing-library/react";

import { act } from 'react-dom/test-utils';

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  act(() => {
    render(<Application />);
  })
});
