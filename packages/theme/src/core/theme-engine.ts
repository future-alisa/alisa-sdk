// core/theme-engine.ts
export type ThemeConfig = {
  [key: string]: string | ThemeConfig;
};

export class ThemeEngine<T extends ThemeConfig> {
  private themes: Record<string, T>;
  private currentTheme: string;

  constructor(themes: Record<string, T>, initialTheme: string) {
    this.themes = themes;
    this.currentTheme = initialTheme;
  }

  // 将嵌套对象转换为 CSS 变量名: { colors: { primary: '#000' } } -> --colors-primary
  private flattenConfig(config: ThemeConfig, prefix = "-") {
    const vars: Record<string, string> = {};
    for (const key in config) {
      const val = config[key];
      const name = `${prefix}-${key}`;
      if (typeof val === "object") {
        Object.assign(vars, this.flattenConfig(val, name));
      } else {
        vars[name] = val;
      }
    }
    return vars;
  }

  public applyTheme(
    themeName: string,
    element: HTMLElement = document.documentElement
  ) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const vars = this.flattenConfig(theme);
    for (const [key, value] of Object.entries(vars)) {
      element.style.setProperty(key, value);
    }
    this.currentTheme = themeName;
  }

  public getCurrentTheme() {
    return this.currentTheme;
  }
}
