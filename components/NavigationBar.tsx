import React from 'react';
import { StyleSheet,TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';

interface Props {
    title?: string;
    leftText?: string;
    onPressLetfText?(): void;
};

const NavigationBar: React.FC<Props> = ({ title = "", leftText = "", onPressLetfText = () => {} }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftText} onPress={onPressLetfText}>
                <Text>{leftText}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

interface Style {
    container: ViewStyle;
    title: TextStyle;
    leftText: TextStyle;
};

const styles = StyleSheet.create<Style>({
    container: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: '500',
    },
    leftText: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
});

export default NavigationBar;

