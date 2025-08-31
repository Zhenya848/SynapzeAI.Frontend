export const GetNumberSecondsWordRus = (number: number) => {
    const lastNum = number % 10;

    if (lastNum === 0 || (number > 10 && number < 20)) {
        return "секунд";
    }

    if (lastNum === 1) {
        return "секунда";
    }

    if (['2', '3', '4'].indexOf(lastNum.toString()) !== -1) {
        return "секунды";
    }

    return "секунд";
}