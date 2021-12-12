import { createContext } from "react";

export const LoginIdContext = createContext({
                                             loggedInId: "",
                                             setLoggedInId: () => {}
                                         })
