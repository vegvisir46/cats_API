import { useState, useEffect } from 'react';
import { API_KEY } from '../config';
import { CatsList } from '../components/CatsList';
import { Preloader } from '../components/Preloader';

function Main() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(100);

    const updateData = (data) => {
        const favoritCats = JSON.parse(localStorage.getItem('favoritCats'));
        if (favoritCats) {
            const newData = data.map((element) => {
                favoritCats.findIndex((cat) => cat.id === element.id) !== -1
                    ? (element.className = 'visible-active')
                    : (element.className = '');
                return element;
            });
            return newData;
        } else {
            const newData = data.map((element) => {
                element.className = '';
                return element;
            });
            return newData;
        }
    };

    useEffect(
        function getCats() {
            const myHeaders = new Headers();
            myHeaders.set('x-api-key', API_KEY);

            fetch(
                `https://api.thecatapi.com/v1/images/search?limit=20&page=${currentPage}&order=ASC&size=small`,
                {
                    headers: myHeaders,
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setCurrentPage((prevState) => prevState + 1);
                    data && setCats([...cats, ...updateData(data)]);
                })
                .finally(() => setLoading(false));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loading]
    );

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            60
        )
            setLoading(true);
    };

    const addToFavorites = (id, url) => {
        const newCat = {
            id: id,
            url: url,
            className: 'active',
        };
        const newCats = cats.map((cat) => {
            if (cat.id === id)
                cat.className === ''
                    ? (cat.className = 'visible-active')
                    : (cat.className = '');
            return cat;
        });
        setCats(newCats);
        const favoritCats = JSON.parse(localStorage.getItem('favoritCats'));
        if (favoritCats === null) {
            localStorage.setItem('favoritCats', JSON.stringify([newCat]));
        } else {
            const index = favoritCats.findIndex((cat) => cat.id === newCat.id);
            if (index === -1) {
                localStorage.setItem(
                    'favoritCats',
                    JSON.stringify([...favoritCats, newCat])
                );
            } else {
                favoritCats.splice(index, 1);
                localStorage.setItem(
                    'favoritCats',
                    JSON.stringify(favoritCats)
                );
            }
        }
    };

    return (
        <main className="main">
            <div className="container">
                <CatsList cats={cats} onClickFunction={addToFavorites} />
                <Preloader />
            </div>
        </main>
    );
}

export { Main };
