import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';

export default function NewScreen(){
    const [titulo, setTitulo] = useState('');

    return (
        <Layout>
            <Input 
                label="Buscar"
                placeholder="escribir aqui..."
                type="default"
                value={titulo}
                onChangeText={setTitulo} />

        </Layout>
    );
}