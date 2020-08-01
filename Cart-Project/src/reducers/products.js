var initialState = [
    {
        id: 1,
        name: 'Iphone 7 Plus',
        image:'https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-11-pro-max-space-select-2019.png',
        description:'San pham do Apple',
        price: 500,
        inventory: 10, // so luong ton
        rating:4
    },
    {
        id: 2,
        name: 'Iphone x ',
        image:'https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-11-pro-max-space-select-2019.png',
        description:'San pham do Apple',
        price: 800,
        inventory: 10, // so luong ton
        rating: 3
    },
    {
        id: 3,
        name: 'Iphone 11 Plro',
        image:'https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-11-pro-max-space-select-2019.png',
        description:'San pham do Apple',
        price: 1000,
        inventory: 5, // so luong ton
        rating:5
    }
];

// funtion reducer 
const products = (state =initialState, action)=>{
    switch(action.type){
        default: return [...state]
    }
}

export default products;