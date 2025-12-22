{{- define "taskmanagement.connectionString" -}}
Host=db;Port=$(POSTGRES_PORT);Database=$(POSTGRES_DB);Username=$(POSTGRES_USER);Password=$(POSTGRES_PASSWORD)
{{- end -}}