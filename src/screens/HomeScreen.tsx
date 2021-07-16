import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemon } from '../hooks/usePokemon';
import { styles } from '../theme/appTheme';
export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isLoading, simplePokemons, loadPokemons } = usePokemon();

    return (
       <>
            <Image 
                source={ require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />
            <View
                style={{                    
                    alignItems: 'center'
                }}
            >
                <FlatList 
                    data={simplePokemons}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={(
                        <Text 
                            style={{
                                ...styles.title,
                                ...styles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 20,
                                paddingBottom: 10                
                            }}>Pokedex
                        </Text>
                    )}
                    keyExtractor={(pokemon) => pokemon.id}
                    renderItem={ (  { item } ) => <PokemonCard pokemon={item}></PokemonCard>}

                    onEndReached={loadPokemons}
                    onEndReachedThreshold={ 0.4 }
                    ListFooterComponent={<ActivityIndicator style={{height: 100}} size={25} color='grey' />}
                />
            </View>
            
            {/*<Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20                
            }}>Pokedex</Text>*/}
       </>
    )
}
