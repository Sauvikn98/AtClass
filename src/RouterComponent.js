import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Scene, Router, Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import Icons from 'react-native-vector-icons/AntDesign';
import {
	SignInForm,
	SignUpForm,
	SubjectList,
	AddSubject,
	SubjectMain,
	EditSubject
} from './screens';
import { displayModal } from './redux/actions';

const iconText = ({ selected, title }) => (
	<View style={{ flex: 1, justifyContent: 'center' }}>
		<Text style={{ fontSize: 16, fontWeight: "bold",color: selected ? '#1e90ff' : '#333' }}>{title}</Text>
	</View>
);

class RouterComponent extends Component {
	render() {
		return (
			<Router navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
				<Scene key="root" sceneStyle={{ paddingBottom: 50 }} panHandlers={null} hideNavBar>
				    <Scene key="Splash" component={Splash} type="reset" panHandlers={null} hideNavBar initial />
				    <Scene key="tabKey" type='replace' hideNavBar={true}>
					
						<Scene
							key="signin"
							panHandlers={null}
							title="SIGN IN"
							icon={iconText}
							hideNavBar
							component={SignInForm}
						
						/>
							
						
						<Scene
							key="signup"
							title="SIGN UP"
							icon={iconText}
							hideNavBar
							component={SignUpForm}
							panHandlers={null}
						/>
							
						
					</Scene>
	
					
					<Scene key='main' type='replace'>
					<Scene
					renderLeftButton={() => (
						<View style={{flexDirection: "row"}}>
							<TouchableOpacity onPress={() => this.props.displayModal(true)}>
								<Icon name="logout" size={26} color="#f00" style={{ marginLeft: 15 }} />
							</TouchableOpacity>
							
						</View>
					)}
						navigationBarStyle={{backgroundColor:'#fff', borderBottomWidth:0}}
						initial
						
						title="AtClass"
						key="subjectList"
						panHandlers={null}
						component={SubjectList}
						type="replace"
						rightTitle="ADD"
						rightButtonTextStyle={styles.elRightButtonText}
						onRight={() => {
							Actions.addSubject();
						}}
						
						sceneStyle={styles.margin80}
						
					/>
					<Scene
						key="addSubject"
						title = "Subject Details"
						titleStyle={{flex: 1,
							textAlign: 'center', marginRight: 50}}
						panHandlers={null}
						component={AddSubject}
						leftButtonIconStyle={styles.ecLeftIcon}
						leftButtonStyle={styles.ecLeftButton}
						sceneStyle={styles.margin80}
						duration={2}
						renderLeftButton={() => (
							<View style={{flexDirection: "row"}}>
								<TouchableOpacity onPress={() => Actions.subjectList({ type: 'reset' })}>
									<Icons name="left" size={26} color="#1e90ff" style={{ marginLeft: 15 }} />
								</TouchableOpacity>
								
							</View>
						)}
					/>
					<Scene
						key="editSubject"
						title = "Subject Details"
						titleStyle={{flex: 1,
							textAlign: 'center', marginRight: 50}}
						panHandlers={null}
						component={EditSubject}
						renderLeftButton={() => (
							<View style={{flexDirection: "row"}}>
								<TouchableOpacity onPress={() => Actions.subjectList({ type: 'reset' })}>
									<Icons name="left" size={26} color="#1e90ff" style={{ marginLeft: 15 }} />
								</TouchableOpacity>
								
							</View>
						)}
						
					/>
					<Scene
					    renderLeftButton={() => (
							<View style={{flexDirection: "row"}}>
								<TouchableOpacity onPress={() => Actions.subjectList({ type: 'reset' })}>
									<Icons name="left" size={26} color="#1e90ff" style={{ marginLeft: 15 }} />
								</TouchableOpacity>
								
							</View>
						)}
						title= "Attendance"
						key="mainSubject"
						panHandlers={null}
						component={SubjectMain}
						renderRightButton={() => (
							<View style={{flexDirection: "row"}}>
								<TouchableOpacity onPress={() => Actions.editSubject()}>
									<Iconss name="edit" size={26} color="#1e90ff" style={{ marginRight: 15 }} />
								</TouchableOpacity>
							</View>
						)}
						rightButtonTextStyle={styles.elRightButtonText}
						onRight={() => {
							Actions.editSubject();
						}}
					/>
					</Scene>
					
				</Scene>
			</Router>
		);
	}
}
const styles = StyleSheet.create({
	navigationBarStyle: {
		backgroundColor: '#fff',
		elevation: 3,
		borderBottomColor: 'grey',
		height: 60,
	
	},

	titleStyle: {
		paddingTop: 3,
		fontWeight: '500',
		fontSize: 20,
		color: "#333"
	},

	elRightButtonText: {
		paddingRight: 10,
		color: '#1e90ff',
		fontWeight: 'bold',
		fontSize: 22
	},
	ecLeftButton: {
		paddingLeft: 20
	},
	ecLeftIcon: {
		tintColor: '#1e90ff'
	},
	margin80: {
		marginTop: 60,
	},
	margin100: {
		marginTop: 80
	}
});

class Splash extends Component {
	componentDidMount() {
		auth().onAuthStateChanged(user => {
			if (user) {
				Actions.main({ type: 'reset' });
			} else {
				Actions.tabKey({ type: 'reset' });
			}
		});
	}
	componentWillUnmount() {
		//	Splash;
		SplashScreen.hide();
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

export default connect(
	null,
	{ displayModal }
)(RouterComponent);
