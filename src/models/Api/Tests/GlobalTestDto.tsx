import { UserInfo } from "../Accounts/UserInfo"
import { TestDto } from "./TestDto"

export type GlobalTestDto = {  // Пересечение типов (extends для типов)
    test: TestDto;
    user: UserInfo;
};