import { cx } from '@remirror/core-helpers';
import {
    useCommands,
    useActive
  } from '@remirror/react';
export const BoldItalicUnderlineBtns = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
      <>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.toggleBold()}
        className={cx(active.bold() && 'active')}
      >
        B
      </button>
      <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => commands.toggleItalic()}
      className={cx(active.italic() && 'active')}
    >
      I
    </button>
    <button
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => commands.toggleUnderline()}
    className={cx(active.underline() && 'active')}
  >
    U
  </button>
  </>
    );
  };

export const AlignButtons = () => {
    const commands = useCommands();
    return (
      <>
        <button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.leftAlign()}>
          Left
        </button>
        <button
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => commands.centerAlign()}
        >
          Center
        </button>
        <button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.rightAlign()}>
          Right
        </button>
      </>
    );
  };