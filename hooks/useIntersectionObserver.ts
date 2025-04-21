import { RefObject, useState, useEffect } from 'react'

/**
 * 특정 DOM 요소가 뷰포트(Viewport) 또는 특정 컨테이너(root) 내에서
 * 얼마나 보이는지를 관찰(Intersection Observer API)하고,
 * 그 관찰 결과를 반환하는 커스텀 훅입니다.
 *
 * @param elementRef 관찰할 대상 DOM 요소의 ref 객체
 * @param param1 threshold: 요소가 얼마나 보여야 콜백을 실행할지 결정하는 값 (0 ~ 1)
 *                root: 관찰 기준이 되는 요소 (기본값은 뷰포트)
 *                rootMargin: root와 element 사이의 마진 (CSS margin 값처럼 사용)
 * @returns IntersectionObserverEntry 객체 (null일 수도 있음)
 */
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0%' },
) {
  // 현재 관찰된 결과를 저장하는 상태
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  // 관찰 대상의 상태가 바뀔 때마다 실행될 콜백
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // 관찰할 실제 DOM 노드
    const hasIOSupport = !!window.IntersectionObserver // 브라우저가 IntersectionObserver를 지원하는지 확인

    // 노드가 없거나 IntersectionObserver를 지원하지 않으면 종료
    if (!node || !hasIOSupport) return

    // 옵저버 인스턴스를 생성
    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node) // 요소 관찰 시작

    // 클린업 함수: 컴포넌트가 unmount 되거나 의존성이 바뀌면 옵저버 해제
    return () => observer.disconnect()
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)])

  return entry // 관찰 결과 반환
}

export default useIntersectionObserver
