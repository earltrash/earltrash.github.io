# Compile ( 편집하다, 엮다 )

- cpp 컴파일은 4가지 빌드 과정을 통해 소스코드를 .exe 파일로 변환하는 과정이다.
1. 전처리 Preprocessing
2. 컴파일 Compile
3. 어셈플 Assemble
4. 링킹     Linking

---

# 1. Preprocessing

- 전처리 구문은 ‘#’ 으로 시작한다
ex) #include, #define, #ifdef, #elif …
- 전처리 단계에서 전처리 구문은 컴파일러가 이해할 수 있는 ‘코드’ 로 변환이 된다
- 파일확장명은 ‘.i’ , ‘.ii’

---

# 2. Compile

- 전처리가 완료된 소스코드 ( ‘.i’ , ’.ii’ ) 파일을 어셈블리어( ’.s’ , ‘.asm’)로 변환하는 과정이다
1. **어휘 분석 (Lexical Analysis)**
    - 문자열들을 토큰으로 분해한다. ex) int main() ⇒ ‘int’ , ’main’ , ’(’ , ’)’
2. **구문 분석 (Syntax Analysis)**
    - 토큰화된 구문들이 문법에 맞는지 확인하고
    - 컴파일러가 의미를 분석하기 쉽도록 AST 를 생성하여 코드를 계층적으로 표현함
        - AST(Abstract Syntax Tree): 구문을 트리구조로 분리해 우선순위를 해석하는데 유용함.
        - 연산자를 root, 피연산자를 leaf 형태로 저장함으로서 구분하더라
3. **의미 분석 (Semantic Analysis)**
    - 작성한 코드에 문법적 문제가 없는지 파악하는 단계
4. **중간 코드 생성 (Intermediate Code Generation)**
    - IR (Intermediate Representation): 모든 플랫폼에서 사용할 수 있는 중간단계 코드를 생성한대용
5. **최적화 (Optimization)**
    
    ```cpp
    int x = 3 + 4;
    최적화 ->
    int x = 7;
    
    int a = b + c;
    int d = b + c;
    최적화 ->
    int a = b + c;
    int d = a;
    ```
    
    - 외에도 데드 코드(영향 없는 코드) 를 지우거나
    - CPU 특성에 맞게 레지스터 할당, 명령어 순서 변경 최적화를 한다.
        - 레지스터 할당( so deeeeep )
6. **어셈블리 코드 생성 (Code Generation)**
    - 이때…!! 논리 메모리 구조중 어디에 할당 될 지 결정된다..!!

---

# 3. Assemble

- ‘.s’ , ‘ .asm’ 코드를 ‘ .o’, ‘.obj’ 파일로 변환
- 명령어 move, add, jmp , 라벨, 지시어 등을 바이너리 코드로 변환하는 과정
- 컴파일 단계의 code generation 단계에서 지시어( 해당 코드가 어느 영역에 존재할지 알려주는 코드 )
를 분석해 목적 파일( .o )을 만든다 ( 더 있긴 한데 D2D 하러 가야한다구)

---

# 4. Linking

- ‘ .o’,’ .obj’, 라이브러리 등등을 .exe 파일로 변환함
- 링커의 종류는 ld, gcc, clang…
- 어셈블 단계에서 전해준 코드들을 열심히 이어주기 링커는 이게 다임…!

---

! cpp는 OS 마다 요구하는 컴파일러가 다르다.

! 생략된 내용이 많지만 양해 해주센…D2D 해야되거든