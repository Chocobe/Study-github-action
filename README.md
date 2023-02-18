# Study Github Actions

* [Github Actions 공식 문서](https://docs.github.com/ko/actions/learn-github-actions)
* [Github Actions Events 목록](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)



<br /><hr /><br />



# YAML 기본 문법

## 주석

`#` 으로 시작하는 라인은 `주석` 이 됩니다.

<br />

```yml
# 주석
# Hello
# World
```



<br /><hr /><br />



## YAML 의 기본 형태

`YAML` 은 `key: value` 형식으로 작성 합니다.

<br />

```yml
stringValue: Hello World
quteStringValue: 'Hello World'
doubleQuoteStringValue: "Hello World"

numberValue: 333

booleanValue: true

objectValue:
  key1: value1
  key2: value2

arrayValue:
  - string value
  - 123
  - name: Chocobe
    job: programmer 
```



<br /><hr /><br />



## Object

객체는 `key: value` 형식으로 작성 합니다.

<br />

```yml
someObj:
  key1: value1
  key2: value2
  key3: value3
```

<br />

중첩된 객체도 동일한 구조로 작성합니다.

<br />

```yml
someObj:
  key:1: value1
  nestedObj:
    key1: value1
    key2: value2
    key3: value3
```



<br /><hr /><br>



## Array

배열은 `key: value` 형식에서 `value` 에 `- ` 로 시작하는 값을 입력하여 작성 합니다.

<br />

```yml
stringArray:
  - item1
  - item2
  -item3

objArray:
  - key1: value1-1
    key2: value1-2
    key3: value1-3
  - key1: value2-1
    key2: value2-2
    key3: value2-3
  - key1: value3-1
    key2: value3-2
    key3: value3-3

# 희소 배열 만들기
someArr:
  - stringValue1
  - stringValue2
  - 1
  - 2
  - 3
  - key1: value1-1
    key2: value1-2
    key3: value1-3
  - key1: value2-1
    key2: value2-2
    key3: value2-3
  - key1: value3-1
    key2: value3-2
    key3: value3-3
```



<br /><hr /><hr />



## Multi Line 문자열

`YAML` 은 다양한 문자열 입력 방법을 제공 합니다.

`Multi Line` 으로 문자열을 입력하고자 할 때는 다음과 같은 기호를 사용 합니다.

* `>`
* `>-`
* `|`
* `|-`

<br />

`>` 와 `|` 의 차이점은 `줄바꿈` 에 대한 치환 방식 입니다.

* `>`: `줄바꿈` 을 `공백문자 1개` 로 치환 합니다.
* `|`: `줄바꿈` 을 `\n` 으로 치환 합니다.

<br />

`>` 와 `|` 는 문자열의 마지막에 개행문자 `\n` 가 포함되게 됩니다.

`>-` 또는 `|-` 를 사용하면, 문자열의 마지막에 개행문자가 없게 됩니다.

<br />

```yml
# "Hello World\n"
stringValue1: >
  Hello
  World

# "Hello\nWorld\n"
stringValue2: |
  Hello
  World

# "Hello World"
stringValue3: >-
  Hello
  World

# "Hello\nWorld"
stringValue4: |-
  Hello
  World
```



<br /><hr /><hr />



## 변수 선언과 참조

`JSON` 에서는 동일한 값에 대하여 중복된 값을 작성해야 하였습니다.

`YAML` 은 `변수` 를 선언하고 참조할 수 있습니다.

* 변수 선언: `&변수명` 형태로 선언
* 변수 참조: `*변수명` 형태로 참조

<br />

변수는 `참조값` 으로 취급하기 때문에 `YAML` 의 `값` 에 해당하는 위치에 선언할 수 있습니다.

* `key: value` 의 `value` 위치에 변수 선언
* `Array` 의 `item` 위치에 변수 선언

<br />

아래 코드는 `key: value` 의 `value` 위치에 변수를 선언한 예시 입니다.

```yml
variable:
  frontend: &frontend
    role: Front-End
    language:
      - javascript
      - typescript
  backend: &backend
    role: Back-End
    language:
      - java
      - python
```

<br />

아래 코드는 `Array` 의 `item` 위치에 변수를 선언한 예시 입니다.

```yml
variables:
  - &frontend
    role: Front-End
    language:
      - javascript
      - typescript
  - &backend
    role: Back-End
    language:
      - java
      - python
```


<br /><br />


이렇게 선언한 변수는 `*변수명` 으로 참조할 수 있습니다.

```yml
variable:
  frontend: &frontend
    role: Front-End
    language:
      - javascript
      - typescript
  backend: &backend
    role: Back-End
    language:
      - java
      - python

programmers:
  - name: Kim
    detail: *frontend
  - name: Chocobe
    detail: *backend
```

<br />

위의 `YAML` 코드를 `JSON` 으로 변환하면 다음과 같은 결과가 됩니다.

```json
{
  "variable": {
    "frontend": {
      "role": "Front-End",
      "language": [
        "javascript",
        "typescript"
      ]
    },
    "backend": {
      "role": "Back-End",
      "language": [
        "java",
        "python"
      ]
    }
  },
  "programmers": [
    {
      "name": "Kim",
      "detail": {
        "role": "Front-End",
        "language": [
          "javascript",
          "typescript"
        ]
      }
    },
    {
      "name": "Chocobe",
      "detail": {
        "role": "Back-End",
        "language": [
          "java",
          "python"
        ]
      }
    }
  ]
}
```



<br /><hr /><br />



## 변수 참조 시, 구조분해 하여 참조하기

변수를 참조할 때, `key: value` 의 `value` 위치에 `*변수명` 으로 참조하였습니다.

아래의 코드는 `detail` Key 의 value` 에 `변수` 를 할당한 코드 입니다.

<br />

```yml
frontend: &frontend
  role: Front-End
  language:
    - javascript
    - typescript

kim:
  name: Kim
  detail: *frontend
```

<br />

`JSON` 으로 변환한 결과는 다음과 같습니다.

```yml
{
  "frontend": {
    "role": "Front-End",
    "language": [
      "javascript",
      "typescript"
    ]
  },

  "kim": {
    "name: "Kim",
    "detail": {
      "role": "Front-End",
      "language": [
        "javascript",
        "typescript"
      ]
    }
  }
}
```

<br />

위 코드에서 `*frontend` 로 참조한 객체는 `detail` 에 할당되어 있습니다.

만약 `detail` key 를 사용하지 않고, `name` key` 와 동일한 계층에 할당하고자 한다면, `구조분해` 문법을 사용합니다.

`key: value` 의 `key` 에 `<<` 입력 시, `value` 에 할당한 변수는 `구조분해` 되어 할당하게 됩니다.

<br />

```yml
frontend: &frontend
  role: Front-End
  language: 
    - javascript
    - typescript

kim:
  name: Kim
  <<: *frontend
```

<br />

위 코드를 `JSON` 으로 변환하면 다음과 같습니다.

```json
{
  "frontend": {
    "role": "Front-End",
    "language": [
      "javascript",
      "typescript"
    ]
  },

  "kim": {
    "name": "Kim",
    "role": "Front-End",
    "language": [
      "javascript",
      "typescript"
    ]
  }
}
```



<br /><hr /><br />



# Github Actions

`Github Actions` 를 사용하면 `CI/CD` 를 구현할 수 있습니다.

`Github Actions` 는 `YAML` 파일로 정의하며, `YAML` 파일 1개가 `Workflow` 1개가 됩니다.



<br /><hr /><br />



## The Components of Github Actions

`Workflow` 는 `Github Actions` 에서 제공하는 `Component` 를 사용하여 작성 합니다.

* `workflows`
* `events`
* `jobs`
* `actions`
* `runner`



<br /><hr /><br />



### workflows

* `YAML` 파일 1개가 `Workflow` 1개가 됩니다.
* `Workflow` 에 정의한 `jobs` 를 실행 시킵니다.
* 발생한 `event` 에 의해 `workflow` 가 실행 됩니다.
* 하나의 `workflow` 는 다른 `workflow` 를 참조할 수 있습니다.
* `YAML` 파일은 Github 저장소에서 아래의 경로에 위치 시킵니다.
    * `<root>/.github/workflows/워크플로우_파일명.yml`



<br /><hr /><br />



### events

`events` 는 Github 저장소의 `동작` 을 나타냅니다.

특정한 `동작` 이 발생하면, 해당 `동작` 이 설정된 `workflow` 를 실행 시킵니다.

`events` 에 대한 예시로 다음과 같습니다.

* `push`: Github 저장소에 `push` 하면 발생하는 `event` 입니다.
* `pull_request`: Github 저장소에 `PR` 을 작성하면 발생하는 `event` 입니다.
* [Github Actions 공식문서의 Events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) 에서 전체 `events` 를 확인할 수 있습니다.



<br /><hr /><br />



## jobs

`job` 은 하나의 작업 입니다.

하나의 작업은 복수의 동작을 실행하여 수행하게 되며, 동작 하나를 `step` 으로 정의 합니다.

즉, `job` 은 `steps` 세트를 말하며, `jobs` 는 `workflow` 에 정의한 `job` 목록 입니다.

<br />

`job` 하나에 속하는 `steps` 는 서로 의존하며, `step` 의 수행 결과를 `다음 step` 으로 전달할 수 있습니다.

<br />

`jobs` 의 기본 동작은 `병렬 실행` 됩니다.

만약 특정 `job` 에 의존하는 `job` 을 만든다면, `순차 실행` 되도록 구현도 가능 합니다.



<br /><hr /><br />



## actions

`actions` 는 `Workflow` 의 동작을 정의하는 곳 입니다.

즉, `actions` 는 `Github Actions` 의 커스텀 애플리케이션 입니다.

<br />

`events` 가 발생하여 `workflow` 가 실행되면, `actions` 에 구현한 동작이 실행 됩니다.



<br /><hr /><br />



## Runner

`workflow` 를 실행시키는 `서버` 입니다.

`Runner` 는 한번에 하나의 `Job` 을 실행시킵니다.



<br /><hr /><br />



## Github Actions 예시 코드

```yml
# workflow 이름 (optional)
name: learn-github-actions

# workflow 실행 이름 (optional)
run-name: ${{ github.actor }} is learning Github Actions

# 이 workflow 가 실행될 events 정의
on:
  - push

# workflow 작업 정의
jobs:
  # key 를 job 이름으로 정의
  # bats 라이브러리의 버전 확인을 위한 job
  check-bats-version:
    # job 을 실행시킬 Runner 설정
    runs-on: ubuntu-latest

    # 현재 job 에서 수행할 step 정의
    steps:
      # job 으로 재사용 가능한 workflow 파일의 `위치` 와 `버전`
      ## 브랜치 checkout
      - uses: actions/checkout@v3
      ## node 설치
      - uses: actions/setup-node@v3
        with:
          ## node 버전을 v16 으로 지정
          node-version: '16'
      # 실행할 터미널 명령어
      ## npm install -g bats 명령어 실행 (bats 라이브러리 설치)
      - run: npm install -g bats
      ## bats -v 명령어 실행 (bats 라이브러리 버전 출력)
      - run: bats -v

  # lint 실행 job
  lint:
    runs-on: ubuntu-latest

    steps:
      ## 브랜치 checkout
      - uses: actions/checkout@v3
      ## node 설치
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      ## package.json 의 의존성 설치
      - run: yarn install
      ## yarn lint 명령어 실행 (lint 실행)
      - run: yarn lint
```
