import axios from 'axios';

import { BASE_URL_QUIZ } from '../consts';

export const getQuestions = async (token, questtionaireID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_QUIZ }detail/${ questtionaireID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};