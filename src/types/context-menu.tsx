export interface ContextMenuAction<T> {
  name: string;
  isHidden: (actor: T) => boolean;
  action: (actor: T) => void | Promise<void>;
}
