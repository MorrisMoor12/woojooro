# 수도권 자영업 데이터 쇼츠 (Remotion 9:16)

수도권(서울·경기·인천) 자영업자 데이터를 100% 코드 기반 모션 그래픽으로 시각화한
세로형 쇼츠입니다. 이미지 없이 Remotion 컴포넌트만으로 렌더링합니다.

- **해상도:** 1080 × 1920 (9:16)
- **길이:** 65초 (1,950 프레임 @ 30fps)
- **디자인 시스템:** Claude Design System (`design.md` / `CLAUDE.md`)

## 실행

```bash
npm install
npm run dev            # Remotion Studio (미리보기 · 편집)
npm run render         # out/shorts.mp4 로 렌더
npm run still          # out/frame.png (200프레임 스틸)
npm run measure-audio  # public/audio/ 나레이션 길이 측정 → 씬 길이 자동 조정
npm run typecheck      # 타입 검사
```

## 나레이션 오디오 (씬별 드롭인)

씬별 TTS 파일을 `public/audio/` 에 넣으면 각 씬에 자동으로 붙고, 씬 길이가
발화 길이에 맞춰집니다. 파일이 없으면 무음으로 렌더됩니다.

1. `public/audio/tts01.wav … tts07.wav` 배치 (매핑은 `public/audio/README.md`)
2. `npm run measure-audio` — 각 클립 길이를 재서 `src/audio/manifest.json` 생성,
   씬 길이 = `ceil(발화초 × 30) + 12프레임`(끝 여백)
3. `npm run dev` 로 싱크 확인 → `npm run render`

- 오디오 배선: `src/Video.tsx` 가 각 `<Series.Sequence>` 에 `<Audio>` 를 붙임
- 타이밍 소스: `src/audio/scenes.json`(순서·파일명·fallback) + `manifest.json`(측정값)
- 파일명을 바꾸려면 `scenes.json` 의 `file` 값만 수정

## 디자인 시스템 적용

| 규칙 | 반영 |
|------|------|
| 웜톤 오프블랙/크림 | 캔버스 `#141413`, 텍스트 `#faf9f5` (순수 검정/흰색 금지) |
| Clay는 Claude 전용 | 오렌지는 아웃트로 **스파크 마크**에만 (`Spark.tsx`) |
| Serif = Claude's voice | 나레이션 자막 = Lora, UI·숫자 = Poppins |
| 굵기 400/500만 | 전 컴포넌트 400·500 사용, 600·700 없음 |
| 토큰만 사용 | 모든 hex는 `theme.ts` 한 곳, 컴포넌트는 토큰만 참조 |
| 역할→색 | 위험=danger(red), 기준=text-secondary, 해법=success(green) |
| 절제(restraint) | 씬당 강조색 1개, 과한 셰이크·플래시 제거 |

## 구조

```
src/
├─ index.ts / Root.tsx     # Composition 등록 (9:16, 30fps)
├─ Video.tsx               # Series 7씬 타임라인 + 씬별 <Audio>
├─ theme.ts                # 디자인 토큰 (모든 hex의 단일 출처)
├─ fonts.ts                # Poppins / Lora 로드
├─ audio/                  # 나레이션 배선 (scenes.json · manifest.json · narration.ts)
├─ data/metrics.ts         # 숫자 · 출처 (시각화와 분리)
├─ util/format.ts          # 원화(억/만) · % 포맷터
├─ layout/SafeArea.tsx     # 상단 자막 / 중앙 시각화 / 하단 출처 3분할
└─ components/
    ├─ CountUp · SubtitleBar · SourceBadge · Spark
    └─ scenes/  Hook · CountUp · MetroMap · BarRace · Gauge · ClosureGrid · Keyword
```

## 씬 ↔ 나레이션 타임코드

| 씬 | 시작(f) | 길이(f) | 내용 |
|----|--------|--------|------|
| Hook | 0 | 120 | "서울 사장님 빚, 얼마게요?" |
| CountUp | 120 | 210 | 4억 8,017만원 (전국 평균 대비) |
| MetroMap | 330 | 330 | 서울·경기·인천 순차 점등 |
| BarRace | 660 | 330 | 2년 대출 증가율, 서울 8.3% 1위 |
| Gauge | 990 | 330 | 연체율 1.6% + 못 갚는 대출 +50% |
| ClosureGrid | 1320 | 330 | 폐업 97만 곳, 9% 소등 |
| Keyword | 1650 | 300 | 해법 3가지 + CTA (그린 전환) |

## 커스터마이즈

- **숫자 교체:** `src/data/metrics.ts` 만 수정하면 모든 씬에 반영됩니다.
- **실제 지도:** `MetroMapScene`의 추상 블록을 GeoJSON path로 교체 가능.
- **나레이션 싱크:** TTS/오디오를 만들면 `Video.tsx`의 `durationInFrames`를
  실제 발화 길이에 맞춰 조정하고, `<Series.Sequence>`에 `<Audio>`를 추가하세요.
