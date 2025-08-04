interface TplOptions {
  /** Template ID or template string */
  templateId: string;
  /** Data object */
  data: Record<string, any>;
  /** Callback function for value transformation */
  fn?: (item: { key: string; value: any }) => any;
  /** Data key selector */
  dataKey?: string;
}

interface TplFunction {
  (options: TplOptions): any;
}

interface NxStatic {
  tpl: TplFunction;
}
