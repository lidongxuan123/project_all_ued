FROM 10.45.80.1/public/centos7_java8_tomcat8_base:8.0.35

RUN mkdir -p /usr/tomcat/tomcat8.0/webserver/webapps/eshop-app


COPY ./docker/docker-app.def  /root/docker-app.def
COPY ./dist/ /usr/tomcat/tomcat8.0/webserver/webapps/eshop-app/

WORKDIR /usr/tomcat/tomcat8.0

ENV MANAGEMENT_PORT=8080
ENV MANAGEMENT_CONTEXT_PATH=/management
ENV FTF_MANAGEMENT_SECURITY_ALLOW=127.0.0.1
ENV MANAGEMENT_SECURITY_ENABLED=true
ENV FTF_MANAGEMENT_SECURITY_ENABLED=true
ENV ZSMART_HOME=/usr/tomcat/tomcat8.0
ENV CATALINA_HOME=$ZSMART_HOME/webserver
ENV TOMCAT_JMX_PORT=1890

ENTRYPOINT ["/usr/local/bin/tini", "-g", "--", "docker-entrypoint.sh"]
CMD ["start"]
