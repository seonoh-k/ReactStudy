import { useRef, useState, useEffect } from 'react';

// 메세지 타입 지정
type Message = '이메일을 입력하세요' | '비밀번호를 입력하세요' | '약관에 동의해주세요' | '';

export default function Login() {
  // 이메일 입력값을 저장할 상태
  const [email, setEmail] = useState('');
  // 이메일 입력 요소를 가리킬 ref 객체
  const emailRef = useRef<HTMLInputElement>(null);

  // 비밀번호 입력값을 저장할 상태
  const [password, setPassword] = useState('');
  // 비밀번호 입력 요소를 가리킬 ref 객체
  const passwordRef = useRef<HTMLInputElement>(null);

  // 약관 동의 여부를 저장할 상태
  const [isChecked, setIsChecked] = useState(false);

  // 로그인 버튼 활성화 여부
  const [ enableSubmit, setEnableSubmit ] = useState<boolean>(false);

  // email, password, isChecked가 조건을 만족할 때만 로그인 버튼 활성화
  useEffect(() => {
    if(email !== '' && password !== '' && isChecked === true) {
      setEnableSubmit(true);
    }else {
      setEnableSubmit(false);
    }
    // return (() => {
    //   setEnableSubmit(false);
    // }) -> 불필요한 재실행 유발 가능성 높음
  }, [email, password, isChecked])

  // 컴포넌트 마운트 시 이메일 입력창 포커스
  // useEffect(() => {
  //   if(email === '') {
  //     emailRef.current?.focus();
  //   }
  // }, [email])

  useEffect(() => {
    emailRef.current?.focus();
  }, []) // 빈 배열이라도 의존성 배열을 넣지 않으면 매 렌더링마다 실행됨

  // 메세지 상태 관리
  const [ message, setMessage ] = useState<Message>('');

  useEffect(() => {
    if(email === '') {
      setMessage('이메일을 입력하세요');
    }else if(email !== '' && password === '') {
      setMessage('비밀번호를 입력하세요');
    }else if(email !== '' && password !== '' && isChecked == false) {
      setMessage('약관에 동의해주세요');
    }else {
      setMessage('');
    }
  }, [email, password, isChecked]) // 의존성 배열에서 message 제거 -> 불필요한 재실행 방지

  // 폼 제출 이벤트 처리 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요.');
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current?.focus();
      return;
    }
    if (!isChecked) {
      alert('약관에 동의해주세요.');
      return;
    }
    alert('로그인을 성공했습니다.');
  };
  return (
    <>
      <div className='item-middle m-10'>
        <div className='w-[375px]  rounded-lg bg-white border border-[#D1D1D1] py-10 px-[25px] text-[#4f4f4f]'>
          <h1 className='text-xl font-bold mb-[10px]'>Login Into App</h1>
          <p className='text-sm mb-5'>Please enter your details to continue.</p>
          <form className='grid gap-4' onSubmit={handleSubmit}>
            <input
              ref={emailRef}
              type='email'
              className='input-style1'
              placeholder='someone@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              ref={passwordRef}
              type='password'
              className='input-style1'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='chk'
                className="w-5 h-5 appearance-none border border-[#4f4f4f] bg-white checked:bg-[#4f4f4f] rounded-[5px] checked:bg-[url('./check-icon.svg')] checked:bg-no-repeat checked:bg-center"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor='chk'>
                <span className='text-sm color-[#4f4f4f]'>
                  I agree with <em className='not-italic font-bold'>terms</em>{' '}
                  and <em className='not-italic font-bold'>policies</em>.
                </span>
              </label>
            </div>
            <div className='mt-4 grid gap-4'>
              { message && <span className='text-sm text-red-700 text-center'>{message}</span> }
              <button
                type='submit'
                className='h-[44px] text-sm w-full bg-[#4F4F4F] text-[#F5F5F5] rounded-lg disabled:bg-[#BDBDBD] disabled:cursor-not-allowed'
                disabled={!enableSubmit}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
