import { shallow } from "enzyme";
import Products from "./products";

describe("Products", () => {
  describe("should render the components", () => {
    it("render heading", () => {
        const products = shallow(<Products/>);
        const productHeader = products.find("#products-header");
        expect(productHeader.text()).toBe("Products");
    });
  });
});
