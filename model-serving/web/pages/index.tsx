import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { EmojiHappyIcon, FireIcon } from '@heroicons/react/solid';
import dracula from 'prism-react-renderer/themes/nightOwl';
import Highlight, { defaultProps } from 'prism-react-renderer';

export const checkDoaminReachable = async (domain: string, miliseconds = 5000) =>{
  try {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(reject, miliseconds, '서버에 연결할 수 없습니다. 시스템 관리자에게 문의하세요.');
    });
    const request = fetch(domain);

    await Promise.race([timeout, request]);

    return true;
  } catch (e) {
    return false;
  }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface SumbitResult {
  code: string;
  answer: string;
}

const Home: NextPage = () => {
  const DEFAULT_PROBLEM = '한 변의 길이가 24cm인 정육각형과 둘레가 같은 정팔각형이 있습니다. 이 정팔각형의 한 변의 길이는 몇 cm인지 구하시오.';

  const [problem, setProblem] = useState<string>(DEFAULT_PROBLEM);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SumbitResult | null>(null);
  const [timer, setTimer] = useState<number>(0);

  const handleChange = (event: any) => {
    setProblem(event.target.value);
  }

  const handleSumit = async () => {
    setLoading(true)
    setResult(null);

    const timerId = setInterval(() => {
      setTimer((v) => v += 1);
    }, 1000)

    try {
      const domain = 'http://ml.wetov.io:8000'

      const isRechable = await checkDoaminReachable(domain + '/health', 3000);
      if (!isRechable) throw new Error('서버에 연결할 수 없습니다. 시스템 관리자에게 문의하세요.');

      const response = await fetch(domain + '/generate', {
        method: 'POST',
        body: JSON.stringify({ problem }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      setResult({ code: result.code, answer: result.answer });
    } catch (e: any) {
      console.error(e);
      alert(e.message)
    } finally {
      setLoading(false); 
      setTimer(0);
      clearInterval(timerId)
    }
  }

  return (
    <>
      <Head>
        <title>Ko-Co &#38; TUNlP</title>
        <meta name="description" content="math solver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col py-16 md:w-1/2 mx-auto px-4'>

        <label htmlFor="comment" className="block mb-2 text-md text-left font-medium text-gray-700">
          수학 문제를 입력하세요.
        </label>

        <div className="min-w-0 flex-1 w-full">
          <form action="#" className="relative">
            <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-md"
                value={problem}
                onChange={handleChange}
              />

              <div className="py-2 bg-white" aria-hidden="true">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500">
                      <FireIcon className="text-white flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className='ml-2 text-gray-500 italic'>문제 풀이를 생성하는 중... {timer}초</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-400"
                    >
                      <EmojiHappyIcon className="text-white flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                )}

              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className={classNames(
                    loading ? 'opacity-75' : '',
                    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  )}
                  onClick={handleSumit}
                  disabled={loading}
                >
                  {loading &&
                      <svg role="status" className="w-5 h-5 mr-3 text-indigo-500 animate-spin fill-indigo-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                  }
                  제출하기
                </button>
              </div>
            </div>
          </form>
        </div>

        {result && 
          <>
            <p className='mt-6'>풀이 코드</p>
            <code className="w-full h-44 mt-2 bg-[#061626] border border-gray-300 rounded-lg shadow-md p-4">
              <Highlight {...defaultProps} theme={dracula} code={result.code} language="python">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </code>

            <p className='mt-6'>정답</p>
            <div className="w-full h-14 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-4">
              {result.answer}
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Home;
