# The shortcut stopped working on macOS (Secure Input)

macOS has a protection called Secure Input. While it is on, no app except the one in front can see what you type. It is meant for password fields. Sometimes it gets stuck on after you leave the password field, and then Slash Voice cannot see its shortcut. The app shows a warning when it detects this.

## Fix it

Try these in order. Stop when the shortcut works again.

1. **Close any password prompt or password field** that is still open, in any app.
2. **Check Terminal.** In the Terminal menu, turn off **Secure Keyboard Entry**. iTerm2 has the same switch in its own menu.
3. **Quit the app that last asked for a password**, for example a password manager or a browser, and open it again.
4. **Lock the screen and unlock it.** Press Control, Command and Q, then sign back in.
5. **Log out and log in again**, or restart the Mac.

## Why Slash Voice cannot fix it for you

Secure Input belongs to the system and to the app that turned it on. Another app is not allowed to turn it off, which is the point of the protection.

## Still stuck

Open an [issue](https://github.com/iMedoV8/SlashVoice/issues) and say which apps were open. Do not include anything you typed.
