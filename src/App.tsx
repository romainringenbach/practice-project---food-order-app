import Meals from "./components/Meals.tsx";
import Header from "./components/Header.tsx";
import CheckoutFlow from "./components/CheckoutFlow.tsx";
import CartContextProvider from "./store/cart-context.tsx";

function App() {
  return (
    <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <CheckoutFlow></CheckoutFlow>
    </CartContextProvider>
  );
}

export default App
