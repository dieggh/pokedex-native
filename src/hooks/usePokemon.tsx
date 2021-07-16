import { useRef } from "react"
import { useState } from "react";
import { useEffect } from "react"
import { pokemonApi } from "../api/pokemonApi"
import { PokemonResponse, SimplePokemon, Result } from '../interfaces/Pokemon';


export const usePokemon = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);    
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () =>{
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonResponse>(nextPageUrl.current); 
        nextPageUrl.current = resp.data.next;        
        mapPokemons(resp.data.results);        
    }

    const mapPokemons = (pokemons: Result[]) =>{
        
        setSimplePokemons([...simplePokemons, 
            ...pokemons.map(pokemon =>{                
                const searchId = pokemon.url.split('/');    
                const id = searchId[searchId.length - 2];
                
                return { ...pokemon, id , picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`  }
                })
            ]);
            setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();
        return () => {
            
        }
    }, []);

    return {
        simplePokemons,
        isLoading,
        loadPokemons
    }
   
}
