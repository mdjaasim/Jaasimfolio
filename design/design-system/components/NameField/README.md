The first-name field that greets the visitor: a pair of braces with a blinking line between them, `{{ first name }}`. No box, no underline, no outline.

- Idle (empty, not focused): the braces are `ink-muted`, a blinking `ink` line sits where the name will start, and the placeholder "first name" follows it in `ink-muted`.
- Focused: the placeholder disappears, the braces turn `ink`, the native caret blinks inside the empty braces and the visitor types the name between them. The field grows with the text (monospace, one `ch` per letter).
- Commit: Enter, or clicking anywhere else with a name typed. The line then becomes "Hello, *Name.*" with the name in Fraunces italic ink over a yellow highlighter (`jc-hl`).
- The field takes focus by itself when the launch ends, so the line is always blinking until the visitor types.
- Allow letters, apostrophes, hyphens and spaces only, 18 characters at most; render the name as text, never as HTML. Keep it only in the visitor's own browser.
- Use `jc-nl` with `.br` for the braces, `.fw` around the input and `.ph` for the placeholder.
