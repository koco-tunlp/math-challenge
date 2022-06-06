# KoELECTRA for Class Labeling
- [KoEPT](http://koreascience.or.kr/article/CFKO202125036187306.pdf)논문을 참고하여 KoELECTRA-Decoder 연결을 위해 사용해봤습니다.
- TFElectraForSequenceClassification 클래스를 사용하여 train.csv 파일의 problem에 대한 class를 예측하도록 학습시켰습니다.
- KoELECTRA_classification_basecode_2 는 데이터 불균형을 해소한 파일을 사용했습니다.

## Tensorflow
  - 불균형 데이터 해결 전 정확도 : 0.90
  - 불균형 데이터 해결 후 정확도 : 0.92

## Pytorch
  - 불균형 데이터 해결 전 정확도 : 0.9113
  - 불균형 데이터 해결 후 정확도 : 0.9326
