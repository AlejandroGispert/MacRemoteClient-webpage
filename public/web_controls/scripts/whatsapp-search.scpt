tell application "WhatsApp"
	activate
end tell

tell application "System Events"
	tell process "WhatsApp"
		keystroke "f" using command down
	end tell
end tell
