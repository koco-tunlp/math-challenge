# Model Serving - API

API 서버는 [FastAPI](https://fastapi.tiangolo.com/) 프레임워크를 기반으로 작성되었습니다. FastAPI는 몇 줄의 코드로도 쉽게 모델 서빙 API를 구현할 수 있었습니다. 또한 도커를 사용하여 여러 환경에서 쉽게 앱을 실행할 수 있도록 구성했습니다.

## 프로젝트 구조

```
/app
  /--- main.py <- 엔트리 포인트, API 정의 코드
  /--- model.py <- 모델 추론 코드
/requirements
  /--- requirements.txt <- 의존 패키지 명시
Dockerfile <- 도커 빌드
docker-compose.yml <- 도커 앱 실행
```

## 실행 방법
### Standalone 

```bash
$pip3 install -r requirements/requirements.txt
$uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Docker

```bash
$docker-compose up --build
```

`docker-compose` 설치 및 사용 방법은 [가이드](https://docs.docker.com/compose/install)를 참고하세요.
