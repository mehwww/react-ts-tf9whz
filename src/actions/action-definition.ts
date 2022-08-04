import { ContextMenuAction } from '../types/context-menu';

export interface BuildConfig<Actor, Params> {
  name?: string;
  icon?: string;
  resolveParams: (actor: Actor) => Params;
  isHidden?: (actor: Actor) => boolean;
  onSuccess?: () => void;
  onFailed?: (err: Error) => void;
}

export abstract class ActionDefinition<Params> {
  build<Actor>(config: BuildConfig<Actor, Params>): ContextMenuAction<Actor> {
    const menu = this.getMenu();

    return {
      name: config.name ?? menu.name,
      icon: config.icon ?? menu.icon,
      isHidden: (actor) => config.isHidden?.(actor) ?? false,
      action: async (actor) => {
        try {
          await this.invoke(config.resolveParams(actor));
          config.onSuccess?.();
        } catch (err) {
          config.onFailed?.(err);
        }
      },
    };
  }

  abstract invoke(params: Params): void | Promise<void>;

  abstract getMenu(): { name: string; icon: string };
}
