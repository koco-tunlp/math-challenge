# Tutorials For KMWP(Korean Math Words Problem)  
안녕하세요 저희는 아이펠에서 KMWP 학습에 도전했던 팀입니다.  
이 저장소는 다음 KMWP 문제에 도전할 팀을 위한 가이드를 목적으로 만들었습니다  
데이터에 대한 전처리부터, 학습에 사용할 레퍼런스 조사, 대형 모델을 사용하기 위해 Google Cloud Platform  설정 등, 자연어 처리 내용 외에도 우리가 알고 사용해야할 기본적인 내용들이 너무 많기에 다음 팀의 시간은 아끼고, 여기서 한발짝 더 나아갈 수 있도록 기록을 남기려고 합니다.  
여기에 있는 내용들을 모르더라도 다양한 방법으로 시도할 수 있습니다.  
그러나 이 도구들을 활용하게 된다면 더 다양한 방법을 시도해볼 수 있을겁니다.  
저희가 안내할 내용은 다음과 같습니다.  

## 목차  

(본인의 폴더에 맞게 링크 달아주시면 됩니다)

데이터 EDA -> 깃헙링크  
데이터 정제내용 -> 깃헙링크  
모델링 Base Code :  
1. [tensorflow, SKT-kogpt-trinity 모델](https://github.com/koco-tunlp/math-challenge/tree/main/skt-kogpt-trinity-basecode)  
2. [tensorflow, Roberta-Large For Class labeling](https://github.com/koco-tunlp/math-challenge/tree/main/roberta-large-for-classlabeling)
3. Pytorch 모델   깃헙링크, 깃헙링크  
모델 예측 결과 및 후처리 -> 깃헙링크  
GCP 개발환경 구성 및 모델 서빙 -> 깃헙링크  


## Reference  
[CodeT5: Identifier-aware Unified Pre-trained Encoder-Decoder Models for Code Understanding and Generation](https://arxiv.org/pdf/2109.00859.pdf)  
  
[CodeBERT: A Pre-Trained Model for Programming and Natural Languages](https://arxiv.org/pdf/2002.08155.pdf)  

[KoEPT: Transformer 기반 생성 모델을 사용한 한국어 수학 문장제 문제 자동 풀이](http://koreascience.or.kr/article/CFKO202125036187306.pdf)  
  
[Training Verifiers to Solve Math Word Problems](https://arxiv.org/pdf/2110.14168.pdf)  
  
[Semantically-Aligned Equation Generation for Solving and Reasoning Math Word Problems](https://aclanthology.org/N19-1272.pdf)  
  
[Measuring Mathematical Problem Solving With the MATH Dataset](https://arxiv.org/pdf/2103.03874.pdf)

## Message from Authors  
![pic1](https://user-images.githubusercontent.com/53106649/171995972-81c4962e-08b2-4290-95ea-62fbf9c15c36.png){: width="60" height="60"}  

_Gu_ : 여러 레퍼런스 조사와, 모델링을 거치면서 데이터의 중요성을 다시 한번 깨닫는 시간이었습니다. 그래도 여러 모델링과 레퍼런스 조사를 통해 지식의 풀을 좀 더 넓힐 수 있었습니다.  
**CodeT5**의 **Pretrain** 방법은 흥미롭습니다. 기존의 T5 Pretrain 방식에 Identifier를 더한 것, 그리고 NLM - PLM 양쪽으로 총 4가지의 pretrain 방법을 사용했는데 따라해보지 못해 아쉽습니다.  
데이터 수는 적기 때문에 identifier tagging만 끝낸다면 해볼만 하리라 생각합니다.  
**CodeBERT** 사용하진 못했지만 코드 관련 레퍼런스로 첨부했습니다.  
**KoEPT** 외국의 레퍼런스들이 논문과 함께 코드를 제공하기 때문에 사용하기 편리한데 반해, 논문이 읽기는 편리했으나 코드 예제가 없어 구현할 수 없어 아쉬웠습니다.  
**Training Verifier** 우리 이전의 팀도 시도했던 것으로 봤는데, 논문의 내용에 데이터가 작을 때는 큰 의미를 볼 수 없다고 나와있습니다. 따라서 의미있는 양의 데이터 증강 후 시도해야 할 내용으로 보입니다.  
**Semantically-Aligned Equation Generation** 사용하지 못했지만 관련 문헌으로 남깁니다.  
**Measuring Mathematical Problem Solving** GPT를 활용해 수학문제를 푸는 논문 입니다. 이 논문을 기점으로 GPT 사용을 시작했습니다.