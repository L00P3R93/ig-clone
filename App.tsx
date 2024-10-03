import React, { useEffect, useState } from 'react';
import { Modal, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Comments from './screens/Comments';
import Feed from './screens/Feed';
import { CommentsForItem } from './utils/types';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

/**
 * The main app component.
 *
 * Manages the state of comments and the selected item.
 * Renders the Feed and Comments screens.
 *
 * @returns The main app component
 */
const App: React.FC = () => {
	const [commentsForItem, setCommentsForItem] = useState<CommentsForItem>({});
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedItemId, setSelectedItemId] = useState<number>(-1);

	useEffect(() => {
		/**
		 * Loads comments from AsyncStorage
		 * Tries to read the comments from AsyncStorage
		 * If successful, sets the commentsForItem state
		 * If failed, logs an error message
		 */
		const loadComments = async () => {
			try {
				const storedComments = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
				if(storedComments) setCommentsForItem(JSON.parse(storedComments));
			}
			catch(e) { console.log("[!] Failed to load comments"); }
		};
		loadComments();
	}, []);

	/**
	 * Handles the submission of a comment.
	 *
	 * Takes the text of the comment
	 * Updates the commentsForItem state by adding the comment to the selected item
	 * Tries to save the updated comments to AsyncStorage
	 * Logs an error message if the save fails
	 *
	 * @param text The text of the comment
	 */
	const onSubmitComment = (text: string) => {
		const comments = commentsForItem[selectedItemId] || [];
		const updatedComments = {
			...commentsForItem,
			[selectedItemId]: [...comments, text]
		};

		setCommentsForItem(updatedComments);

		try {
			AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updatedComments));
		}
		catch(e) { console.log("Failed to save comment", text, "for", selectedItemId); }
	};

	/**
	 * Opens the comment screen with the given item id.
	 *
	 * Updates the state by setting the selected item id and showing the modal
	 *
	 * @param id The id of the item to show the comments for
	 */
	const openCommentScreen = (id: number) => {
		setSelectedItemId(id);
		setShowModal(true);
	}

	/**
	 * Closes the comment screen.
	 *
	 * Updates the state by setting the selected item id to -1 and hiding the modal
	 */
	const closeCommentScreen = () => {
		setSelectedItemId(-1);
		setShowModal(false);
	}

	return (
		<View style={styles.container}>
			<Feed
				style={styles.feed}
				commentsForItem={commentsForItem}
				onPressComments={openCommentScreen}
			/>
			<Modal visible={showModal} animationType="slide" onRequestClose={closeCommentScreen}>
				<Comments
					style={styles.comments}
					comments={commentsForItem[selectedItemId] || []}
					onClose={closeCommentScreen}
					onSubmitComment={onSubmitComment}
				/>
			</Modal>
		</View>
	)
};

const platformVersion = Platform.OS === 'ios' ? parseInt(Platform.Version as string, 10) : Platform.Version as number;

interface Style {
	container: ViewStyle;
	feed: ViewStyle;
	comments: ViewStyle;
};

const styles = StyleSheet.create<Style>({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	feed: {
		flex: 1,
		marginTop: Platform.OS === 'android' || platformVersion < 11 ? Constants.statusBarHeight : 0
	},
	comments: {
		flex: 1,
		marginTop: Platform.OS === 'ios' || platformVersion < 11 ? Constants.statusBarHeight : 0
	}
});

export default App;