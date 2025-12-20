import React from "react";
import { useState } from "react";
import Button from "./button";

type Operator = "+" | "-" | "*" | "/";

export default function Calculator() {
    // 클릭한 숫자 출력
    const [ input, setInput ] = useState<string>('');
    // 연산자 클릭 시 기존에 입력한 숫자를 저장
    const [ num, setNum ] = useState<number>(0);
    // 연산자 클릭 시 해당 연산자 저장
    const [ operator, setOperator ] = useState<Operator | ''>('');

    function inputNumber(value: string) {
        if(input === '0') {
            if(value === '.') {
                setInput(prev => prev + value);
            }else {
                setInput(value);
            }
        }else if(value === '.'){
            setInput('0' + value);
        }else {
            setInput(prev => prev + value);
        }
    }

    // 상태 operator에 Operaotr 타입을 지정했기 때문에 Operator 타입으로 지정 
    function inputOperator(value: Operator) {
        // 기존에 입력된 연산자가 없다면 첫 계산
        if(operator === '') {
            setNum(Number(input));
            setOperator(value);
            setInput('');
        }else {
            // 이미 입력된 연산자가 있다면 우선 계산을 수행
            const result = calculate(num, Number(input), operator);
            // 계산 결과를 저장
            setNum(result);
            // 새로 입력한 연산자를 저장
            setOperator(value);
            // 출력부 초기화
            setInput('');
        }
    }

    function displayResult() {
        // 계산할 조건이 안되면 리턴
        if(operator === '' || input === '') return;
        
        const result = calculate(num, Number(input), operator);
        
        // 결과 출력 후 초기화
        setInput(String(result));
        setNum(0);
        setOperator('');
    }

    function clear() {
        setInput('');
        setOperator('');
        setNum(0);
    }

    // :number = 반환하는 타입을 지정하는 TS의 특징
    // calculate()에서는 계산만 실행. 상태변화 x -> 함수의 책임 최소화
    function calculate(a: number, b:number, operator: Operator) :number {
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
        }
    }

    return (
        <>
            <div className="w-[200px] border border-black text-xl p-2 m-10">
                {/* display */}
                <input 
                    readOnly
                    value={input}
                    className="w-full col-span-4 border border-black text-right px-2 mb-2"
                ></input>
                
                {/* buttons */}
                <div className="grid grid-cols-4 gap-2">
                    <Button label = 'C' clickHandler = {clear} className="col-span-3" />
                    <Button label = '/' clickHandler = {() => inputOperator('/')} />

                    <Button label = '1' clickHandler = {() => inputNumber('1')} />
                    <Button label = '2' clickHandler = {() => inputNumber('2')} />
                    <Button label = '3' clickHandler = {() => inputNumber('3')} />
                    <Button label = '*' clickHandler = {() => inputOperator('*')} />

                    <Button label = '4' clickHandler = {() => inputNumber('4')} />
                    <Button label = '5' clickHandler = {() => inputNumber('5')} />
                    <Button label = '6' clickHandler = {() => inputNumber('6')} />
                    <Button label = '+' clickHandler = {() => inputOperator('+')} />

                    <Button label = '7' clickHandler = {() => inputNumber('7')} />
                    <Button label = '8' clickHandler = {() => inputNumber('8')} />
                    <Button label = '9' clickHandler = {() => inputNumber('9')} />
                    <Button label = '-' clickHandler = {() => inputOperator('-')} />

                    <Button label = '.' clickHandler = {() => inputNumber('.')} />
                    <Button label = '0' clickHandler = {() => inputNumber('0')} />
                    <Button label = '=' clickHandler = {displayResult} className="col-span-2" />
                </div>
            </div>
        </>
    )
}