import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { authDetailChange, signInAction, fieldEmpty, loadingSwitch } from '../redux/actions';
import { Input, ButtonSecondary } from '../components/common';
import { Actions } from 'react-native-router-flux';


class SignInForm extends Component {
	componentWillMount() {
		this.props.loadingSwitch(false);
	}

	onButtonPress() {
		if (this.props.password && this.props.email) {
			const { email, password } = this.props;
			this.props.signInAction({ email, password });
		} else {
			this.props.fieldEmpty();
		}
	}
	renderError() {
		return <Text style={styles.errorText}>{this.props.error}</Text>;
	}
	renderButton() {
		if (this.props.loading) {
			return <ActivityIndicator size="large" />;
		}
		return (<View style={{ justifyContent:"center", alignItems:"center"}}><ButtonSecondary title="SIGN IN" color="#f2c94c" onPress={() => this.onButtonPress()} /></View>)
	}

	render() {
		const { container, buttonWrap, subView } = styles;
		return (
			<View style={container}>
				<Image source={require('../../assets/icon.png')} style={{ justifyContent: "center", alignSelf:"center", marginTop:70, marginBottom:10}}/>
				<View style={subView}>
					<View>
						<Input
							value={this.props.email}
							placeHolder="user@mail.com"
							label="E-mail"
							ktype="email-address"
							rtype="next"
							blurOnSubmit={false}
							autoCapitalize="none"
							onSubmitEditing={() => {
								this.passwordInput.focus();
							}}
							onChangeText={value => {
								this.props.authDetailChange({ prop: 'email', value });
							}}
						/>

						<Input
							value={this.props.password}
							placeHolder="password"
							label="Password"
							rtype="default"
							secureTextEntry
							autoCapitalize="none"
							onSubmitEditing={() => {
								this.onButtonPress();
							}}
							refs={input => {
								this.passwordInput = input;
							}}
							onChangeText={value => {
								this.props.authDetailChange({ prop: 'password', value });
							}}
						/>
					</View>
					<View style={{justifyContent:"center", alignItems:"center", marginTop:60}}>
						<TouchableOpacity onPress={()=> Actions.signup()}>
							<Text style={{fontSize:18,color:"#333"}}>Dont have an account? Register Here</Text>
						</TouchableOpacity>
					</View>
					<View style={buttonWrap}>{this.renderButton()}</View>
					<View style={styles.errorView}>{this.renderError()}</View>
					
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { backgroundColor: '#fff', flex: 1,},
	buttonView: { flex: 2 },
	errorText: {
		color: '#f00',
		fontSize: 15
	},
	errorView: {
		alignItems: 'center',
		height: 30,
		width: '100%',
		marginTop: 20
	},
	buttonWrap: { marginTop: 20 },
	subView: { flex: 1, marginTop: 15 },
});

const mapStateToProp = state => {
	const { email, password, error, loading } = state.auth;

	return {
		email,
		password,
		error,
		loading
	};
};
export default connect(
	mapStateToProp,
	{ authDetailChange, signInAction, fieldEmpty, loadingSwitch }
)(SignInForm);
