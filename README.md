# StayLink

StayLink는 여행자와 호스트를 연결하는 숙소 예약 및 공유 플랫폼입니다.  
다양한 숙소를 검색, 등록, 예약, 결제할 수 있으며, 지도 기반 탐색과 후기, 찜, 커뮤니티 기능도 제공합니다.

---

## 🏠 주요 기능

- **숙소 검색 및 필터**: 다양한 카테고리와 조건으로 숙소를 검색할 수 있습니다.
- **숙소 상세 정보**: 숙소 설명, 편의시설, 위치(카카오맵), 호스트 정보 제공
- **숙소 등록**: 호스트가 직접 숙소를 등록하고 관리
- **예약 및 결제**: Toss Payments를 통한 안전한 결제, 쿠폰 적용, 환불 안내
- **회원 관리**: 소셜 로그인(구글, 네이버, 카카오), 마이페이지(내 정보, 내 숙소, 찜, 예약, 후기 등)
- **지도 기반 검색**: 카카오맵을 활용한 위치 기반 숙소 탐색
- **FAQ/고객지원**: 자주 묻는 질문(FAQ) 페이지 제공

---

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 13, React 18, TypeScript, Tailwind CSS, React Query, Jotai
- **백엔드/DB**: Next.js API Route, Prisma ORM, PostgreSQL (또는 지원되는 DB)
- **인증**: next-auth, 소셜 로그인(Google, Naver, Kakao)
- **결제**: Toss Payments SDK
- **이미지**: next-cloudinary, Cloudinary
- **지도**: Kakao Map API

---

## 📦 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   ```

2. **환경 변수 설정**

   - `.env` 파일을 생성하고 필요한 API 키, DB 연결 정보, 소셜 로그인 키 등을 입력하세요.

3. **DB 마이그레이션 및 시드**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. **접속**
   - [http://localhost:3000](http://localhost:3000) 에서 서비스 확인

---

## 📁 폴더 구조

- `app/` : 페이지, API, 레이아웃, 글로벌 스타일 등
- `components/` : UI 컴포넌트
- `prisma/` : DB 스키마 및 시드
- `constants/` : 상수 데이터
- `hooks/` : 커스텀 훅
- `utils/` : 유틸리티 함수
- `atom/` : Jotai 상태 관리
- `interface/` : 타입 및 인터페이스 정의

---

## 🤝 기여 방법

1. 이슈 등록 및 포크
2. 새로운 브랜치 생성
3. 기능 추가/수정 후 PR 요청

---

## 📝 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.

---

## 📧 문의

- 이메일: ehddnr8563@gmail.com
