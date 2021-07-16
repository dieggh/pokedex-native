import { useEffect } from "react";
import { useState } from "react";
import { PokemonDetails } from '../interfaces/Pokemon';
import { pokemonApi } from '../api/pokemonApi';


export const usePokemonDetails = (id: string) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonDetails>({} as PokemonDetails);    

    const loadPokemon = async () =>{
        const resp = await pokemonApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`); 

        setPokemon(resp.data);
        setIsLoading(false);
    }

    useEffect(() => {

        loadPokemon();

        return () => {

        }
    }, []);
    
    return {
        isLoading,
        pokemon
    };
}
