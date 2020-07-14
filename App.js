import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, TextInput, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import fetchData from "./Api";

const Stack = createStackNavigator()

const MyStack = () => (
    <Stack.Navigator>
        <Stack.Screen name='Main' component={MainComponent} />
        <Stack.Screen name='Details' component={DetailsComponent} />
    </Stack.Navigator>
)

const Box = (props) => {
    return (
        <View style={styles.box}>
            <TouchableOpacity
                styles={{justifyContent: 'space-between'}}
                onPress={() => (props.navigation.navigate('Details', {Title: props.Title}))}
            >
                <Text>{props.Title}</Text>
                <Text>{props.Year}</Text>
            </TouchableOpacity>
        </View>
    )
}

const DetailsComponent = ({route}) => {
    const {props} = route.params
    return (
        <View>
            {props.keys().map(item => (<Text>{item}</Text>))}
        </View>
    )
}


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            navigation: this.props.navigation,
            title: ''
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.title !== this.state.title) {
            const res = await fetchData(this.state.title)
            this.setState(() => ({
                data: res,
            }))
        }
    }

    sortElementsByYear = (first, second) => {
        if(first.Year > second.Year)
            return 1
        return -1
    }

    sortElementsByTitle = (first, second) => {
        if(first.Title > second.Title)
            return 1
        return -1
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        this.setState({
                            title: text
                        })
                    }}
                />
                <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
                    <Button
                        onPress={() => this.setState((prevState) => ({
                            data: [...prevState.data].sort(this.sortElementsByYear)
                        }))}
                        title={'sort by year'}
                    />
                    <Button
                        onPress={() => this.setState((prevState) => ({
                            data: [...prevState.data].sort(this.sortElementsByTitle)
                        }))}
                        title={'sort by title'}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        console.log('dupa')
                        return(
                            <Box {...item} navigator={this.props.navigator}/>
                        )}
                    }
                    keyExtractor={item => item.imdbID}
                />
            </View>
        );
    }
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    box: {
        padding: 20,
        marginVertical: 10,
        justifyContent:'space-between',
        backgroundColor: '#1234',

    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
    }
});
