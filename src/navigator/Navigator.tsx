import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { View } from 'react-native';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/Pokemon';

export type RootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: {
        pokemon: SimplePokemon,
        color?: string,
        textColor?: string,
    };
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
    return (                  
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />       
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />       
        </Stack.Navigator>                    
    )
}
