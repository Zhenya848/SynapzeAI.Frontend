import { Test } from "../../../entities/test/Test";

export function handleSearch(cards: Test[], value: string) {
    if (!value) 
        return cards;

    return cards.filter(card => 
        card.testName.toLowerCase().includes(value.toLowerCase())
    );
}