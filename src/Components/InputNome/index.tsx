import React, {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

export interface IInputNome extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  inputValor: string;
}

export interface IInputRef {
  focus(): void;
}
const InputNome: React.ForwardRefRenderFunction<IInputRef, IInputNome> = (
  { handleChange, inputValor },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus();
      },
    };
  });
  return (
    <input
      placeholder="Nome"
      value={inputValor}
      type="text"
      onChange={handleChange}
      ref={inputRef}
    />
  );
};

export default forwardRef(InputNome);
