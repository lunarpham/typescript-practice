import "./App.scss";
import Button from "./components/Button/Button";
import { ButtonVariant, ButtonColor } from "./components/Button/Button.types";
import { Size, Radius } from "./types/global.types";
import Card from "./components/Card/Card";

function App() {
  const variants: ButtonVariant[] = ["solid", "outline", "soft", "shadow"];
  const colors: ButtonColor[] = ["gray", "blue", "green", "red", "yellow"];
  const sizes: Size[] = ["sm", "md", "lg"];
  const radius: Radius[] = ["none", "sm", "md", "lg", "full"];

  return (
    <div className="app">
      <div className="app__container">
        List of button styles
        <div className="section">
          <div className="section__title">Variants</div>
          <div className="section__button-show">
            {variants &&
              variants.map((variant) => (
                <Button key={variant} variant={variant} color="blue">
                  Hello World
                </Button>
              ))}
          </div>
        </div>
        <div className="section">
          <div className="section__title">Sizes</div>
          <div className="section__button-show">
            {sizes &&
              sizes.map((size) => (
                <Button key={size} size={size} color="blue">
                  Hello World
                </Button>
              ))}
          </div>
        </div>
        <div className="section">
          <div className="section__title">Colors</div>
          <div className="section__button-show">
            {colors &&
              colors.map((color) => (
                <Button key={color} color={color} variant="solid">
                  Hello World
                </Button>
              ))}
          </div>
          <div className="section__button-show">
            {colors &&
              colors.map((color) => (
                <Button key={color} color={color} variant="outline">
                  Hello World
                </Button>
              ))}
          </div>
          <div className="section__button-show">
            {colors &&
              colors.map((color) => (
                <Button key={color} color={color} variant="soft">
                  Hello World
                </Button>
              ))}
          </div>
        </div>
        <div className="section">
          <div className="section__title">Radius Values</div>
          <div className="section__button-show">
            {radius &&
              radius.map((size) => (
                <Button key={size} radius={size} color="blue">
                  Hello World
                </Button>
              ))}
          </div>
        </div>
        <br />
        List of Card Button
        <div className="section">
          <Card
            imageUrl="./BCdtAUG.jpeg"
            imageAlt="Hello"
            title="Interactive Card"
            variant="flat"
            hover
            padding={false}
            actions={
              <>
                <Button>Cancel</Button>
                <Button>Save</Button>
              </>
            }
          >
            This card has action buttons and hover effects.
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
