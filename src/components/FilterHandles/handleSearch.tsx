import { TestDto } from "../../models/Dtos/TestDto";

export const handleSearch = (cards: TestDto[], value: string) => {
    return !value ? cards : cards.filter(card => 
        card.testName.toLowerCase().includes(value.toLowerCase())
    );
};