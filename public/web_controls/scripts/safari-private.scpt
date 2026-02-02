tell application "Safari"
    activate
    tell window 1
        set current tab to (make new tab with properties {URL:"https://google.com"})
    end tell
end tell
