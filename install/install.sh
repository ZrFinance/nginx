

cd /root
yum install -y openssl wget gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel libssl-dev
mkdir -p /var/nginx_upload
tar -zxvf nginx-1.6.2.tar.gz 
tar -zxvf nginx-upload-module.tar.gz
cd nginx-1.6.2
./configure --prefix=/usr/local/nginx --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module  --add-module=/root/nginx-upload-module
make
make install
