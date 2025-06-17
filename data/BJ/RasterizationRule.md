Rasterization Rule;

0. 래퍼런스 주소  
0-1 https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d10-graphics-programming-guide-rasterizer-stage-rules

1. 설명: 
1-1Triangle Rasterization Rules (Without Multisampling)

Rasterization rules define how vector data is mapped into raster data.
The raster data is snapped to integer locations that are then culled and clipped (to draw the minimum number of pixels), and per-pixel attributes are interpolated (from per-vertex attributes) before being passed to a pixel shader.

즉 Vector 데이터를 2D 상 픽셀(모니터에 출력될) 형식의 매핑하는 데 사용되는 방식임.
“3D 기하 정보(벡터 기반 데이터)를 2D 이미지 공간(픽셀)으로 정확하게 변환해주는 과정이며, 이때 픽셀 위치 결정과 속성 보간에 정해진 규칙들이 적용된다.”

우리가 사용하는 directx 11같은 경우에는 top-left rule를 사용함 
삼각형의 edge가 겹칠 때, 겹치는 픽셀을 처리해주지 않으면 두번 계산되기 때문에 이에 대한 처리를 해주는 것


An edge is considered a top edge if it is horizontal and the y coordinate of the edge is the smaller y of the two endpoints.
An edge is considered a left edge if it is non-horizontal, and the endpoint with the smaller y is above the other.


Top Edge	수평선이며, y가 더 작은 쪽을 시작점으로 함 -> 삼각형의 꼭짓점들 중에서 가장 위에 있는 꼭짓점과 연결된 수평선이면 Top Edge
Top Edge	수직 또는 경사선이며, y가 더 작은 쪽을 시작점으로 함 ->“ y가 작은 쪽에서 큰 쪽으로 가는 edge를 기준으로,변이 왼쪽 경계선일 때”


A(100, 50)   ← 위쪽 꼭짓점
B(200, 50)   ← 수평선 형성
C(150, 150)  ← 아래쪽 꼭짓점


1-2 Line Rasterization Rules (Aliased, Without Multisampling)

D3에서 사용하는 픽셀 랜더 판별법. / Line rasterization rules use a diamond test area to determine if a line covers a pixel.

Diamond Test란?
각 픽셀의 중심을 기준으로, 다이아몬드(마름모) 형태의 테스트 영역을 가정합니다.

이 다이아몬드는 픽셀 중심을 기준으로 하는 사선 방향의 마름모

선분이 이 다이아몬드 내부를 들어왔다가 나갈 때, 해당 픽셀을 칠함

하지만 이 다이아몬드의 경계 포함 여부는 조건에 따라 다름: X-MAJOR OR X-MAJOR (어떤 축을 기준으로 한 기울기인지에 따라서 다름) 

✅ X-Major일 때:                                 //Y-MAJOR는 여기서 다이아몬드 오른쪽 꼭짓점까지 포함됨. (Right corner)
다이아몬드 꼭짓점/변	포함 여부
왼쪽(L)	❌ 제외
오른쪽(R)	❌ 제외
아래쪽(B)	✅ 포함
왼쪽 아래(LB)	✅ 포함
오른쪽 아래(RB)	✅ 포함
위쪽(T)	❌ 제외
왼쪽 위(LT)	❌ 제외
오른쪽 위(RT)	❌ 제외

추가:
렌더 끝점에 대해서는 Diamond test 판정 처리를 해주지 않음. 
선이 해당 영역을 "빠져나가는 순간" 픽셀을 그림. 
