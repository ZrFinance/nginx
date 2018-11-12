
cd /root
yum install -y openssl wget gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel libssl-dev
mkdir -p /var/nginx_upload
tar -zxvf nginx-1.6.2.tar.gz 
tar -zxvf nginx-upload-module.tar.gz
cd nginx-1.6.2
./configure --prefix=/usr/local/nginx --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module  --add-module=/root/nginx-upload-module
make
make install

cd /root
tar -xvf node-v10.13.0-linux-x64.tar.xz
mv node-v10.13.0-linux-x64 /usr/local/node
ln -s /usr/local/node/bin/node /usr/local/bin/node
ln -s /usr/local/node/bin/npm /usr/local/bin/npm
npm cache verify
npm install -g cnpm --registry=https://registry.npm.taobao.org
ln -s /usr/local/node/bin/cnpm /usr/bin/cnpm

cd /root/web && cnpm install && cnpm run build
cd /root/admin && cnpm install && cnpm run build 
cd /root
rm -rf /usr/local/nginx/html/*
mv /root/web/dist/* /usr/local/nginx/html/
mkdir -p /usr/local/nginx/html/serveradmin 
mv /root/admin/dist/* /usr/local/nginx/html/serveradmin/
rm -rf /root/*
