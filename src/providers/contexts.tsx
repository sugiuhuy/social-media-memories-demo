import { ParentComponent } from "solid-js";
import StoreContextProvider from "~/contexts/store-context";

const Contexts: ParentComponent = (props) => <StoreContextProvider>{props.children}</StoreContextProvider>;
export default Contexts;
