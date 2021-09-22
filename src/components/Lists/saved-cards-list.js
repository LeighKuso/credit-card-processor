import React, { useEffect, useState } from 'react';
import Card from 'react-credit-cards';

export default function SavedCards(props) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cardsList = Object.keys(props.cards).map(key => ({
            ...props.cards[key]
        }));
        setCards(cardsList);
        return () => {
            setCards([]);
        };
    }, [props.cards]);

    return (
        <div className='saved-cards-list'>
            {cards.map(card => (
                <div className='saved-card'> 
                <Card
                    number={card.cardNumber}
                    name={card.cardName}
                    expiry={card.cardExpiry}
                    cvc={card.cardCVC}
                />
                </div>
            ))}
        </div>
    )
}
