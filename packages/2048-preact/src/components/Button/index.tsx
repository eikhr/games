import cx from 'classnames';
import type { ComponentChildren, JSX } from 'preact';
import { type ForwardRefRenderFunction, forwardRef } from 'preact/compat';
import styles from './Button.module.css';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'yellow';
	onClick: JSX.MouseEventHandler<HTMLButtonElement>;
	children: ComponentChildren;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
	{ type, onClick, children, variant },
	ref,
) => {
	return (
		<button
			ref={ref}
			type={type}
			className={cx(
				styles.button,
				variant === 'secondary' && styles.secondary,
				variant === 'yellow' && styles.yellow,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default forwardRef<HTMLButtonElement, Props>(Button);
