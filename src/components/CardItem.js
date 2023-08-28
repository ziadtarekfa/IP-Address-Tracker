import '../styles/CardItem.css';
const CardItem = ({ cardData }) => {
    return (

        <div className="card-item" >
            <h5>{cardData[0]}</h5>
            <h2>{cardData[1]}</h2>
        </div>

    );
}

export default CardItem;