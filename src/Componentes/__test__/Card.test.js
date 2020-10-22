import React from 'react';
import Card from './../Card';
import "jest-dom/extend-expect";
import { render } from '@testing-library/react';

describe('Card test', ()=>{
    it('Card',()=>{
        const {getByTestId} = render(<Card 
            pelicula = "862"
            titulo = "Toy story"
            rating = "3.75"
            genero = "Children|Comedy"
            key = "1"
            />)
        expect(getByTestId('cardMovie')).toContainHTML('<div></div>')
    })
})