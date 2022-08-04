export interface ContextMenuAction<T> {
  icon: string;
  name: string;
  isHidden: (actor: T) => boolean;
  action: (actor: T) => void | Promise<void>;
}
