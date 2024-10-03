import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, ViewStyle } from 'react-native';
import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';
import { CommentsForItem, ImageArray } from '../utils/types';

type Props = {
    commentsForItem: CommentsForItem;
    onPressComments(id: number): void;
    style?: ViewStyle | null;
};

const Feed: React.FC<Props> = ({ commentsForItem, onPressComments, style = null }) => {
    const [items, setItems] = React.useState<ImageArray>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);

    useEffect(() => {
        /**
         * Loads images from API and updates state accordingly
         * On success, sets isLoading to false and sets items state
         * On error, sets isLoading to false and sets error state to true
         */
        const loadImages = async () => {
            try {
                const items = await fetchImages();
                setItems(items);
                setIsLoading(false);
            }
            catch(e){
                setIsLoading(false);
                setError(true);
            }
        };

        loadImages();
    }, []);

    if(isLoading) return <ActivityIndicator size="large" />;
    if(error) return <Text>Oops! Something went wrong</Text>;

    return (
        <SafeAreaView style={style}>
            <CardList
                items={items}
                commentsForItem={commentsForItem}
                onPressComments={onPressComments}
            />
        </SafeAreaView>
    );
};

export default Feed;