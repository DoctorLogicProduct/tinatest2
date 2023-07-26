import { useHasRendered } from './useHasRendered';

export const useIfHasRendered = <Result>(fn: () => Result): (Result | null) => {
  const hasRendered = useHasRendered();

  return hasRendered ? fn() : null;
};
