@echo off
setlocal enabledelayedexpansion

if not exist ".git\hooks" mkdir ".git\hooks"

echo Copying pre-commit hook...
copy /Y "hooks\pre-commit" ".git\hooks\pre-commit"
if exist ".git\hooks\pre-commit" (
    echo pre-commit ok
) else (
    echo err: pre-commit error
)

echo Copying pre-push hook...
copy /Y "hooks\pre-push" ".git\hooks\pre-push"
if exist ".git\hooks\pre-push" (
    echo pre-push ok
) else (
    echo err: pre-push error
)

echo Copying post-receive hook...
copy /Y "hooks\post-receive" ".git\hooks\post-receive"
if exist ".git\hooks\post-receive" (
    echo post-receive ok
) else (
    echo err: post-receive error
)

echo Git hooks setup completed