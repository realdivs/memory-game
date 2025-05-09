import { useState, useEffect } from "react";

export const MemoryGame = () => {
  const [cards, setCards] = useState(generateGrid());
  const [lock, setIsLock] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);

  const handleClick = (index) => {
    if (cards[index].isFlipped || lock) {
      return;
    }
    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...flippedCard, index]);
  };

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (cards[flippedCard[0]].number !== cards[flippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[flippedCard[0]].isFlipped = false;
            copyCards[flippedCard[1]].isFlipped = false;
            return copyCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [flippedCard]);

  return (
    <div className="grid-container">
      {cards.map(({ id, number, isFlipped }) => (
        <button className="cards" key={id} onClick={() => handleClick(id)}>
          {isFlipped ? number : "?"}
        </button>
      ))}
    </div>
  );
};

function generateGrid() {
  const arr = Array.from({ length: 18 }, (_, i) => i + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlipped: false };
  });
  return cards;
}
