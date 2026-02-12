tell application "Google Chrome"
	activate
end tell

delay 0.2

tell application "System Events"
	tell process "Google Chrome"
		click menu item "Tile Window to Left of Screen" ¬
			of menu 1 of menu bar item "Window" of menu bar 1
	end tell
end tell
