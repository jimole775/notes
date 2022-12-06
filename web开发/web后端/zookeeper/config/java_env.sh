# 找到特殊的收尾注释行号，配置夹在其中
s_sign=$(sed -n -e "/###>>>/=" /etc/profile)
e_sign=$(sed -n -e "/###<<</=" /etc/profile)
jdk_path=$1 # 外部传入jdk的路径
echo $s_sign $e_sign
if [ "$s_sign" == ""];then
  # 未找到标记，直接追加
  sed -i '$a ###>>>自动填家的配置模块，请勿轻易删除该模块注释和其间的配置' /etc/profile
  sed -i '$a export JAVA_HOME='$jdk_path /etc/profile
  sed -i '$a export PATH=\$JAVA_HOME/bin:\$PATH' /etc/profile
  sed -i '$a export CLASSPATH=.:\$JAVA_HOME/lib/dt.jar:\$JAVA_HOME/lib/tools.jar' /etc/profile
  sed -i '$a ###<<<自动填家的配置结束' /etc/profile
else
  # 找到了标记删除标记间的内容，并在原来的行追加
  sed -i $s_sign','$e_sign'd' /etc/profile
  let s_sign--
  sed -i $s_sign'a ###>>>自动填家的配置模块，请勿轻易删除该模块注释和其间的配置' /etc/profile
  let s_sign++
  sed -i $s_sign'a export JAVA_HOME='$jdk_path /etc/profile
  let s_sign++
  sed -i $s_sign'a export PATH=\$JAVA_HOME/bin:\$PATH' /etc/profile
  let s_sign++
  sed -i $s_sign'a export CLASSPATH=.:\$JAVA_HOME/lib/dt.jar:\$JAVA_HOME/lib/tools.jar' /etc/profile
  let s_sign++
  sed -i $s_sign'a ###<<<自动填家的配置结束' /etc/profile
fi
