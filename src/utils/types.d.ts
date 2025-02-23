type SetValue = <T extends FieldValues = FieldValues>(
    name: FieldPath<T>,
    value: FieldValue<T>,
    config?: Partial<{
      shouldValidate: boolean;
      shouldDirty: boolean;
    }>
  ) => void;

  export interface Entries {
    Value: string | number;
    Text: string | number;
    SubCategories?: Category[];
    ColorCode?: string;
  }