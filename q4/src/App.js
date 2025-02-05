import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import VolumeDiscountForm from "./VolumeDiscountForm";
import './App.css';

function App() {
  return (
    <AppProvider>
      <VolumeDiscountForm />
    </AppProvider>
  )
}

export default App;
