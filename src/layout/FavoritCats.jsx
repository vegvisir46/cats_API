import { useEffect, useState } from 'react';
import { CatsList } from '../components/CatsList';

function FavoritCats() {
    const [favoritLocal, setFavoritLocal] = useState([]);

    useEffect(function getLocalCats() {
        const favoritCats = JSON.parse(localStorage.getItem('favoritCats'));
        setFavoritLocal(favoritCats);
    }, []);

    const removeOnFavorites = (id) => {
        const favoritCats = JSON.parse(localStorage.getItem('favoritCats'));
        favoritCats.splice(
            favoritCats.findIndex((cat) => cat.id === id),
            1
        );
        localStorage.setItem('favoritCats', JSON.stringify(favoritCats));
        setFavoritLocal(favoritCats);
    };

    return (
        <main className="main">
            <div className="container">
                <CatsList
                    cats={favoritLocal}
                    onClickFunction={removeOnFavorites}
                />
            </div>
        </main>
    );
}

export { FavoritCats };
