import { Props } from "./RootLayout";


export function ContentBolck(props: Props) {
    return (
        <div className="w-full bg-neutral-700 rounded-xl flex-1">
            {props.children}
        </div>
    )
}