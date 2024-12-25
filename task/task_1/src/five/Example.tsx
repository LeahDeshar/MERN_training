import Header, { WithHeader } from "./Header";
import SimpleComponent, { WithMessage } from "./SimpleComponent";

function Example() {
  const EnhancedComponent = WithMessage(
    SimpleComponent,
    "Welcome to the HOC Example!"
  );

  const HeaderComponent = WithHeader(
    Header,
    "This is Title",
    "This is paragraph"
  );
  return (
    <div>
      <h1>Higher-Order Component Example</h1>
      <EnhancedComponent name="John Doe" />
      <HeaderComponent title="Title" paragraph="Paragraph" />
    </div>
  );
}

export default Example;
