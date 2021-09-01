# Prometheus and Grafana Setup

* Installs the Intershop PWA system [PWA](https://github.com/intershop/intershop-pwa) with [Prometheus](https://prometheus.io/docs/introduction/overview/) and [Grafana](https://grafana.com/)

## 1 Prerequisits

* Kubernetes should be setup (f.E. [minikube](https://minikube.sigs.k8s.io/docs/))
* PWA and nginx docker images must be build

## 2 Installing the helm chart
To install the [chart](../../charts/pwa-main/Chart.yaml) with the release name `demo`:

```console
helm install demo charts/pwa-main
```
* charts/pwa-main is the directory of the helm charts

Please check, that the enabled flag for prometheus and grafana is set in the [Values file](../../charts/pwa-main/values.yaml). If not the service will not be deployed.

```yaml
grafana:
  enabled: true
prometheus:
  enabled: true
```

## 3 (Optional) Expose Prometheus and Grafana Service
If the prometheus and grafana service is not setup in the Ingress controller and minikube is used for Kubernetes, than the services have to be exposed. Now it is possible to access the services via web interface.

### 3.1 Expose and run Prometheus service

```console
kubectl expose service demo-prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np

minikube service prometheus-server-np
```

`Notice:` The name of the prometheus service `demo-prometheus-server` is composed of `${release name}-prometheus-server`

### 3.2 Expose and run Grafana service

```console
kubectl expose service demo-grafana --type=NodePort --target-port=3000 --name=grafana-np

kubectl get secret --namespace default demo-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

minikube service grafana-np
```

`Notice:` The name of the prometheus service `demo-grafana` is composed of `${release name}-grafana`

`Notice:` Grafana is password protected by default, in order to retrieve the admin user password the second command must be executed.

## 4 Configure Prometheus Datasource

To use the prometheus metrics of the PWA application in a grafana board, the configuration of a Prometheus Datasource in Grafana is necessary. After login a new Prometheus instance must be created under Configuration --> Datasource. 
The URL for our Prometheus instance is the name of the service `http://demo-prometheus-server:80`

![Add prometheus as datasource to grafana](grafana-prometheus-datasource.png)

`Notice:` The url of the prometheus service is composed of `http://${release name}-grafana:80`

## 5 Import Grafana dashboard

If you want to inspect current metrics of the PWA application, then you should create a grafana dashboard, which should use the given metrics from the Prometheus service. If you don't want to create a dashboard by your own, than import the given [dashboard](prometheus-monitoring-dashboard.json).

![Import grafana dashboard](grafana-import-dashboard.png)
