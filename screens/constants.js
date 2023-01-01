import {db, auth} from '../db/firebase';

export const items = [
    {
        id: 1,
        name: 'Apple',
        price: 1.99,
        image: '..../assets/icon.png',
        categories: ['Fruits', 'Breakfast']
    },
    {
        id: 2,
        name: 'Toast',
        price: 2.99,
        image: '..../assets/icon.png',
        categories: ['Breakfast']
    },
    {
        id: 3,
        name: 'Coca Cola',
        price: 3.99,
        image: '..../assets/icon.png',
        categories: ['Drinks']
    },
    {
        id: 4,
        name: 'Kinder',
        price: 4.99,
        image: '..../assets/icon.png',
        categories: ['Snacks']
    },
    {
        id: 5,
        name: 'Hamburger',
        price: 5.99,
        image: '..../assets/icon.png',
        categories: ['Lunch']
    },
    {
        id: 6,
        name: 'Banana',
        price: 6.99,
        image: '..../assets/icon.png',
        categories: ['Fruits']
    },
    {
        id: 7,
        name: 'Orange',
        price: 7.99,
        image: '..../assets/icon.png',
        categories: ['Fruits']
    },
    {
        id: 8,
        name: 'Pineapple',
        price: 8.99,
        image: '..../assets/icon.png',
        categories: ['Fruits']
    },
    {
        id: 9,
        name: 'Blueberry',
        price: 9.99,
        image: '..../assets/icon.png',
        categories: ['Fruits']
    },
]

export const categories = ['Fruits', 'Breakfast', 'Drinks', 'Snacks', 'Lunch'];

export const orders = [
    {
        items: [
            {
                id: 1,
                name: 'Apple',
                price: 1.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 2,
                name: 'Banana',
                price: 2.99,
                image: '..../assets/icon.png',
                amount: 3,
            },
        ],
        total: 10.97,
        date: '2021-01-01',
        status: 'Pending',
        userId : 'h235hn23jbk24',
        id: 'h235hn23asdadasd'
    },
    {
        items: [
            {
                id: 3,
                name: 'Orange',
                price: 3.99,
                image: '..../assets/icon.png',
                amount: 2,
            },
            {
                id: 4,
                name: 'Pineapple',
                price: 4.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
        ],
        total: 13.97,
        date: '2021-01-02',
        status: 'Completed',
        userId : 'h235hnghfghgffdgs',
        id: 'ajsfnkdjgadnflaskf'
    },
    {
        items: [
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
        ],
        total: 5.99,
        date: '2021-01-03',
        status: 'Cancelled',
        userId: 'h235hn23jbk242134567',
        id: 'eioue2893eu2938r2or',
    },
    {
        items: [
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
        ],
        total: 5.99,
        date: '2021-01-03',
        status: 'Cancelled',
        userId: 'h235hn23jbk242134567',
        id: 'eioue2893eu2938r2or',
    },
    {
        items: [
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
        ],
        total: 5.99,
        date: '2021-01-03',
        status: 'Cancelled',
        userId: 'h235hn23jbk242134567',
        id: 'eioue2893eu2938r2or',
    },
    {
        items: [
            {
                id: 5,
                name: 'Strawberry',
                price: 5.99,
                image: '..../assets/icon.png',
                amount: 1,
            },
        ],
        total: 5.99,
        date: '2021-01-03',
        status: 'Cancelled',
        userId: 'h235hn23jbk242134567',
        id: 'eioue2893eu2938r2or',
    },
]