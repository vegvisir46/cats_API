import { CatsItem } from './CatsItem';

function CatsList(props) {
    const { cats = [], onClickFunction = Function.prototype } = props;

    if (cats === null || cats.length === 0) {
        return '';
    }

    return (
        <div className="main__images">
            {cats.map((cat) => (
                <CatsItem
                    key={cat.id}
                    url={cat.url}
                    id={cat.id}
                    className={cat.className}
                    onClickFunction={onClickFunction}
                />
            ))}
        </div>
    );
}

export { CatsList };
