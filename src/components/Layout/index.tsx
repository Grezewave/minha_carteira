import React from 'react'

import { Container } from './styles'

import MainHeader from '../MainHeader'
import Content from '../Content'
import Aside from '../Aside'
import {IContentProps} from '../Content'



const Layout: React.FC<IContentProps> = ({children}) =>{

    return (
        <Container>
            <MainHeader/>
            <Aside/>
            <Content>
                {children}
            </Content>
            
        </Container>    
    )  

}


export default Layout