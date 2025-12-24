import Button from './Button.tsx';

export default function ButtonApp() {

  // Button 컴포넌트에 전달할 props 객체 생성
  const btnProps = {
    btnName: "Click",
    clickHandler: () => alert('clicked'),
  };
  
  return (
    <>
      {/* 전개 연산자를 통해 props 객체 전달 */}
      <Button {...btnProps} />
    </>
  )
}
