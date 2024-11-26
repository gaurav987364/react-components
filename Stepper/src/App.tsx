import Stepper from "./components/Stepper"
import "./App.css"
const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
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
      <Stepper configs={CHECKOUT_STEPS}/>
    </div>
  )
}

export default App