export function onBeforePrerenderStart() {
  return [1, 2, 3, 4].flatMap((id) => [
    `/tour-info/${id}/`,
    `/es/tour-info/${id}/`,
    `/en/tour-info/${id}/`,
  ])
}
