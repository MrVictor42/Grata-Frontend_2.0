import React, { Component } from 'react';
import { Menu, Dropdown, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { 
    DownOutlined, UserOutlined, TeamOutlined, 
    LogoutOutlined, UserAddOutlined, EnvironmentOutlined,
    OrderedListOutlined, AppstoreAddOutlined, AuditOutlined 
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FormSectorCreate from '../forms/sector/FormSectorCreate';
import FormUserCreate from '../forms/user/FormUserCreate';
import FormProjectCreate from '../forms/project/FormProjectCreate';
import FormMeetingCreate from '../forms/meeting/FormMeetingCreate';

import { getCurrentUser, getUserToken, getUserId } from '../../store/user';
import { typeUser } from '../../services/userService';
import { logout } from '../../store/auth';

class DropdownNav extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentUser: {},
        }
    }

    async componentDidMount() {
        const token = getUserToken();
        const userId = getUserId();
        const user = await getCurrentUser(token, userId);
        this.setState({ currentUser: user });
    }    

    render() {
        const { currentUser } = this.state;
        const username = currentUser.username;
        const type = typeUser(currentUser.is_administrator);
        return (
            <div>
                <Dropdown overlay = { 
                    <Menu>
                        <Menu.Item key = '1'> 
                            <UserOutlined /> 
                            <Link to = { '/informacoes_usuario' }> Meu Perfil </Link>
                        </Menu.Item>
                        <Divider/>

                        <Menu.Item key = '2'> 
                            <TeamOutlined />
                            <Link to = { '/lista_de_usuarios' }> Lista de Usuários </Link>
                        </Menu.Item>
                        <Divider/>

                        {
                            type === 'Administrador' ? (
                                <Menu.Item key = '3'> 
                                    <UserAddOutlined />
                                    <FormUserCreate />
                                    <Divider/>
                                </Menu.Item>
                            ) : null
                        }

                        <Menu.Item key = '4' onClick = { this.props.logout }> 
                            <LogoutOutlined />
                            <Link to = { '/' }> Sair da Sessão </Link>
                        </Menu.Item>
                    </Menu> 
                }>
                    <span className = 'ant-dropdown-link'>
                        <UserOutlined/> 
                            Olá, { username } 
                        <DownOutlined />
                    </span>
                </Dropdown>

                <Dropdown overlay = { 
                    <Menu>
                        <Menu.Item key = '5'> 
                            <OrderedListOutlined /> 
                            <Link to = { '/lista_de_setores' }> Lista de Setores </Link>
                        </Menu.Item>
                        {
                            type === 'Administrador' ? (
                                <Menu.Item key = '6'> 
                                    <AppstoreAddOutlined />
                                    <FormSectorCreate />
                                </Menu.Item>
                            ) : null
                        }
                    </Menu> 
                }>
                    <span className = 'ant-dropdown-link'>
                        <EnvironmentOutlined/> Setor <DownOutlined />
                    </span>
                </Dropdown>

                {
                    type === 'Administrador' ? (
                        <Dropdown overlay = { 
                            <Menu>
                                <Menu.Item key = '7'> 
                                    <AppstoreAddOutlined />
                                    <FormProjectCreate />
                                </Menu.Item>
                            </Menu> 
                        }>
                            <span className = 'ant-dropdown-link'>
                                <EnvironmentOutlined/> Projetos <DownOutlined />
                            </span>
                        </Dropdown>
                    ) : null
                }

                {
                    type === 'Administrador' ? (
                        <Dropdown overlay = { 
                            <Menu>
                                <Menu.Item key = '7'> 
                                    <AppstoreAddOutlined />
                                    <FormMeetingCreate />
                                </Menu.Item>
                            </Menu> 
                        }>
                            <span className = 'ant-dropdown-link'>
                                <AuditOutlined/> Reuniões <DownOutlined />
                            </span>
                        </Dropdown>
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownNav));