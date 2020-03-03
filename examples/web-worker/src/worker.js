export function selectItems(state) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(state.items.reverse());
    }, 4000);
  });
}
