import Stepper from "./components/Stepper"
import "./App.css"
import StepperByMe from "./components/StepperByMe";
import Demo from "./components/demo";
const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <Demo/>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];
const App = () => {
  return (
    <div>
      {/* <Stepper configs={CHECKOUT_STEPS}/> */}
      <StepperByMe config={CHECKOUT_STEPS}/>
    </div>
  )
}

export default App