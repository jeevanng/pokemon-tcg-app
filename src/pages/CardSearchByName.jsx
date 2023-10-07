import { useContext } from "react";
import { useState } from "react"
import { ApiContext } from "../context/ApiContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function CardSearchByName() {

    // search results

    const [searchResults, setSearchResults] = useState([]);

    // API url

    const {api} = useContext(ApiContext)

    // route param for pokemon name

    const {pokemonName} = useParams();

    // API key
    // Do not commit API key to github or any public space
    let apiKey = process.env.REACT_APP_API_KEY;

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

            let responseData = await response.json();

            setSearchResults(responseData.data);
        }

        apiRequest();

    // eslint-disable-next-line
    },[]);

    return(
        <div>
            <h1>Card Search</h1>
            {searchResults.length > 0 && 
            <div>
                <h1>{searchResults[0].name} - {searchResults[0].id}</h1>

                {/* container here with rows and columns */}
                {/* put card in columns and let them responsively organise themselves */}

                <Container fluid className="mx-auto" style={{padding: "5%"}}>
					<Row style={{display: 'flex', flexWrap:'wrap'}}>
						{searchResults.map(result => {
							return <Col className="my-2">
							<PokemonCard key={result.id} 
								cardTitle={result.name} 
								imageUrl={result.images.small} 
								cardDescription={result.flavorText} 
							/>
							</Col>
						})}
					</Row>
				</Container>


            </div>
            }
        </div>
    )
}