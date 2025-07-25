import { TestDto } from "../Dtos/Tests/TestDto";

export const handleTimeLimitFilter = (cards: TestDto[], value: string) => {
    if (value === "") {
        return cards;
    } 
    else {
        return cards.filter(card => 
            value === "Есть" ? card.limitTime : !card.limitTime
        );
    }
};