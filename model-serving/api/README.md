# Model Serving - API

## Standalone

```bash
$pip3 install -r requirements/requirements.txt
$uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Docker

```bash
$docker-compose up --build
```

`docker-compose` 설치는 [가이드](https://docs.docker.com/compose/install)를 참고하세요.
