import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";
import Products from "./components/Products/products";

describe("App", () => {
  it("renders App without crashing", () => {
    const app = shallow(<App />);
  });
  it("renders products", () => {
    const app = shallow(<App />);
    const products = app.find(Products);
    expect(products).toHaveLength(1);
  });
});
