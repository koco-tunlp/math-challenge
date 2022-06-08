from pandas import read_csv

try:
    from rich.console import Console
    from rich.syntax import Syntax
except ImportError:
    print("'rich' 패키지가 설치되지 않았습니다.")
    print('패키지를 사용하면 콘솔 출력에 파이썬 구문 강조 표시를 적용할 수 있습니다.')
    print('설치 후엔 별도의 소스코드 수정 없이 자동으로 적용됩니다.')

    def print_code(code):
        print('\n' + code + '\n')
else:
    print("'rich' 패키지가 설치되어 있습니다.")
    print('파이썬 구문 강조 표시를 적용합니다.')
    console = Console()

    def print_code(code):
        print()
        console.print(Syntax(code, 'python', theme='ansi_light'))
        print()


classes = ['',
           '산술 연산',
           '순서 정하기',
           '경우의 수 조합',
           '찾기-1: 조건 만족',
           '찾기-2: 방정식의 해',
           '찾기-3: 잘못된 연산',
           '크기 비교',
           '도형']

train = read_csv('../data/train.csv')                                           # train.csv 파일 경로
index = -1
print("'Enter' 입력시 다음 문제 출력, 음수 입력시 프로그램 종료")

while True:
    try:
        index = int(input('\n\n문제 번호: '))
    except ValueError:
        index += 1

    try:
        data = train.loc[index]
    except KeyError:
        break
    else:
        class_idx, problem, code, answer = data

    print(f'{index}번({index+2}행) 문제: {class_idx}번 유형 ({classes[class_idx]})')
    print(problem)
    print_code(code)
    print('실행 결과: ', end='')
    exec(code)
    print('파일 답안:', answer)
