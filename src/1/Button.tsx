// TypeScript의 타입 지정
type ButtonProps = {
    btnName: string;
    clickHandler: () => void;
};

// props 인자 받기
export default function Button({ btnName, clickHandler }: ButtonProps) {
    return (
        <button onClick={clickHandler}>{btnName}</button>
    )
}