variable "region" {
  description = "Región principal del proyecto"
  type        = string
  default     = "us-east-2"
}

variable "bucket_nombre" {
  description = "Nombre del bucket S3 del sitio (único a nivel mundial)"
  type        = string
  default     = "portafolio-mario-2026"
}

variable "tfstate_bucket" {
  description = "Bucket donde vive el state de Terraform (compartido con tareas-aws)"
  type        = string
  default     = "tareas-tfstate-mario-2026"
}

variable "usuario_terraform_plan" {
  description = "Usuario de solo lectura del pipeline de Terraform, creado en tareas-aws (ci-terraform.tf)"
  type        = string
  default     = "github-terraform-plan"
}
