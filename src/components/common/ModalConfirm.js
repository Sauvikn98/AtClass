import React from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import { ButtonSecondary } from './';

const ModalConfirm = ({ text, onCancel, onAccept, main, secondary, visible }) => (
	<Modal visible={visible}>
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: '#333',
					padding: 10,
					borderRadius: 5
				}}
			>
				<Text style={styles.text}>{text}</Text>
				<View style={styles.buttonOuterView}>
					<ButtonSecondary color="#1e90ff" title={secondary} onPress={onCancel} />
					<ButtonSecondary color="#1e90ff" title={main} onPress={onAccept} />
				</View>
			</View>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.75)'
	},

	buttonOuterView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		marginBottom: 15
	},
	text: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	}
});

export default ModalConfirm;
