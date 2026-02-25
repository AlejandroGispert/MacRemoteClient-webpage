tell application "VLC"
	activate
end tell

tell application "System Events"
	tell process "VLC"
		click menu item "Repeat All" of menu "Playback" of menu bar 1
	end tell
end tell
