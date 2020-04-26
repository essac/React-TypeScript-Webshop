import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import './Products.css';
import CartContext from '../../context/Cart';

export interface IMovie {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    productCategory: IProductCategory[];
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IProductCategory {
    categoryId: number;
}

export default function Products() {
    const currentShopCart = useContext(CartContext);

    const defaultMovies: IMovie[] = [];
    const [movies, setMovies] = useState(defaultMovies);

    const defaultCategoryValue: ICategory[] = [];
    const [category, setCategory] = useState(defaultCategoryValue);

    const [searchBarValue, setSearchBarValue] = useState('');

    const [filter, setFilter] = useState(-1);

    useEffect(() => {
        fetch('https://medieinstitutet-wie-products.azurewebsites.net/api/products/')
            .then(r => r.json())
            .then((r: IMovie[]) => {
                setMovies(r);
            });

        fetch('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
            .then(r => r.json())
            .then((r: ICategory[]) => {
                setCategory(r);

            });
    }, []);

    const searchProduct = (event: ChangeEvent<HTMLInputElement>) => {
        let searchProduct = event.target.value;

        setSearchBarValue(event.target.value);

        if (!searchProduct) {
            clearSearchBar();
            return;
        }

        fetch('http://medieinstitutet-wie-products.azurewebsites.net/api/search/?searchText=' + searchProduct)
            .then(r => r.json())
            .then((r: IMovie[]) => {
                if (JSON.stringify(r) === '{}') {
                    setMovies(defaultMovies);
                }
                else {
                    setMovies(r);
                }
            });
    }

    const clearSearchBar = () => {
        fetch('https://medieinstitutet-wie-products.azurewebsites.net/api/products/')
            .then(r => r.json())
            .then((r: IMovie[]) => {
                setMovies(r);
            });

        setSearchBarValue('');
    }

    const filterCategory = (item: ICategory) => {
        setFilter(item.id);
    }

    const resetFilterCategory = () => {
        setFilter(-1);
    }

    return (
        <React.Fragment>
            <div className='searchBar-parent'>
                <div className='searchBar-child'>
                    <input type='text' className='searchBar' value={searchBarValue} placeholder='Search a movie title..' onChange={searchProduct}></input>

                    <button type="button" className='btn btn-warning searchBar-clear' onClick={clearSearchBar}>Clear result <i className='fa fa-history'></i></button>
                </div>

                <div className='category-parent'>
                    <div className='category-child' >
                        <button type="button" className='btn btn-info resetCategory-btn' onClick={resetFilterCategory}><i className="fa fa-film"></i> Show all</button>
                    </div>

                    {category.map(item => {
                        return (
                            <div className='category-child' key={item.id}>
                                <button type="button" className='btn btn-info category-btn' onClick={() => filterCategory(item)}><i className='fa fa-tag'></i> {item.name}</button>
                            </div>
                        );
                    })}
                </div>

                <div className='parent'>
                    {movies
                        .filter(movie => filter < 0 || (movie.productCategory || []).some(cate =>
                            cate.categoryId === filter
                        ))
                        .map((item: IMovie) => {
                            return (
                                <div className='child' key={item.id}>
                                    <p className='movieTitle'>Title: {item.name}</p>
                                    <p className='moviePrice'>Price: {item.price} Kr</p>
                                    <img className='movieImage' alt="test" src={item.imageUrl} />
                                    <p className='movieDescription'><i className="fa fa-info-circle"></i> Movie Discription: </p>
                                    <p className='movieDesc'>{item.description}</p>

                                    <button type="button" className='btn btn-warning addToCart-btn' onClick={() => currentShopCart.setShopCart(item)}>Add to cart <i className='fa fa-cart-arrow-down'></i></button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </React.Fragment>
    );
}



