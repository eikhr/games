import type { ComponentChildren, JSX } from 'preact';
import { type ForwardRefRenderFunction, forwardRef } from 'preact/compat';
import styles from './Button.module.css';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	onClick: JSX.MouseEventHandler<HTMLButtonElement>;
	children: ComponentChildren;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
	{ type, onClick, children },
	ref,
) => {
	return (
		<button ref={ref} type={type} className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default forwardRef<HTMLButtonElement, Props>(Button);
