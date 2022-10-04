import React, { Component, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, BackHandler, Alert, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { MaterialDialog } from 'react-native-material-dialog';
import { connect } from 'react-redux';
import { subjectFetch, loadingSwitch, reset, displayModal } from '../redux/actions';
import auth from '@react-native-firebase/auth';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SubjectList extends Component {
	UNSAFE_componentWillMount() {
		this.props.loadingSwitch(true);
		this.props.subjectFetch();
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
			return true;
		});
	}
	
	UNSAFE_componentWillUpdate() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
			return true;
		});
	}

	activityIndicator() {
		if (this.props.loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" animating={this.props.loading} />
				</View>
			);
		}
		return <View />;
	}

	renderSubjects = ({ item }) => (
		<TouchableWithoutFeedback
			onPress={() => {
				Actions.mainSubject({ subject: item });
			}}
		>
			<View style={styles.postCard}>

				<View style={styles.postHeader}>

					<Text style={styles.userName} >{item.subject_name} </Text>

					{/*<TouchableOpacity>
									<Icon name="more-vert" color={'#fff'} size={25} />
									</TouchableOpacity> */}


				</View>

				<View style={styles.postHeader}>
					<Text style={[styles.userName1, { marginTop: 10 }]} >{item.teacher_name} </Text>
				</View>
			</View>
		</TouchableWithoutFeedback>

	);


	//render the empty list component in case the data array for the FlatList is empty
	renderListEmptyComponent = () => (
		<View style={{
			marginTop: windowHeight/2.5,
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			
			<Text style={{ fontSize: 18, color: "#000" }}>
				Click on the Add Button to Add Subjects!
			</Text>
		</View>
	);

	render() {
		return (
			<View style={{
				backgroundColor: "#fff", flex: 1,
				justifyContent: "center",
				alignItems: "center", marginTop: 4
			}}>

				<FlatList

					data={this.props.list}
					renderItem={this.renderSubjects}

					ListEmptyComponent={this.renderListEmptyComponent}
					keyExtractor={item => item.uid}
				/>
				<MaterialDialog
					title="Log Out"
					colorAccent="#1e90ff"
					visible={this.props.display_modal}
					onCancel={() => this.props.displayModal(false)}
					onOk={() => {
						Actions.tabKey({ type: 'reset' });
						auth().signOut();
						this.props.displayModal(false);
					}}
				>
					<Text style={{ fontSize: 18, color: "#333" }}>Do you really want to Logout?</Text>
				</MaterialDialog>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	listCard: {
		flex: 1,
		backgroundColor: '#fff',
		elevation: 1.5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 0.5,
		marginBottom: 10,
		borderRadius: 3
	},
	postHeader: {
		padding: 18,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	postBody: {
		padding: 10,
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	postCard: {
		padding: 10,
		margin: 4,
		elevation: 5,
		backgroundColor: '#4c6375',
		borderRadius: 8,
		width: windowWidth - 20
	},
	userName: {
		paddingLeft: 3,
		fontSize: 22,
		color: '#fff',
		fontFamily: 'OpenSans-Regular'
	},
	userName1: {
		paddingLeft: 3,
		fontSize: 13,
		color: '#fff',
		fontFamily: 'OpenSans-Regular'
	},
});
const mapStateToProps = state => {
	const list = _.map(state.subjectList, (val, uid) => ({ ...val, uid }));
	const { loading } = state.auth;
	const { display_modal } = state.subject;
	console.log(display_modal);

	return { list, loading, display_modal };
};
export default connect(
	mapStateToProps,
	{ subjectFetch, loadingSwitch, reset, displayModal }
)(SubjectList);
