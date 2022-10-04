import React from 'react';
import { TouchableNativeFeedback, StyleSheet, View, Text } from 'react-native';

const ButtonSecondary = ({ title, onPress, color }) => (
	<TouchableNativeFeedback onPress={onPress}>
		<View style={styles.buttonView}>
			<Text style={styles.buttonText}>{title}</Text>
		</View>
	</TouchableNativeFeedback>
);

const styles = StyleSheet.create({
	buttonView: {
		borderRadius: 4,
		width: 145,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		height: 45,
		backgroundColor: '#1e90ff'
	},
	buttonText: {
		fontSize: 18,
		color: '#fff'
	}
});
export default ButtonSecondary;
