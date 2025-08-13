import { TestDto } from "../Api/Tests/TestDto";

export function handleSearch(cards: TestDto[], value: string) {
    if (!value) 
        return cards;

    return cards.filter(card => 
        card.testName.toLowerCase().includes(value.toLowerCase())
    );
}