a=`expr 1 + 1`
let b=$a+1
test(){
  return $1
}
test $b
echo $?
