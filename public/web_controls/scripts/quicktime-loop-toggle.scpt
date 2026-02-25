tell application "QuickTime Player"
	activate
end tell

tell application "System Events"
	tell process "QuickTime Player"
		click menu item "Loop" of menu "View" of menu bar 1
	end tell
end tell
