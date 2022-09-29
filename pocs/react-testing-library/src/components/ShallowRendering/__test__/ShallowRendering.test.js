import ShallowRenderer from "react-test-renderer/shallow";
import ShallowRendering from "../ShallowRendering";
import SubComponent from "../../SubComponent/SubComponent";

it("shallow rendering test", async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ShallowRendering />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe("div");
  expect(result.props.children).toEqual([
    <span className="heading">Shallow Rendering</span>,
    <SubComponent title="Subcomponent" />,
  ]);
});
