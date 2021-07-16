import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PokemonDetails as PokemonDetailsInterface} from '../interfaces/Pokemon'
import { FadeInImage } from './FadeInImage'

interface PokemonDetails {
    pokemonDetails: PokemonDetailsInterface
}

export const PokemonDetails = ( { pokemonDetails }: PokemonDetails) => {
    const { height } = useWindowDimensions();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            <View style={{
                ...styles.container,
                marginTop: height * .5
            }}
            >
                <Text style={styles.title}>Tipos</Text>    
               
                
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemonDetails.types.map(({type}) => (                        
                            <Text key={type.name} style={{...styles.regularText, marginRight: 10}}>{type.name}</Text>                                                
                        ))
                    }                    
                </View>
                            
                <Text style={styles.title}>Peso</Text>    
                <Text style={styles.regularText}>{pokemonDetails.weight} Kg</Text>    
            </View>
            <View style={{...styles.container}}>
                <Text style={styles.title}>Sprites</Text>  
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage uri={pokemonDetails.sprites.front_default} style={styles.basicSprite}/>
                <FadeInImage uri={pokemonDetails.sprites.back_default} style={styles.basicSprite}/>
                <FadeInImage uri={pokemonDetails.sprites.front_shiny} style={styles.basicSprite}/>
                <FadeInImage uri={pokemonDetails.sprites.back_shiny} style={styles.basicSprite}/>                
            </ScrollView>
            
            <View style={styles.container}>
                <Text style={styles.title}>Habilidades Base</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemonDetails.abilities.map(({ ability }) => (                        
                            <Text key={ability.name} style={{...styles.regularText, marginRight: 10}}>{ability.name}</Text>                                                
                        ))
                    }                    
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Movimientos</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                        pokemonDetails.moves.map(({ move }) => (                        
                            <Text key={move.name} style={{...styles.regularText, marginRight: 10}}>{move.name}</Text>                                                
                        ))
                    }                    
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Stats</Text>
                <View>
                    {
                        pokemonDetails.stats.map((stat, i) => (                        
                            <View key={stat.stat.name + i } style={{flexDirection: 'row'}}>
                                <Text style={{...styles.regularText, marginRight: 10, width: 150}}>{stat.stat.name}</Text>
                                <Text style={{...styles.regularText, fontWeight: 'bold' }}>{stat.base_stat}</Text>                                               
                            </View>
                            
                        ))
                    }                    
                </View>

                <View style={{marginBottom: 15, alignItems: 'center'}}>
                    <FadeInImage uri={pokemonDetails.sprites.front_default} style={styles.basicSprite}/>
                </View>                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText:{
        fontSize: 19
    },
    basicSprite: {
        width: 100, 
        height: 100
    }
});