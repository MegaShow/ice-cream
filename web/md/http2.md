# HTTP2.0初体验

## 什么是HTTP2.0？

HTTP 2.0即超文本传输协议2.0，是下一代HTTP协议。是由互联网工程任务组（IETF）的Hypertext Transfer Protocol Bis (httpbis)工作小组进行开发。是自1999年http1.1发布后的首个更新。HTTP 2.0在2013年8月进行首次合作共事性测试。在开放互联网上HTTP 2.0将只用于https网址，而 http网址将继续使用HTTP/1，目的是在开放互联网上增加使用加密技术，以提供强有力的保护去遏制主动攻击。DANE RFC6698允许域名管理员不通过第三方CA自行发行证书。——摘自《百度百科》

既然有效率更高、安全性更强的HTTP协议，为什么不去使用呢？(于是就有了这篇文章，逃)

## 准备工作

* Ubuntu Server 16.04
* GNU GCC
* Nginx
* OpenSSL

## 环境配置

首先我们要确认OpenSSL版本，支持HTTP2.0最低的OpenSSL版本为1.0.2，如果环境版本低于1.0.2，那我们就要自己配置新的OpenSSL。恰巧的是，我用来测试的服务器OpenSSL版本为1.0.2，所以这里我们先默认OpenSSL版本已经满足了。(后面会提及不满足的情况)

```sh
ubuntu:~$ openssl version
OpenSSL 1.0.2g  1 Mar 2016
```

通过下面的命令进行Nginx下载和解压

```sh
ubuntu:~$ wget http://nginx.org/download/nginx-1.13.1.tar.gz
ubuntu:~$ tar zxvf nginx-1.13.1.tar.gz
```

接下来进入Nginx文件夹配置并编译Nginx

```sh
ubuntu:~$ cd nginx-1.13.1/
ubuntu:~/nginx-1.13.1$ ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_realip_module --with-http_v2_module
```

如果出现了下面的报错，那表明没有安装PCRE，虽然我不知道这玩意有啥用，但是为了成功编译Nginx还是先下载安装PCRE。

```
checking for PCRE library ... not found
checking for PCRE library in /usr/local/ ... not found
checking for PCRE library in /usr/include/pcre/ ... not found
checking for PCRE library in /usr/pkg/ ... not found
checking for PCRE library in /opt/local/ ... not found

./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```

```sh
ubuntu:~/nginx-1.13.1$ cd ..
ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre-8.40.tar.gz
ubuntu:~$ tar zxvf pcre-8.40.tar.gz
ubuntu:~$ cd pcre-8.40/
ubuntu:~/pcre-8.40$ ./configure
ubuntu:~/pcre-8.40$ make
ubuntu:~/pcre-8.40$ sudo make install
ubuntu:~/pcre-8.40$ cd ../nginx-1.13.1/
```

再次编译Nginx。

``` sh
ubuntu:~/nginx-1.13.1$ ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_realip_module --with-http_v2_module
```

