# 하나의 추론 결과(str)에서 파이썬 코드(str) 추출
def get_code(item: str) -> str:
    return item[item.find('<sys>') + 13:item.find('<pad>')].strip()


# 결과들의 이터러블에 대한 파이썬 코드들 추출
def get_codes(item_list: iter) -> map:
    return map(get_code, item_list)
    # 상황이나 필요에 따라 list(map(get_code, item_list)) 등으로 수정


# 하나의 코드에 대해 성공하면 print 값을, 실패하면 해당 에러 메시지 반환
# print 문은 실제로 실행하지 않기 때문에 콘솔 출력이 없음
def get_answer(code: str) -> str:
    try:
        body, answer = code.split('print')
    except ValueError as e:
        return 'print 문이 없습니다.' if str(e).startswith('n') \
            else 'print 문이 여러 개입니다.'
        # if str(e) == 'not enough values to unpack (expected 2, got 1)'
    try:
        exec(body)
        return str(eval(answer[1:-1]))
    except Exception as e:
        return str(e)


# 코드의 이터러블에 대한 get_answer 값들을 반환
def get_answers(codes: iter) -> map:
    return map(get_answer, codes)
    # 상황이나 필요에 따라 list(map(get_answer, codes)) 등으로 수정
