from transformers import AutoTokenizer, TFGPT2LMHeadModel, pipeline

class Model:
    def __init__(self):
        checkpoint = 'madatnlp/not_class_trinity-kormath'
        self.tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        self.model = TFGPT2LMHeadModel.from_pretrained(checkpoint)

    def generate(self, problem):
        input_ids = self.tokenizer.encode(problem, return_tensors='tf')
        generated = self.model.generate(input_ids, max_length=256,)
        decoded = self.tokenizer.batch_decode(generated)
        code = self.__gen_formatted_code(decoded)

        return {
            "code": code,
            "answer": self.__get_answer(code),
        }

    def __get_answer(self, code):
        try:
            body, output = code.split('print')
        except ValueError as e:
            return 'print 문이 없습니다.' if str(e).startswith('n') else 'print 문이 여러 개입니다.'
            # if str(e) == 'not enough values to unpack (expected 2, got 1)'
        try:
            exec(body)
            return str(eval(output[1:-1]))
        except Exception as e:
            return str(e)

    def __gen_formatted_code(self, decoded):
        [problem, raw_code] = decoded[0].split('<s>')

        code = raw_code\
            .replace('<unk>', '')\
            .replace('</s>', '')\
            .replace(' ', '')\
            .replace('&', '\n')

        return code

