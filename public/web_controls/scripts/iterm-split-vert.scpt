-- iTerm2: Split current session vertically (left/right)
-- Bundle ID: com.googlecode.iterm2
--
-- Note: iTerm2 must have AppleScript enabled (default) and be installed.

tell application id "com.googlecode.iterm2"
	activate
	try
		if (count of windows) is 0 then
			create window with default profile
		end if
		tell current session of current window
			split vertically with default profile
		end tell
	end try
end tell

