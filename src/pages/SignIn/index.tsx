import React, {useState} from 'react'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'

import {Container, Logo, Form, FormTitle} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn: React.FC = () =>{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {signIn} = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt = 'Minha Carteira' />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={()=>signIn(email,password)}>
                <FormTitle>
                    Entrar
                </FormTitle>

                <Input
                    type="email"
                    required
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    required
                    placeholder='Senha'
                    onChange={e => setPassword(e.target.value)}
                />
                <Button type='submit'>
                    Acessar
                </Button>
            </Form>
        </Container>
    )  

}


export default SignIn