import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { subjectDetailChange, subjectCreate } from '../../redux/actions';

import InputBox from '../common/Input/components/InputBox';

class SubjectForm extends Component {
	render() {
		const { mainContainer, inputContainer, textStyle, inputView, titleText } = styles;

		return (
			<View style={mainContainer}>
				<View style={{ padding: 30 }}>
					<View style={inputContainer}>
						<Text style={textStyle}> Subject Name</Text>
						<View style={inputView}>
							<InputBox
								value={this.props.subject_name}
								rtype="next"
								blurOnSubmit={false}
								onSubmitEditing={() => {
									this.hours.focus();
								}}
								onChangeText={value => {
									this.props.subjectDetailChange({ prop: 'subject_name', value });
								}}
							/>
						</View>
					</View>

					<View style={inputContainer}>
					     <View>
							<Text style={textStyle}>Teacher Name</Text>
						</View>
						<View style={inputView}>
							<InputBox
								value={this.props.teacher_name}
								rtype="next"
								blurOnSubmit={false}
								onSubmitEditing={() => {
									this.hours.focus();
								}}
								onChangeText={value => {
									this.props.subjectDetailChange({ prop: 'teacher_name', value });
								}}
							/>
						</View>
					</View>
					

					<View style={inputContainer}>
						<View>
							<Text style={textStyle}>Total Class</Text>
						</View>
						<View style={inputView}>
							<InputBox
								value={this.props.total_hours}
								ktype="numeric"
								rtype="next"
								blurOnSubmit={false}
								onSubmitEditing={() => this.hours.blur()}
								refs={input => {
									this.hours = input;
								}}
								onChangeText={value => {
									if (Number(value) || value === '') {
										this.props.subjectDetailChange({ prop: 'total_hours', value });
									}
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputView: { },
	inputContainer: { marginBottom: 55 },
	textStyle: { fontSize: 18, color:"#333", marginBottom: 10},
	titleText: { fontSize: 17, paddingLeft: 20, color: '#333' },
	mainContainer: { paddingTop: 30, flex: 1 }
});
const mapStateToProps = state => {
	const { subject_name, teacher_name, total_hours } = state.subject;
	return { subject_name, teacher_name, total_hours };
};
export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectCreate }
)(SubjectForm);
