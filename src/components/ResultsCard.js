import '../styles/ResultsCard.css';
import CardItem from './CardItem';

const ResultsCard = ({ data }) => {
    const cardData = [
        ["IP ADDRESS", data.ip],
        ["LOCATION", data.region],
        ["TIMEZONE", data.timezone],
        ["ISP", data.isp]
    ];

    return (
        <div className="card">
            {
                cardData.map((item) => {
                    return (
                        <CardItem cardData={item} />
                    )
                })
            }
        </div>
    );
}

export default ResultsCard;