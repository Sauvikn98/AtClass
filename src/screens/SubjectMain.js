import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { subjectDetailChange, subjectAbsentUpdate, reset } from '../redux/actions/SubjectActions';
import { ButtonSecondary } from '../components/common';

class SubjectMain extends Component {
	UNSAFE_componentWillMount() {
		_.each(this.props.subject, (value, prop) => {
			this.props.subjectDetailChange({ prop, value });
		});
		console.log('will mount');
	}
	UNSAFE_componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	UNSAFE_componentWillUpdate() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	UNSAFE_componentWillUnmount() {
		this.props.reset();
		BackHandler.removeEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	addButton() {
		if (this.props.absent_hours < this.props.total_hours) {
			return this.props.subjectDetailChange({
				prop: 'absent_hours',
				value: this.props.absent_hours + 1
			});
		}
	}

	subButton() {
		if (this.props.absent_hours !== 0) {
			return this.props.subjectDetailChange({
				prop: 'absent_hours',
				value: this.props.absent_hours - 1
			});
		}
	}

	numberOfAbsentComponent() {
		return (
			<View style={{ flexDirection: 'row' }}>
				{this.extraButton('-', this.subButton.bind(this))}
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: 25,
						marginRight: 25
						
					}}
				>
					<Text
						style={{
							fontSize: 20,
							alignItems: 'center',
							justifyContent: 'center',
							color: '#333'
						}}
					>
						{this.props.absent_hours}
					</Text>
				</View>
				{this.extraButton('+', this.addButton.bind(this))}
			</View>
		);
	}

	extraButton(symbol, onPress) {
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View
					style={{
						height: 40,
						width: 80,
						backgroundColor: '#333',
						elevation: 2,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>{symbol}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	render() {
		const { absent_hours, total_hours } = this.props;
		let percent = 0;
		if (Number(total_hours))
			percent = Number((((total_hours - absent_hours) / total_hours) * 100).toFixed(1));
		let percentInt = 100;
		if (percent) {
			percentInt = Math.floor(percent);
		}
		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				{/*
				<ActionButton
					renderIcon={() => <Icon name="pencil" color="#fff" size={23} />}
					buttonColor="#f2c94c"
					onPress={() => Actions.editSubject({ uid: this.props.subject.uid })}
					fixNativeFeedbackRadius
					position="right"
					positioningMode="absolute"
					style={{ marginBottom: 370 }}
				/>
				*/}
				
				<AnimatedCircularProgress
					style={{ flex: 1, alignSelf: 'center', marginTop: 30 }}
					size={300}
					width={15}
					fill={percentInt}
					tintColor="#1e90ff"
					onAnimationComplete={() => console.log('onAnimationComplete')}
					backgroundColor="#fff"
					lineCap="round"
				>
					{() => (
						<View>
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								<Text style={{ fontSize: 60, color: '#333', fontWeight: 'bold', marginLeft: 5 }}>
									{percent}
								</Text>
								<View style={{ justifyContent: 'flex-end', paddingBottom: 15, }}>
									<Text style={{ color: '#333', fontSize: 60 }}>%</Text>
								</View>
							</View>
						</View>
					)}
				</AnimatedCircularProgress>
				<View
					style={{
						flex: 2,
						elevation: 4,
						marginLeft: 30,
						marginRight: 30,
						marginBottom: 30,
						borderRadius: 3,
						marginTop: 210
					}}
				>
					<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, flexDirection: "row" }}>
					    <Icon name="book" color={'#1e90ff'} size={25} />
						<Text style={{ fontSize: 18, color: '#333', marginLeft: 10 }}>Number of Days you were Absent</Text>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						{this.numberOfAbsentComponent()}
					</View>
					<View style={{ paddingBottom: 30, justifyContent:"center", alignItems:"center"}}>
						<ButtonSecondary
							title="SAVE"
							color="#f2c94c"
							onPress={() =>
								this.props.subjectAbsentUpdate({
									absent_hours: this.props.absent_hours,
									uid: this.props.subject.uid
								})
							}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	const { absent_hours, total_hours, subject_name } = state.subject;
	return { absent_hours, total_hours, subject_name };
};

export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectAbsentUpdate, reset }
)(SubjectMain);
