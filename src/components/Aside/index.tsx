import React, {useState} from 'react';

import logoImg from '../../assets/logo.svg';

import { Container, Header, LogoImg, Title, MenuContainer, MenuItemLink,MenuItemButton, ToggleMenu, ThemeToggleFooter } from './styles';

import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu} from 'react-icons/md';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';

const Aside: React.FC = () =>{
    const {signOut} = useAuth();
    const {toggleTheme, theme} = useTheme();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleToggleMenu = ()=> {
        setMenuIsOpen(!menuIsOpen);
    }

    const handleToggleTheme = ()=> {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container menuIsOpen={menuIsOpen}>
            <Header>
                <ToggleMenu
                    onClick={() => handleToggleMenu()}
                >
                    {
                        menuIsOpen ? <MdClose /> : <MdMenu />
                    }
                </ToggleMenu>
                <LogoImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward/>
                    Entrada
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward/>
                    Saida
                </MenuItemLink>

                <MenuItemLink href='/' onClick={signOut}>
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>

                <ThemeToggleFooter menuIsOpen={menuIsOpen}>
                    <Toggle
                        labelLeft="Light"
                        labelRight="Dark"
                        checked={darkTheme}
                        onChange={handleToggleTheme}
                    />
                </ThemeToggleFooter>
            </MenuContainer>
            
        </Container>    
    )  

}


export default Aside