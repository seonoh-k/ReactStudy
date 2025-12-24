import React from "react";

// props로 전달 받을 버튼값, 함수 타입 지정
type btnProps = {
    label: string;
    clickHandler: () => void;
    className?: string;
};

export default function Button({ label, clickHandler, className = "" } : btnProps) {
    return (
        <>
            <button onClick={clickHandler} 
            // 버튼 타입에 따라 다른 크기 지정
            className={`border border-black ${className}`}>
                {label}
            </button>
        </>
    )
}