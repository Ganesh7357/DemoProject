import { createContext } from "react";
let initialValue = {
  showLoader: () => { },
  hideLoader: () => { },
};
const AppContext = createContext(initialValue);

export default AppContext;
