-- Ableton Live: Toggle Play / Stop (default: Space)
-- Bundle ID: com.ableton.live
--
-- Requires: macOS Accessibility permission for "System Events" (and for the app that runs this script).

tell application id "com.ableton.live" to activate
delay 0.1

tell application "System Events"
	key code 49 -- spacebar
end tell

