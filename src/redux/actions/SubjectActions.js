import { Actions } from 'react-native-router-flux';
import { SUBJECT_DETAIL_CHANGE, SUBJECT_FETCH_SUCCESS, RESET, LOADING, MODAL } from './types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const subjectDetailChange = value => ({
	type: SUBJECT_DETAIL_CHANGE,
	payload: value
});

export const subjectCreate = ({ subject_name, teacher_name, total_hours }) => {
	const { currentUser } = auth();
	return dispatch => {
		dispatch({ type: LOADING, payload: true });
			database()
			.ref(`/users/${currentUser.uid}/subjects`)
			.push({ subject_name, teacher_name, total_hours, absent_hours: 0 })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
				dispatch({ type: RESET });
			});
	};
};

export const subjectFetch = () => {
	const { currentUser } = auth();
	return dispatch => {
		dispatch({ type: LOADING, payload: true });
			database()
			.ref(`/users/${currentUser.uid}/subjects`)
			.on('value', snapshot => {
				dispatch({ type: SUBJECT_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const subjectPrimaryUpdate = ({ subject_name, teacher_name, total_hours, uid }) => {
	const { currentUser } = auth();
	return () => {
			database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.update({ subject_name, teacher_name, total_hours })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
			});
	};
};

export const subjectAbsentUpdate = ({ absent_hours, uid }) => {
	const { currentUser } = auth();
	return () => {
			database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.update({ absent_hours })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
			});
	};
};

export const subjectDelete = ({ uid }) => {
	const { currentUser } = auth();
	return () => {
			database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.remove()
			.then(() =>
				Actions.subjectList({
					type: 'reset'
				})
			);
	};
};

export const reset = () => ({
	type: RESET
});

export const displayModal = value => ({
	type: MODAL,
	payload: value
});
