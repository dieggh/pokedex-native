import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import ImageColors from 'react-native-image-colors'
import { SimplePokemon } from '../interfaces/Pokemon';
import { FadeInImage } from './FadeInImage';

interface PokemonCard {
    pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: PokemonCard) => {
    const { width, height } = useWindowDimensions();
    const [bgColor, setBgColor] = useState('grey');
    const [textColor, setTextColor] = useState('white');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    const fetchColor = async(uri: string) => {
        const colors = await ImageColors.getColors(uri, {});
        
        if(isMounted){
            if(colors.platform === 'ios'){
                setBgColor(colors.background);
                setTextColor(colors.primary);
            }else{                
                setBgColor(colors.dominant ? colors.dominant : 'grey');
                setTextColor(colors.average ? colors.average : 'white' );                            
            }
        }
                
    }

    useEffect(() => {
        fetchColor(pokemon.picture);

        return () =>{
            isMounted.current = false;
        }
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PokemonScreen', {
                pokemon: pokemon,
                color: bgColor,
                textColor: textColor
            })}
        >
            <View style={{
                ...styles.cardContainer,
                backgroundColor: bgColor,                                                
                width: width * 0.4
            }}>
                <View>
                    <Text style={{...styles.name, color: textColor}}>{pokemon.name} {'\n#' + pokemon.id}</Text>
                </View>
                <View style={styles.pokebolaContainer}>
                    <Image 
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>
                
                <FadeInImage
                    uri={pokemon.picture}                        
                    style={{...styles.pokemonImage}}
                />
            </View>    
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:12,
        height: 120,
        width: 100,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,        
    },
    name:{        
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,            
    },
    pokebola:{
        width: 100,
        height: 100, 
        position: 'absolute',
        bottom: -20,
        right: -20,
        opacity: 0.4
    },
    pokemonImage:{
        width: 99, 
        height: 99,
        position: 'absolute',
        right: -10,
        top: 17,
        
    },
    pokebolaContainer:{        
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.9
    }
});

/*<View>
            <FadeInImage
                uri={pokemon.picture}                        
                style={{width: 100, height: 100}}
            />
</View>*/


/*
  <Text 
                            style={{
                                ...styles.title,
                                ...styles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 20                
                            }}>Pokedex
                        </Text>*/