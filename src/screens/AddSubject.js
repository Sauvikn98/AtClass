import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { subjectDetailChange, subjectCreate, reset } from '../redux/actions';

import { Button, ButtonSecondary, SubjectForm } from '../components/common';

class AddSubject extends Component {
	
	onSubmitPress() {
		if (this.props.subject_name && this.props.teacher_name && this.props.total_hours) {
			const { subject_name, teacher_name, total_hours } = this.props;
			this.props.subjectCreate({ subject_name, teacher_name, total_hours });
		}
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
						title="CREATE"
						color="#f2c94c"
						onPress={() => {
							this.onSubmitPress();
						}}
						
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column', backgroundColor: "#fff" },
	buttonWrap: { alignItems: 'center',  marginBottom: 210, flexDirection:"row", justifyContent: "center"}
});

const mapStateToProps = state => {
	const { subject_name, teacher_name, total_hours} = state.subject;
	return { subject_name, teacher_name, total_hours };
};
export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectCreate, reset }
)(AddSubject);
