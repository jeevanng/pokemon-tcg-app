import { useContext } from "react";
import { useState } from "react"
import { ApiContext } from "../context/ApiContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function CardSearchByName() {

    // search results

    const [searchResults, setSearchResults] = useState();

    // API url

    const {api} = useContext(ApiContext)

    // route param for pokemon name

    const {pokemonName} = useParams();

    // API key

    let apiKey = "";

    useEffect(() => {
        console.log("Card search component has mounted! Making a fetch request now...");

        async function apiRequest(){
            let queryParams = new URLSearchParams({
                q: 'name:' + pokemonName
            })
            let response = await fetch(api + 'cards?' + queryParams, {
                headers: {
                    'X-Api-Key': apiKey
                }
            })
        }
    },[]);

    return(
        <div>
            <h1>Card Search</h1>
        </div>
    )
}