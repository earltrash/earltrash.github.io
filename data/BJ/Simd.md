0.래퍼런스 주소
0-0 : DIRECTXMATH.H (SSE제공하는 simd 수학 라이브러리)
 https://learn.microsoft.com/en-us/windows/win32/dxmath/pg-xnamath-migration-d3dx
0-1 : intel intrinsuics guide (여긴 심연같긴해) 
https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html#ig_expand=0,1

SIMD(Single Instruction Multiple Data)는 CPU나 GPU 같은 하드웨어에서 병렬 처리 성능을 높이기 위한 기술로, 하나의 명령어(Instruction)로 여러 데이터를 동시에 처리하는 구조.

SISD (Single Instruction Single Data) → 일반적인 순차 연산 (예: a = b + c)
SIMD (Single Instruction Multiple Data) → 한 명령으로 여러 데이터를 동시에 처리

// 일반 방식 (SISD)
for (int i = 0; i < 4; ++i)
    C[i] = A[i] + B[i];

// SIMD 방식 
C = A + B;  // A, B, C는 각각 4개의 float 값 (벡터 연산)


성능 향상: 예를 들어 4개의 float 값을 한 번에 처리하면 루프가 4배 빨라질 수 있음
벡터/행렬 계산, 이미지 처리, 신호 처리, 물리 시뮬레이션 등에서 매우 유용

SIMD의 관점은 무슨 계산 < 어떻게 계산하냐 를 봐야 함. 


 (SISD)
for (int i = 0; i < 4; ++i) {
    for (int j = 0; j < 4; ++j) {
        for (int k = 0; k < 4; ++k) {
            C[i][j] += A[i][k] * B[k][j]; // 총 64회 연산
        }
    }
}

(SIMD)
for (int i = 0; i < 4; ++i) {
    __m128 row = A[i]; // SSE 레지스터에 행 로딩

    // 열 전체도 SSE로 로딩해서 dot product 4회만으로 한 행 완성
    C[i] = {
        dot(row, col0),
        dot(row, col1),
        dot(row, col2),
        dot(row, col3)
    };
}

 SIMD는 어떻게 "병렬로" 연산을 구현하는가?
1. 하드웨어 레지스터 확장

SIMD 명령은 CPU 내부의 128비트, 256비트, 512비트 같은 벡터 레지스터를 사용. 
__m128 → 128비트 → 32비트 float 4개 저장 가능 (큰 레지스터에 계산 마구잡이 넣기)

2. 하나의 명령으로 여러 연산 처리
__m128 a = _mm_set_ps(1, 2, 3, 4); //이런식으로 FLOAT 4개의 연산(행렬)을 한 Q에 해결 