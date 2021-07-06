# JWT_TOKEN variable should be already declared
# curl and jq should be installed in your OS or WSL2
# Test jq filter https://jqplay.org/

alias test-curl='curl --no-progress-meter -H "Authorization:BEARER $JWT_TOKEN"'
alias test-curl-json='curl --no-progress-meter -H "Authorization:BEARER $JWT_TOKEN" -H "Content-Type: application/json"'

function test-title() {
  TITLE="$*"
  COLUMNS=$(tput cols)
  LEN="$((($COLUMNS-${#TITLE})/2))"
  STARS=$(seq -s= $LEN | tr -d '[:digit:]')
  echo "$STARS $TITLE $STARS"
}

echo "Running tests"