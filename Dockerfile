FROM quay.io/jupyter/base-notebook:python-3.11.10

LABEL MAINTAINER="NaaS Project <edina@ed.ac.uk>"

USER root

COPY . /src/noteable-laf
COPY docker/jupyter/etc /etc/jupyter/

WORKDIR /src/noteable-laf
RUN pip install -e "."
RUN jlpm install
RUN jlpm build
RUN jupyter labextension develop . --overwrite

RUN cp docker/jupyter/etc/notebook-type.svg /src/noteable-laf/style/notebook-type.svg
RUN cp docker/jupyter/etc/notebook_info.ts /src/noteable-laf/src/notebook_info.ts

RUN jlpm build