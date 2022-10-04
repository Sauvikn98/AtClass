import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
	subjectDetailChange,
	subjectCreate,
	subjectPrimaryUpdate,
	subjectDelete,
	reset
} from '../redux/actions';

import { Button, ButtonSecondary, SubjectForm } from '../components/common';

class EditSubject extends Component {

	onSubmitPress() {
		const { subject_name, teacher_name, total_hours, uid } = this.props;
		this.props.subjectPrimaryUpdate({ subject_name, teacher_name, total_hours, uid });
	}
	onDeletePress() {
		console.log(this.props);
	}

	render() {
		const { container, buttonWrap } = styles;
		return (
			<View style={container}>
				<SubjectForm />
				<View style={buttonWrap}>

					<ButtonSecondary
						title="CANCEL"
						color="#f2c94c"
						onPress={() => Actions.subjectList({ type: 'reset' })}
					/>

					<ButtonSecondary
						title="SAVE"
						color="#f2c94c"
						onPress={() => {
							this.onSubmitPress();
						}}
					/>

				</View>
				<View style={{ alignItems: 'center', marginBottom: 150, justifyContent: "center" }}>

					<TouchableOpacity onPress={() => {
						this.props.subjectDelete({ uid: this.props.uid });
					}}
						style={{
							height: 40,
							width: 140,
							backgroundColor: '#f00',
							elevation: 2,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 6,
						}}>
							<View style={{flexDirection:"row"}}>
							<Icon name="delete" color={'#fff'} size={25} />
						    <Text style={{ color: '#fff', fontSize: 22, marginLeft: 10}}>DELETE</Text>
							</View>
						
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column', backgroundColor: "#fff" },
	buttonWrap: { alignItems: 'center', marginBottom: 40, flexDirection: "row", justifyContent: "center" }
});

const mapStateToProps = state => {
	const { subject_name, teacher_name, total_hours, uid } = state.subject;
	return { subject_name, teacher_name, total_hours, uid };
};

export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectCreate, subjectPrimaryUpdate, subjectDelete, reset }
)(EditSubject);
