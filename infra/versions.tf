terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Mismo bucket de state que tareas-aws, con otra "key": cada proyecto tiene su propio state
  backend "s3" {
    bucket       = "tareas-tfstate-mario-2026"
    key          = "portafolio/terraform.tfstate"
    region       = "us-east-2"
    encrypt      = true
    use_lockfile = true # bloqueo nativo en S3
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Proyecto   = "portafolio"
      Gestionado = "terraform"
    }
  }
}
