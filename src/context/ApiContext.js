
import { createContext, useState, useEffect } from "react";


export const ApiContext = createContext(null)

export default function ApiProvider({children}){

    const [apiUrl, setApiUrl] = useState("https://api.pokemontcg.io/");

    // useEffect(() => {
    //     setApiUrl("https://api.pokemontcg.io/");
    // }, []);

    return(
        <ApiContext.Provider value={
            {
                api: apiUrl, 
                setApi: setApiUrl
            }
        }>
            {children}

        </ApiContext.Provider>
    )


}