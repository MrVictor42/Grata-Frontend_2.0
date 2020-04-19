import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import AutoComplete from './AutoComplete';

import '../../css/layout.css';
import '../../css/icon.css';
import '../../css/text.css';
import '../../css/project.css';
import '../../css/user.css';
import '../../css/buttons.css';
import '../../css/img.css';

const { Footer } = Layout;

const CustomLayout = (props) => {
	return (
		<Layout>
			<Navbar isLogged = { props.token }/>
			{
				props.token !== null ? (
					<AutoComplete />
				) : null
			}
			{ props.children }
			<Footer className = 'footer'>
				<b> 
					Grata - Gerenciamento de Reuniões e Atas ©2020 
					Criado por Victor Hugo Lopes Mota. 
				</b>
			</Footer>
		</Layout>
	);
}

const mapStateToProps = state => {
    return { token: state.auth.token };
};

export default withRouter(connect(mapStateToProps)(CustomLayout));