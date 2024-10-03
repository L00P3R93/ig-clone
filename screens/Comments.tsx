import React from 'react';
import { SafeAreaView, ViewStyle } from "react-native";
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import NavigationBar from '../components/NavigationBar';

interface Props {
    comments: string[];
    onClose(): void;
    onSubmitComment(text: string): void;
    style: ViewStyle | null;
};

/**
 * A screen that displays a list of comments and allows the user to add a new one.
 *
 * @param comments the list of comments to display
 * @param onClose a callback to call when the user wants to close the screen
 * @param onSubmitComment a callback to call when the user wants to submit a new comment
 * @param style an optional style to pass to the SafeAreaView
 */
const Comments: React.FC<Props> = ({ comments, onClose, onSubmitComment, style = null }) => {
    return (
        <SafeAreaView style={style}>
            <NavigationBar title="Comments" leftText="Close" onPressLetfText={onClose} />
            <CommentInput placeholder='Leave a comment' onSubmit={onSubmitComment} />
            <CommentList items={comments} />
        </SafeAreaView>
    );
};

export default Comments;