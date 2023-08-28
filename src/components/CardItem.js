const CardItem = ({ cardData }) => {
    return (
        <div>
            <div className="ip-address-container" >
                <h5>{cardData[0]}</h5>
                <h2>{cardData[1]}</h2>

            </div>
        </div>
    );
}

export default CardItem;