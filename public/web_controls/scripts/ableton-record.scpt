-- Ableton Live: Toggle Record (common default: F9)
-- Bundle ID: com.ableton.live
--
-- Note: If your Mac uses F-keys as media keys, this may require "Use F1, F2, etc. as standard function keys"
-- or you may need to adjust the key code / mapping.
-- Requires: macOS Accessibility permission for "System Events".

tell application id "com.ableton.live" to activate
delay 0.1

tell application "System Events"
	key code 101 -- F9
end tell

