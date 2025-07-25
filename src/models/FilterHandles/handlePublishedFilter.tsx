import { TestDto } from "../Dtos/Tests/TestDto";

export const handlePublishedFilter = (cards: TestDto[], value: string) => {
    if (value === "") {
        return cards;
    } 
    else {
        return cards.filter(card => 
            value === "Да" ? card.isPublished : !card.isPublished
        );
    }
};