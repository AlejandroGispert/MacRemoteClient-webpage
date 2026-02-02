-- iTerm2: Split current session horizontally (top/bottom)
-- Bundle ID: com.googlecode.iterm2

tell application id "com.googlecode.iterm2"
	activate
	try
		if (count of windows) is 0 then
			create window with default profile
		end if
		tell current session of current window
			split horizontally with default profile
		end tell
	end try
end tell

