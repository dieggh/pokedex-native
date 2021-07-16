import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { PokemonDetails } from '../components/PokemonDetails';
import { useWindowDimensions } from 'react-native';

interface PokemonScreen extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ( {navigation, route : { params: { pokemon: { id, name, picture }, color, textColor } }} : PokemonScreen) => {
    
    const { top } = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const { isLoading, pokemon } = usePokemonDetails(id);

    return (
        <View style={{flex: 1}}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
                height: height * .5
            }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,                        
                        top: top + 5                        
                    }}
                >
                    <Icon name="arrow-back-outline" color={textColor} size={35} />
                </TouchableOpacity>

                <Text style={{
                    ...styles.pokemonName,
                    color: textColor,
                    top: top + 40
                }}>{ name + '\n'}#{ id  }</Text>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={{...styles.pokeball, height: 250}}
                />
                <FadeInImage 
                    uri={picture}
                    style={styles.pokemonImage}
                />                
            </View>
            {
                isLoading 
                ?   <View style={styles.activityIndicator}>
                        <ActivityIndicator size={50} color={color}  />
                    </View>
                :  <PokemonDetails pokemonDetails={pokemon}></PokemonDetails>
                
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
           
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,

    },
    backButton:{
        position:'absolute',
        left: 20        
    },
    pokemonName:{        
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,        
        bottom: -15,
        opacity: 0.7,
        position: 'absolute'
    },
    pokemonImage: {
        height: 200, width: 200, bottom: -12,
        position: 'absolute'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    }
});