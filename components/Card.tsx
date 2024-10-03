import React, {useState} from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleSheet, View } from 'react-native';
import AuthorRow from './AuthorRow';

interface Props {
    fullname: string;
    image: { uri: string };
    linkText: string;
    onPressLinkText():  void;
};

const Card: React.FC<Props> = ({ fullname, image, linkText, onPressLinkText }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <View>
            <AuthorRow fullname={fullname} linkText={linkText} onPressLinkText={onPressLinkText} />
            <View style={styles.image}>
                {isLoading && (
                    <ActivityIndicator style={StyleSheet.absoluteFill} size={"large"} />
                )}
                <Image style={StyleSheet.absoluteFill} source={image} onLoad={handleLoad} />
            </View>
        </View>
    );
}

interface Style {
    image: ImageStyle;
}

const styles = StyleSheet.create<Style>({
    image: {
        aspectRatio: 1,
        backgroundColor: "rgba(0,0,0,0.02)"
    },
});

export default Card;