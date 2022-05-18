	
TMPFILE=offline$$.log
if [ -f .offline.pid ]; then
    echo "Found file .offline.pid. Not starting."
    exit 1
fi
 
serverless offline start --stage test > $TMPFILE 2>&1 &
PID=$!
echo $PID > .offline.pid
 
while ! grep "Server ready" $TMPFILE
do sleep 1; done
 
#rm $TMPFILE