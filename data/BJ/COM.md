COM (Component Object Model)

0. 래퍼런스 주소
0-0 (COM 객체 관련 문서): https://mobile.rodolphe-vaillant.fr/entry/122/com-and-directx
0-1 (ComPtr - Microsoft Learn): https://learn.microsoft.com/ko-kr/cpp/cppcx/wrl/comptr-class?view=msvc-170
0-2 (DirectX와 COM 구조): https://learn.microsoft.com/en-us/windows/win32/prog-dx-with-com

1. 개념

1-0. COM


class IUnknown {
public:
    virtual HRESULT QueryInterface(REFIID riid, void** ppvObject) = 0;
    virtual ULONG AddRef() = 0;
    virtual ULONG Release() = 0;
};

COM 객체는 IUnknown 인터페이스를 상속한다.
QueryInterface의 매개변수 REFIID(Reference Interface ID)는 말 그대로 인터페이스의 ID, 즉 식별자를 의미하며,
이 식별자 정보를 바탕으로 해당 인터페이스에 대한 참조가 가능한지를 확인할 수 있다.
(D2D 예제의 AS 함수도 이와 같은 원리다.)

즉, 인터페이스 + 인터페이스 ID 식별 기능을 통해 COM 객체의 구조를 이해하는 것이 핵심이다.

1-1. GUID & UUID

UUID(Universally Unique Identifier), 또는 GUID(Globally Unique Identifier)는 COM에서 인터페이스나 클래스의 유일성을 식별하기 위한 값이다.
앞서 언급한 REFIID는 사실상 이 GUID를 참조하는 개념이다.

Visual Studio에서는 __uuidof(ISomeCOMInterfaceType)를 통해 해당 인터페이스의 GUID를 가져올 수 있다.

※ 주의: "Interface ID(IID)"와 "Class ID(CLSID)"는 다르다.
IID는 특정 인터페이스를 식별하고, CLSID는 객체의 클래스(=구현체)를 식별한다.
즉, REFCLSID rclsid는 클래스 ID이고, REFIID riid는 인터페이스 ID이다.
서로 혼동하지 않도록 해야 한다.

1-2. ComPtr

ComPtr은 COM 객체를 관리하는 데 도움을 주는 스마트 포인터이다.
객체의 수명과 자원 관리를 자동화하는 RAII 패턴을 따르며,
참조 카운트를 자동으로 관리하여 객체 수명이 끝나면 자동으로 해제된다.

1-3. ABI

ABI(Application Binary Interface)는 어셈블리 수준에서의 규약이다.
함수 호출 방식, 인자 전달, 메모리 정렬, 반환 방식 등을 컴파일러나 시스템이 동일하게 이해할 수 있도록 정의하는 규칙이다.

COM은 이 ABI 규약을 따르기 때문에 컴파일러나 언어가 다르더라도 상호 운용 가능하다.
(이 개념은 좀 더 어셈블리 지식이 필요하므로 이후 더 학습 예정.)

2. 정리

2-0. 1-0에서 설명했듯이, COM 객체는 반드시 IUnknown 인터페이스를 기반으로 만들어야 하며,
QueryInterface 또는 AS 함수를 통해 인터페이스 ID를 대조하여 참조 가능 여부를 확인한다.

이 구조 덕분에 COM은 다양한 시스템 간 호환과 기능 추상이 가능하다.

2-1. DirectX가 COM 구조를 채택함으로써 얻는 이점

Language Agnostic (언어 불가지론 / 언어 독립)
객체 생성과 인터페이스 요청을 구분하여,
정형화된 인터페이스 안에서 다양한 언어(C++, C#, VB 등)로 동일하게 접근할 수 있다.
즉, 특정 언어에 종속되지 않는 구조를 통해 "언어 불가지론성(Language Agnosticism)"을 실현한다.
(단어 선택 상 "독립성"이 실제 의미에 더 가까움.)

Binary Compatibility (이진 호환성)
COM은 소스코드가 아니라 바이너리 수준의 명세로 설계되었다.
인터페이스 구조(vtable), 호출 규약(stdcall), 식별자(GUID) 등이 이진 형식으로 정해져 있기 때문에,
컴파일러나 언어가 달라도 COM 객체를 동일하게 사용할 수 있다.

Binary Encapsulation (이진 캡슐화)
COM 객체는 직접 접근하지 않고 인터페이스를 통해 접근한다.
따라서 내부 구현을 바꾸더라도, 외부(클라이언트)는 그 인터페이스만 알고 있으면 계속 사용할 수 있다.
→ 서버 측에서 구현을 바꿔도, 클라이언트는 재컴파일 없이 동작 유지 가능.

Interface-based Abstraction (인터페이스 기반 추상화)
COM은 외부에 인터페이스만 공개하고, 구현은 숨긴다.
이로써 OS나 하드웨어에 종속되지 않고 동일한 API로 객체에 접근할 수 있다.

즉, COM은 인터페이스 기반 추상화(interface-based abstraction)와
이진 표준화(binary standardization)를 통해
하드웨어에 종속되지 않는 정형화된 서비스 구조를 가능하게 한다.
이는 플랫폼 간 호환성과 **컴포넌트 수준 다형성(component-level polymorphism)**을 촉진시킨다.
