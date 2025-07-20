import { TestDto } from "../../models/Dtos/TestDto";

export const handleSort = (cards: TestDto[], property: string) => {
    return [...cards].sort((a, b) => {
        let valueA, valueB;
        
        if (property === "Время прохождения") {
            if (a.limitTime && b.limitTime) {
                const valueA = a.limitTime.minutes * 60 + a.limitTime.seconds;
                const valueB = b.limitTime.minutes * 60 + b.limitTime.seconds;

                console.log(valueA);
                console.log(valueB);

                return valueA - valueB;
            }

            if (!a.limitTime && b.limitTime) 
                return 1;

            if (a.limitTime && !b.limitTime) 
                return -1;

            return 0;
        }

        switch(property) {
            case "Название":
                valueA = a.testName.toLowerCase();
                valueB = b.theme.toLowerCase();

                break;
            case "Тема":
                valueA = a.theme;
                valueB = b.theme;

                break;
            default:
                return 0;
        }
        
        if (valueA < valueB) 
            return -1;

        if (valueA > valueB) 
            return 1;
        
        return 0;
    });
};