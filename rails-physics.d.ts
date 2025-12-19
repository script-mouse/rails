import type { Plugin } from "matter-js";

declare module "rails-physics" {
    export const Rails: Plugin;
    export = Rails;
}