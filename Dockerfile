FROM centos
MAINTAINER tangchen tangchen2018@hotmail.com
RUN yum install -y wget
RUN yum -y install gcc-c++
RUN yum -y install pcre pcre-devel
RUN yum -y install zlib zlib-devel
RUN yum -y install openssl openssl-devel libssl-dev
RUN tar -zxvf nginx-1.6.2.tar.gz
WORKDIR nginx-1.6.2
RUN ./configure --prefix=/usr/local/nginx --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_gzip_static_module --with-http_realip_module  --add-module=nginx-upload-module

RUN make
RUN make install

RUN cd ..
RUN rm -rf nginx-1.6.2.tar.gz
RUN rm -rf /usr/local/nginx/conf/nginx.conf /usr/local/nginx/conf/conf.d 
COPY ./nginx.conf /usr/local/nginx/conf/
COPY ./vhost /usr/local/nginx/conf/vhost

CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]
